import React, { FC } from "react"
import { useForm } from "react-hook-form";
import { useAuth } from "../context";


const ErrorMessage = ({ error }: { error: any }) => {
  if (error) return null;

  return <div className="error">{error}</div>
}

type FormState = {
  username: string
  password: string
}
const LoginForm = () => {
  const auth = useAuth();
  const { handleSubmit, register, errors } = useForm<FormState>();
  const onSubmit = (values: FormState) => {
    auth.login(values.username, values.password);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Username</label>
        <input
          name="username"
          ref={register({
            required: true
          })} />
        <ErrorMessage error={errors.username} />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          ref={register({
            required: true
          })} />
        <ErrorMessage error={errors.password} />
      </div>
      <div>
        <button type="submit">Send</button>
      </div>
    </form>
  )
}

const LoginPage: FC = () => {
  return (
    <div>
      <LoginForm />
    </div>
  )
}

export default LoginPage;