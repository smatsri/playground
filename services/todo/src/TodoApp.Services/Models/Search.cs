using TodoApp.Domain;

namespace TodoApp.Services.Models
{
	public class Search
	{
		public Search()
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
}
