import { Injectable } from '@angular/core';
import { TaskInterface } from '../Interfaces/task.interface';
import { ParsedEvent } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: TaskInterface[] = [];
  constructor() { 
    this.loadTasks();
  }

  getTasks(): TaskInterface[] {
    return this.tasks;
  }

  addTask(task:any){
    console.log(task);
  
    if(!Array.isArray(this.tasks)){
      this.tasks=[];
    }
    this.tasks.push(task);
    this.saveTasks();
  }

  saveTasks():void{
    const tasksJSON = JSON.stringify(this.tasks);
    localStorage.setItem('tasks', tasksJSON);
  }

  private loadTasks():void{
    const tasksJSON = localStorage.getItem('tasks');
    if(tasksJSON){
      try{
        const parsedtasks =JSON.parse(tasksJSON);
        if(Array.isArray(parsedtasks)){
          this.tasks=parsedtasks
        }else{
          console.error('Stored tasks in localStorage is not an array.');
          this.tasks = [];
        }
      }
      catch(error){
        console.error('Error parsing tasks from localStorage:', error);
        this.tasks = [];
      }
    } else {
      this.tasks = [];
      this.saveTasks();
    }
      }
    }

