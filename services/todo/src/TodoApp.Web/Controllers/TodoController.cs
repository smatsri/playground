using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TodoApp.Data;
using TodoApp.Domain;
using TodoApp.Web.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;

namespace TodoApp.Web.Controllers
{
	[ApiController]
	[Route("api/todo")]
	public class TodoController : ControllerBase
	{
		private readonly TodoAppContext db;

		public TodoController(TodoAppContext db)
		{
			this.db = db;
		}

		[HttpGet]
		public async Task<ActionResult> Get([FromQuery] GetTodoItemsRequest requst)
		{
			var query = db.TodoItems.AsQueryable();
			
			// filter
			if (!string.IsNullOrEmpty(requst.Filter.Title))
				query = query.Where(a => a.Title.Contains(requst.Filter.Title));
			if (requst.Filter.Status.HasValue)
				query = query.Where(a => a.Status == requst.Filter.Status);

			var total = await query.CountAsync();


			var items = await query
				.OrderByDescending(a => a.CreateOn)
				.Skip(requst.Skip)
				.Take(GetTake(requst.Take))
				.ToArrayAsync();

			var response = new GetTodoItemsResponse
			{
				Items = items,
				Total = total
			};

			return Ok(response);

			static int GetTake(int value) => value switch
			{
				<= 0 => 10,
				> 1000 => 1000,
				_ => value,
			};

		}

		[Route("{id}"), HttpGet]
		public async Task<ActionResult> GetById(int id)
		{
			var item = await db.TodoItems.FindAsync(id);
			if (item == null)
			{
				return NotFound();
			}
			return Ok(item);
		}

		[HttpPost]
		public async Task<ActionResult> Add(CreateRequest request)
		{
			var item = new TodoItem
			{
				Status = TodoItemStatus.Pending,
				Title = request.Title,
				CreateOn = DateTime.UtcNow
			};

			db.Add(item);

			await db.SaveChangesAsync();

			return Ok(item);
		}
	}
}
