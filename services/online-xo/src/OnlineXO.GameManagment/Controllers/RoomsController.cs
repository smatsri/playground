using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using OnlineXO.GameManagment.Models;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineXO.GameManagment.Controllers
{
	[Route("api/rooms")]
	public class RoomsController : Controller
	{
		private readonly RoomService roomService;
		private readonly IMapper mapper;

		public RoomsController(RoomService roomService, IMapper mapper)
		{
			this.roomService = roomService;
			this.mapper = mapper;
		}

		[HttpGet(Name = "GetAll")]
		public async Task<ActionResult<RoomModel[]>> Get()
		{
			var rooms = await roomService.GetRooms();
			var models = mapper.Map<RoomModel[]>(rooms);
			return Ok(models);
		}

		[HttpGet("{id}", Name = "GetById")]
		public async Task<ActionResult<RoomModel>> Get(int id)
		{
			var room = await roomService.GetRoom(id);
			var model = mapper.Map<RoomModel>(room);
			return Ok(model);
		}

		[HttpPost(Name = "Create")]
		public async Task<ActionResult<RoomModel>> Post(CreateRoomModel creatModel)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			var room = await roomService.CreateRoom(creatModel.Name);
			var model = mapper.Map<RoomModel>(room);
			return Ok(model);
		}

		[HttpGet("claims", Name = "GetClaims")]
		public ActionResult<ClaimModel[]> GetName()
		{
			var cookies = Request.Cookies.Select(a => new { name = a.Key });
			var claims = User.Claims.Select(c => new { c.Type, c.Value }).ToArray();
			return Ok(claims);
		}

		public class ClaimModel
		{
			[Required]
			public string Type { get; set; }
			[Required]
			public string Value { get; set; }
		}
	}

}
