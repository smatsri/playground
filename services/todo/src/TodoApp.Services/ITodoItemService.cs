using System.Threading.Tasks;
using TodoApp.Domain;

namespace TodoApp.Services
{
	using Models;

	public interface ITodoItemService
	{
		Task<TodoItem> GetById(int id);
		Task<Page<TodoItem>> Search(Search search);
		Task<TodoItem> Create(string title);
		Task Delete(int id);
		Task Update(Update update);
	}
}
