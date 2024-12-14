using System.Globalization;
using System.Text;
using Todos.Models.DTO;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace Todos.Models;

public static class Utils
{
    public static string ToTitleCase(string todo)
    {
        if (string.IsNullOrEmpty(todo))
        {
            return String.Empty;
        }
        CultureInfo cultureInfo = CultureInfo.CurrentUICulture;
        return cultureInfo.TextInfo.ToTitleCase(todo);
    }
    public static int GetNextIdentifier(List<string> taskList)
    {
        int idTask = taskList.Count + 1;
        return idTask;
    }
    public static List<string> SetIdentifiersInNumericOrder(List<string> taskList, int TaskId)
    {
        List<string> taskListNew = new List<string>();

        foreach (string task in taskList)
        {
            string[] data = task.Split(",");
            if (Convert.ToInt32(data[0]) >= TaskId)
            {
                data[0] = data[0].ToString().Replace(data[0].ToString(), (Convert.ToInt32(data[0]) - 1).ToString());
                var taskNew = new StringBuilder();
                taskNew.Append(data[0] + "," + data[1] + "," + data[2]);
                taskListNew.Add(taskNew.ToString());
            }
            else
            {
                taskListNew.Add(task);
            }
        }
        return taskListNew;
    }
    public static string ValorCampo(object oCad)
    {
        string strValorCampo = "";
        if (!ReferenceEquals(oCad, null))
        {
            System.Type tipo = oCad.GetType();
            if (tipo.BaseType == typeof(Enum))
            {
                return ((Enum)oCad).ToString("d");
            }
            switch (tipo.Name)
            {
                case "DateTime":
                    strValorCampo = System.Convert.ToString(System.Convert.ToDateTime(oCad).ToString("dd/MM/yyyy"));
                    break;
                case "DBNull":
                    strValorCampo = "";
                    break;
                default:
                    strValorCampo = System.Convert.ToString(oCad).Trim();
                    break;
            }
        }
        else
        {
            strValorCampo = "";
        }
        return strValorCampo;
    }
    public static string RemoveLineBreaks(string oldString)
    {
        return Regex.Replace(oldString, @"\r\n?|\n", " ");
    }
}
