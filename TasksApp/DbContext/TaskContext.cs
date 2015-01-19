using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using TasksApp.Models;

namespace TasksApp.DbContext
{
    public class TaskContext : System.Data.Entity.DbContext
    {
        public TaskContext() : base("TaskContext")
        {

        }

        public DbSet<Task> tasks { get; set; }               
    }
}