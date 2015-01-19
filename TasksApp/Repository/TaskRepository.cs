using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TasksApp.DbContext;
using TasksApp.Models;
using System.Data.Entity;

namespace TasksApp.Repository
{
    public class TaskRepository
    {
        private TaskContext dbContext = null;

        public TaskRepository()
        {
            this.dbContext = new TaskContext();
        }

        public void addTask(Task task)
        {
            dbContext.tasks.Add(task);
            dbContext.SaveChanges();
        }

        public IList<Task> getAllTasks()
        {
            var tasks = (from task in dbContext.tasks
                         orderby task.Order
                         select task).ToList();                         

            return tasks;
        }

        public void deleteTask(int id)
        {
            var taskToDelete = (from task in dbContext.tasks
                                where task.Id == id
                                select task).SingleOrDefault();

            dbContext.tasks.Remove(taskToDelete);
            dbContext.SaveChanges();
        }

        public void updateStatus(List<int> TaskIds, bool status)
        {
            var tasks = (from task in dbContext.tasks
                                where TaskIds.Contains(task.Id)
                                select task).ToList();

            foreach (var task in tasks)
            {
                task.Done = status;
            }
                       
            dbContext.SaveChanges();
        }
    }
}