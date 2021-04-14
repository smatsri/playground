using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using TodoApp.Data;
using TodoApp.Domain;
using TodoApp.Services.Models;

namespace TodoApp.Services
{
	public class TodoItemService : ITodoItemService
	{
		private readonly TodoAppContext db;

		public TodoItemService(TodoAppContext db)
		{
			this.db = db;
		}

		public async Task<TodoItem> Create(string title)
		{
			var item = new TodoItem
			{
				Status = TodoItemStatus.Pending,
				Title = title,
				CreateOn = DateTime.UtcNow
			};

			db.Add(item);

			await db.SaveChangesAsync();

			return item;
		}

		public async Task Delete(int id)
		{
			var item = await db.TodoItems.FindAsync(id);
			if (item == null)
				return;

			db.TodoItems.Remove(item);

			await db.SaveChangesAsync();
		}

		public async Task<TodoItem> GetById(int id) => await db.TodoItems.FindAsync(id);

		public async Task<Page<TodoItem>> Search(Search requst)
		{
			var query = db.TodoItems.AsQueryable();

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

			return new Page<TodoItem>
			{
				Items = items,
				Total = total
			};

			static int GetTake(int value) => value switch
			{
				<= 0 => 10,
				> 1000 => 1000,
				_ => value,
			};
		}

		public async Task Update(Update update)
		{
			var item = await db.TodoItems.FindAsync(update.Id);
			if (item == null)
				return;

			item.Title = update.Title;
			item.Status = update.Status;

			await db.SaveChangesAsync();
		}
	}
}
