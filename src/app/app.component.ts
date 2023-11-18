import { Component, OnInit ,ViewChild,AfterViewInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditStudentComponent } from './add-edit-student/add-edit-student.component';
import { StudentService } from './services/student.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-crud';
  displayedColumns: string[] = 
  ['id', 'name', 'rollNo', 'email','age','isMale','date','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog,private service:StudentService){}

  ngOnInit(): void {
      this.getStudentList()
  }
  openAddEditStudentForm(){
    const dialogRef=this.dialog.open(AddEditStudentComponent);
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getStudentList();
        }
      }
    })
  }
  editStudentForm(data:any){
    this.dialog.open(AddEditStudentComponent,{
      data: data,
    })  
  }
  getStudentList(){
    this.service.getAllStudents().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator
        //console.log(res);
        
      },
      error:(err)=>{
        alert(err);
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteStudent(id:any){
    this.service.deleteStudent(id).subscribe({
      next:(res)=>{
        alert("Employee Deleted Successfully")
        this.getStudentList();
      },
      error:console.log,
      
    })
  }
}
