import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { TaskService } from 'src/app/Services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
 constructor(private taskService:TaskService) { }
  newTask={
    id:this.generateNewId(),
    title:'',
    description:'',
    dueDate:new Date(),
    priority:'',
    status:'to-do'
  }

  ngOnInit() {
  }

  addTask(title:string,description:string,dueDate:Date,priority:string){
   console.log(title,description,dueDate,priority);
  if (title && description && dueDate && priority) {
   this.taskService.addTask(this.newTask);
     this.resetNewTask();
  }
  }

  private resetNewTask() {
    this.newTask = {
      id: this.generateNewId(),
      title: '',
      description: '',
      dueDate: new Date(),
      priority: '',
      status: 'to-do',
    }; 
  }


  generateNewId():number{
    return Math.floor(Math.random()*10000)
  }
}
