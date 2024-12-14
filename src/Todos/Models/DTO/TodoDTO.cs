namespace Todos.Models.DTO;

public class TodoDTO
{
    public int Id { get; set; }
    public string? Text { get; set; }
    public bool isDone { get; set; }
    public string? DueDate { get; set; }
    public string? Notes { get; set; }
}
