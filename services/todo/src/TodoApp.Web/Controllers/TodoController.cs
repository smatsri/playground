using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TodoApp.Web.Models;
using TodoApp.Services;
using TodoApp.Services.Models;

namespace TodoApp.Web.Controllers
{
	[ApiController]
	[Route("api/todo")]
	public class TodoController : ControllerBase
	{
		private readonly ITodoItemService itemService;

		public TodoController(ITodoItemService itemService)
		{
			this.itemService = itemService;
		}

		[HttpGet]
		public async Task<ActionResult> Get([FromQuery] Search requst)
		{
			var page = await itemService.Search(requst);
			return Ok(page);
		}

		[Route("{id}"), HttpGet]
		public async Task<ActionResult> GetById(int id)
		{
			var item = await itemService.GetById(id);
			if (item == null)
			{
				return NotFound();
			}
			return Ok(item);
		}

		[HttpPost]
		public async Task<ActionResult> Add(CreateRequest request)
		{
			var item = await itemService.Create(request.Title);
			return Ok(item);
		}

		[Route("{id}"), HttpDelete]
		public async Task<ActionResult> Delete(int id)
		{
			await itemService.Delete(id);
			return Ok();
		}

		[HttpPatch]
		public async Task<ActionResult> Update(Update update)
		{
			await itemService.Update(update);
			return Ok();
		}
	}
}
