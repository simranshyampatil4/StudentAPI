import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-student',
  templateUrl: './add-edit-student.component.html',
  styleUrls: ['./add-edit-student.component.css']
})
export class AddEditStudentComponent implements OnInit{
  studentform:FormGroup;
  constructor(private fb:FormBuilder,private service:StudentService,
    private dialogref:MatDialogRef<AddEditStudentComponent>,@Inject (MAT_DIALOG_DATA) public data:any){
    this.studentform=this.fb.group({
      name: '',
      rollNo: '',
      email: '',
      age: '',
      isMale: '',
      date: '',
    })
  }
  ngOnInit(): void {
    console.log('data:', this.data); 
    if (this.data) {
      this.studentform.patchValue(this.data);
    }
  }
  onFormSubmit(){
    if(this.studentform.valid){
      if(this.data){
        this.service.updateStudent(this.data.id,this.studentform.value).subscribe({
          next:(val:any)=>{
            alert("Student Details Updated Successfully")
            this.dialogref.close(true)
          },
          error:(err:any)=>{
            alert(err);
          }
        })

      }else{
        this.service.addStudent(this.studentform.value).subscribe({
          next:(val:any)=>{
            alert("Student Added Successfully")
            this.dialogref.close(true)
          },
          error:(err:any)=>{
            alert(err);
          }
        })
      }
    }
  }
}

