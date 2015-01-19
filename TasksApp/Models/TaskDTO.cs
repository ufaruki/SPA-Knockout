using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TasksApp.Models
{
    public class TaskDTO
    {
        public List<int> TaskIDs { get; set; }
        public bool Status { get; set; }
    }
}