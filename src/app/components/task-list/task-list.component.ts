import { Component, OnInit } from '@angular/core';
import { TaskInterface } from 'src/app/Interfaces/task.interface';
import { TaskService } from 'src/app/Services/task.service';
import { PdfService } from 'src/app/pdf.service';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
tasks:TaskInterface[];
editingTaskId: number | null = null;
editingTask: any = null;
showPopup = false;
selectedStatus = '';
taskIdToUpdate: number | undefined;

  constructor(
    private taskService:TaskService,
    private pdfService: PdfService
    ) { 
   this.tasks=this.taskService.getTasks();
  }

  ngOnInit(): void {
  }




  
  editTask(task:any){
    this.editingTaskId=task.id;
    this.editingTask={...task}
  }

  isEditingTask(taskId?:any):boolean{
    return this.editingTaskId===taskId;
    
  }
  updatedTask(task:any){
    const taskToUpdate=this.tasks?.find((t)=> 
    t.id ===task.id);
    if(taskToUpdate){
      taskToUpdate.title = this.editingTask.title;
      taskToUpdate.description = this.editingTask.description;
      taskToUpdate.dueDate = this.editingTask.dueDate;
      taskToUpdate.priority = this.editingTask.priority;
    }
    this.editingTaskId=null;
  }

  cancelEdit(){
    this.editingTaskId = null;
    this.editingTask = null;
  }

  showStatusPopup(task:any,id:number){
    this.selectedStatus = task.status;
    this.taskIdToUpdate = id;
    this.showPopup = true;
  }
  updateStatus() {
    const taskToUpdate = this.tasks.find(
      (task: TaskInterface) => task.id === this.taskIdToUpdate
    );

    if (taskToUpdate) {
      taskToUpdate.status = this.selectedStatus;
    }

    this.showPopup = false;
  }

  closePopup() {
    this.showPopup = false;
  }



  onDelete(taskid:any){
    const ind=this.tasks.findIndex((task)=>task.id === taskid);
    if(ind !== -1){
      this.tasks.splice(ind,1);
      this.taskService.saveTasks();
      console.log('Task Deleted Successfully');
    }else{
      console.log('Task not found.');
    }

  }

  sortTasksByDueDate(){
    this.tasks?.sort((a,b)=>{
      const dateA=new Date(a.dueDate);
      const dateB=new Date(b.dueDate);
      return dateA.getTime()-dateB.getTime();
    })
  }
  sortTasksByPriority(){

 const priorityMap:{[key: string]:number}={
    low: 3,
    medium: 2,
     high: 1,
 };
 
 this.tasks?.sort((a,b)=>{
  const priorityA=priorityMap[a.priority.toLowerCase()];
  const priorityB=priorityMap[b.priority.toLowerCase()];

  return priorityA-priorityB;
 })

  }

  sortTasksByStatus(){
    this.tasks?.sort((a,b)=>{
    if(a.status <b.status) return -1;
     if(a.status > b.status) return 1;
    return 0
 })
 
  }



  
  exportToCSV(){
 const csvData=Papa.unparse(this.tasks,{
  header:true
 })
 const blob=new Blob([csvData],{type:'text/csv'});
    const url =window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href=url;
    a.download='tasks.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  exportToPDF(){
   this.pdfService.generatePdf(this.tasks,'test');
  }

  exportToText(){
    const jsonData = JSON.stringify(this.tasks);
  const blob = new Blob([jsonData], { type: 'text/plain' });
const url = URL.createObjectURL(blob);

const downloadLink = document.createElement('a');
downloadLink.href = url;
downloadLink.download = 'data.txt';

downloadLink.click();

URL.revokeObjectURL(url);
  }
}
