using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shouldly;
using Todos.Models;

namespace Todos.Tests.Controllers;
public class UtilsTests
{
    [Fact]
    public void Test_ToTileCase()
    {
        var testResult = Utils.ToTitleCase("a");
        testResult.ShouldBe("A");
    }
}
