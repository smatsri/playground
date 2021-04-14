using TodoApp.Domain;

namespace TodoApp.Services.Models
{
	public class Update
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public TodoItemStatus Status { get; set; }
	}
}
