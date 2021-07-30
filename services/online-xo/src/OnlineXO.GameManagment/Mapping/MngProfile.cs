using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineXO.GameManagment.Mapping
{
	public class MngProfile : Profile
	{
		public MngProfile()
		{
			CreateMap<Domain.Room, Models.RoomModel>()
				.ForMember(
					a=>a.Players, 
					a=> a.MapFrom(a=>a.Players.Select(a=>a.Username).ToArray()
				)
			);
		}
	}
}
