using Akka.Actor;
using OnlineXO.Core.Login;

namespace OnlineXO.GameSystem
{
	public class GameActor : ReceiveActor
	{
		GameState state = Game.Empty;

		public GameActor()
		{
			Receive<Command>(Handle);
		}

		void Handle(Command command)
		{
			state = state.Apply(command);
		}
	}
}
