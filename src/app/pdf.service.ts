import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';


@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }


  generatePdf(data:any[],fileName:string){
    const doc = new jsPDF();

    
    const headers=['Id','Title','Description',
    'Due-Date','Priority','Status']

    const tableData=[];
    tableData.push(headers)

    data.forEach((item)=>{
      const rowData=[];
      rowData.push(item.id);
      rowData.push(item.title);
      rowData.push(item.description);
      rowData.push(item.dueDate);
      rowData.push(item.priority);
      rowData.push(item.status);
    });

    // (doc as any).autoTable(doc, {
    //   head: tableData[0],
    //   body: tableData.slice(1)
    // });

    doc.save(fileName);
  }
}
