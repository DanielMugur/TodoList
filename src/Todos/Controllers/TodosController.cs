using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using System.Net.Mime;
using System.Text;
using Todos.Models;
using Todos.Models.DTO;
using Todos.Models.Interfaces;

namespace Todos.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class TodosController : ControllerBase
{
    ITodoModel TodoObj = new TodoModel();

    [HttpGet]
    public IActionResult GetList()
    {
        string todoList = TodoObj.CreateStringResponse();

        return Content(todoList, MediaTypeNames.Application.Json, Encoding.UTF8);
    }

    [HttpPost]
    public IActionResult CreateTask([FromBody]TodoDTO todoDTO)
    {
        bool success = TodoObj.CreateTask(todoDTO);

        if (success)
        {
            return StatusCode(StatusCodes.Status200OK, success);
        }
        else
        {
            return StatusCode(StatusCodes.Status304NotModified, success);
        }
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteTask(string id)
    {
        bool success = TodoObj.DeleteTask(id);

        if (success)
        {
            return StatusCode(StatusCodes.Status200OK, success);
        }
        else
        {
            return StatusCode(StatusCodes.Status304NotModified, success);
        }
    }

    [HttpPut]
    public IActionResult UpdateTask([FromBody]TodoDTO todoDTO)
    {
        bool success = TodoObj.UpdateTask(todoDTO);

        if (success)
        {
            return StatusCode(StatusCodes.Status200OK, success);
        }
        else
        {
            return StatusCode(StatusCodes.Status304NotModified, success);
        }
    }
}
