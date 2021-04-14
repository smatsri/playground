using TodoApp.Domain;

namespace TodoApp.Web.Models
{
	public class GetTodoItemsRequest
	{
		public GetTodoItemsRequest()
		{
			Filter = new FilterType();
		}
		public int Skip { get; set; }
		public int Take { get; set; }


		public FilterType Filter { get; set; }

		public class FilterType
		{
			public string Title { get; set; }
			public TodoItemStatus? Status { get; set; }
		}
	}

	public class GetTodoItemsResponse
	{
		public int Total { get; set; }
		public TodoItem[] Items { get; set; }
	}

}
