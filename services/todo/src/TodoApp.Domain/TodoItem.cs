using System;

namespace TodoApp.Domain
{
	public enum TodoItemStatus
	{
		Pending = 1,
		Done = 2,
		Suspended = 3
	}
	public class TodoItem
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public TodoItemStatus Status { get; set; }
	}
}
