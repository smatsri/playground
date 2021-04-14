using Microsoft.EntityFrameworkCore;
using System;
using TodoApp.Domain;

namespace TodoApp.Data
{
	public class TodoAppContext : DbContext
	{
		public TodoAppContext(DbContextOptions options) : base(options)
		{
		}

		public DbSet<TodoItem> TodoItems { get; set; }
	}
}
