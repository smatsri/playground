import React, { useEffect, useState, createContext, useContext } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr"

const ignore = (...args: any[]) => { }

var connection = new HubConnectionBuilder().withUrl("https://localhost:44334/chatHub").build();

type Msg = {
  user: string
  message: string
}

const cleanMsg = (message: string) => message
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")

export enum State {
  Empty,
  Connecting,
  Connected,
  ConnectionFailed
}

const Msg = (user: string, message: string): Msg => ({ user, message: cleanMsg(message) })

interface IChat {
  msgs: Msg[]
  state: State
  username: string
  join(user: string): void
  send(msg: string): void
}

const emptyChat: IChat = {
  state: State.Connected,
  msgs: [{ user: "user1", message: "msg 1" }],
  username: "",
  join: ignore,
  send: ignore
}


const useChat = (): IChat => {
  const [state, setState] = useState(emptyChat.state);
  const [msgs, setMsgs] = useState<Msg[]>(emptyChat.msgs);
  const [username, setUsername] = useState<string>(emptyChat.username);


  useEffect(() => {
    const _msgs = emptyChat.msgs;
    setState(State.Connecting)

    connection
      .start()
      .then(() => setState(State.Connected))
      .catch(() => setState(State.ConnectionFailed))

    connection.on("ReceiveMessage", (user, message) => {

      _msgs.unshift(Msg(user, message))
      setMsgs([..._msgs])
    })

    return () => {
      connection.stop();
    }

  }, [])

  return {
    state,
    msgs,
    username,
    join(username) {
      setUsername(username);
    },
    send(msg) {
      connection.invoke("SendMessage", username, msg)
    }
  };
}


const ChatContext = createContext(emptyChat);

const useChatContext = () => useContext(ChatContext);


const JoinForm = () => {
  const { join } = useChatContext();
  const [username, setUsername] = useState("");
  return (
    <form onSubmit={e => {
      e.preventDefault();
      join(username);
    }}>
      <div>
        <label htmlFor="joinform-username">username</label>
        <input
          id="joinform-username"
          name="username"
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
      </div>
      <button>join</button>
    </form>
  );
}

const Connecting = () => <div>connecting</div>
type MsgProps = {
  msg: Msg
}
const MsgC = ({ msg: { user, message } }: MsgProps) => {
  return (
    <span>{user}: {message}</span>
  )
}

const NewMsgFrom = () => {
  const { send } = useChatContext();
  const [newMsg, setNewMsg] = useState("");
  return (
    <form onSubmit={e => {
      e.preventDefault();
      send(newMsg);
    }}>
      <div>
        <label htmlFor="joinform-username">message</label>
        <input
          id="newMsgForm-message"
          name="message"
          onChange={e => setNewMsg(e.target.value)}
          value={newMsg}
        />
      </div>
      <button>send</button>
    </form>
  );

}

const MsgsList = () => {
  const { msgs } = useChatContext();
  return (
    <div>{
      msgs.map((msg, index) => (
        <div key={index}><MsgC msg={msg} /></div>
      ))}
    </div>
  );
}

const Joined = () => {
  return (
    <div>
      <NewMsgFrom />
      <MsgsList />
    </div>
  )
}

const Connected = () => {
  const { username } = useChatContext();
  if (username) {
    return <Joined />
  } else {
    return <JoinForm />
  }
}

const Chat = () => {
  const { state } = useChatContext();

  switch (state) {
    case State.Connecting:
      return <Connecting />
    case State.Connected:
      return <Connected />
    default:
      return <JoinForm />
  }

};

const Container = () => {
  const chat = useChat();
  return (
    <ChatContext.Provider value={chat}>
      <Chat />
    </ChatContext.Provider>
  );
}

export default Container;