using System;

namespace TodoApp.Domain
{
	public class TodoItem
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public TodoItemStatus Status { get; set; }
		public DateTime CreateOn { get; set; }
	}
}
