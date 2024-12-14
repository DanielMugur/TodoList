using System.Linq;
using System.Text;
using Todos.Models.DTO;
using Todos.Models.Interfaces;

namespace Todos.Models;

public class TodoModel : ITodoModel
{
    private const string fileName = "./Todos.txt";

    public string CreateStringResponse()
    {
        var todoListBuilder = new StringBuilder();
        int i = 0;

        todoListBuilder.AppendLine("[");
        var todoTaskList = System.IO.File.ReadAllLines(fileName);

        foreach (var task in todoTaskList)
        {
            var data = task.Split(",");

            todoListBuilder.Append($"{{ " +
                $"\"id\": {data[0]}, " +
                $"\"text\": \"{Utils.ToTitleCase(data[1].ToLower())}\", " +
                $"\"isDone\": {Utils.ValorCampo(data[2])}, " +
                $"\"dueDate\": \"{Utils.ValorCampo(data[3])}\", " +
                $"\"notes\": \"{Utils.ValorCampo(data[4])}\" }}");

            if (i < todoTaskList.Length - 1)
            {
                todoListBuilder.AppendLine(",");
                i++;
            }
            else
            {
                todoListBuilder.AppendLine();
            }
        }

        todoListBuilder.AppendLine("]");
        return todoListBuilder.ToString();
    }
    public bool CreateTask(TodoDTO todoDTO)
    {
        bool result = false;
        var todoTaskNew = new StringBuilder();
        List<string> todoTaskList = System.IO.File.ReadAllLines(fileName).ToList();
        todoDTO.Id = Utils.GetNextIdentifier(todoTaskList);
        todoTaskNew.Append(todoDTO.Id.ToString() + "," + 
            Utils.ToTitleCase(todoDTO.Text?.ToString().ToLower()) + "," + 
            todoDTO.isDone.ToString().ToLower() + "," +
            todoDTO.DueDate.ToString() + "," +
            Utils.RemoveLineBreaks(Utils.ValorCampo(todoDTO.Notes)));
        todoTaskList.Add(todoTaskNew.ToString());

        try
        {
            File.WriteAllLines(fileName, todoTaskList, Encoding.UTF8);
            result = true;
        }
        catch (Exception ex)
        {
            result = false;
        }

        return result;
    }
    public bool DeleteTask(string id)
    {
        bool result = false;
        List<string> todoTaskList = System.IO.File.ReadAllLines(fileName).ToList();
        todoTaskList.RemoveAll(x => x.Split(",")[0].Equals(id));
        List<string> todoTaskListNew = Utils.SetIdentifiersInNumericOrder(todoTaskList, Convert.ToInt32(id));
        try
        {
            File.WriteAllLines(fileName, todoTaskListNew, Encoding.UTF8);
            result = true;
        }
        catch (Exception ex)
        {
            result = false;
        }

        return result;
    }
    public bool UpdateTask(TodoDTO todoDTO)
    {
        bool result = false;
        var todoTaskUpdated = new StringBuilder();
        todoTaskUpdated.Append(todoDTO.Id.ToString() + "," + 
            Utils.ToTitleCase(todoDTO.Text?.ToString().ToLower()) + "," + 
            todoDTO.isDone.ToString().ToLower() + "," +
            todoDTO.DueDate.ToString() + "," +
            Utils.RemoveLineBreaks(Utils.ValorCampo(todoDTO.Notes)));
        List<string> todoTaskList = System.IO.File.ReadAllLines(fileName).ToList();
        int indexTask = todoTaskList.FindIndex(x => x.Split(",")[0].Equals(todoDTO.Id.ToString()));

        if(indexTask >= 0)
        {
            todoTaskList[indexTask] = todoTaskList[indexTask].Replace(todoTaskList[indexTask].ToString(), todoTaskUpdated.ToString());
        }
        try
        {
            File.WriteAllLines(fileName, todoTaskList, Encoding.UTF8);
            result = true;
        }
        catch (Exception ex)
        {
            result = false;
        }

        return result;
    }
}
