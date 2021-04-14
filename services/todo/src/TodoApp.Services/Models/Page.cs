namespace TodoApp.Services.Models
{
	public class Page<T>
	{
		public int Total { get; set; }
		public T[] Items { get; set; }
	}
}
