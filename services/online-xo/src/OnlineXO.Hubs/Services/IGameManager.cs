using OnlineXO.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineXO.Hubs.Services
{
	public interface IGameManager 
	{
		void Exec(int gameId, Command command);
	}
}
