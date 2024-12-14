using Todos.Models.DTO;

namespace Todos.Models.Interfaces;

public interface ITodoModel
{
    public string CreateStringResponse();
    public bool CreateTask(TodoDTO todoDTO);
    public bool DeleteTask(string id);
    public bool UpdateTask(TodoDTO todoDTO);
}
