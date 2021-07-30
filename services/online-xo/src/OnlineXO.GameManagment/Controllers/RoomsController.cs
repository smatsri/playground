using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using OnlineXO.GameManagment.Models;
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

		[HttpGet]
		public async Task<ActionResult<RoomModel[]>> Get()
		{
			var rooms = await roomService.GetOpenRooms();
			var models = mapper.Map<RoomModel[]>(rooms);
			return Ok(models);
		}

		[HttpPost]
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

		[HttpGet("claims")]
		public ActionResult GetName()
		{
			var cookies = Request.Cookies.Select(a => new { name = a.Key });
			var claims = User.Claims.Select(c => new { c.Type, c.Value });
			return Ok(claims);
		}
	}

}
