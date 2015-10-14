using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TasksApp.Repository;
using TasksApp.Models;
using Newtonsoft.Json;

namespace TasksApp.Controllers
{
    public class TaskController : Controller
    {
        private TaskRepository taskRepository = null;

        public TaskController()
        {
            this.taskRepository = new TaskRepository();
        }

        [HttpGet]
        public string Tasks()
        {           
            var tasks = taskRepository.getAllTasks().ToList();
            JsonSerializerSettings settings = new JsonSerializerSettings();           
            string jsonModel = Newtonsoft.Json.JsonConvert.SerializeObject(tasks);

            return jsonModel;
        }

        [HttpPost]        
        public void AddTask(Task task)
        {
            string date = task.Date.ToShortDateString();
            task.Date = Convert.ToDateTime(task.Date.ToShortDateString());            
            taskRepository.addTask(task);        
        }
        
        [HttpPost]
        public void DeleteTask(Task task)
        {
            taskRepository.deleteTask(task.Id);            
        }

        [HttpPost]
        public void UpdateStatus(TaskDTO taskDTO)
        {
            taskRepository.updateStatus(taskDTO.TaskIDs, taskDTO.Status);
        }  
    }    
}



