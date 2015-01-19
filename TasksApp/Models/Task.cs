using System;
using System.ComponentModel.DataAnnotations;

namespace TasksApp.Models
{
    public class Task
    {                
        public int Id { get; set; }

        public int Order { get; set; }

        public bool Done { get; set; }        

        [Required]
        public string Text { get; set; }

        public DateTime Date { get; set; }
    }
}
