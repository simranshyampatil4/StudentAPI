import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  url = "http://gsmktg.azurewebsites.net/api/v1/techlabs/test/students"
  constructor(private http:HttpClient) { }

  //create
  addStudent(data:any):Observable<any>{
    return this.http.post(this.url, data);
  }

  //Read
  getAllStudents():Observable<any>{
    return this.http.get(this.url)
  }
  //update
  updateStudent(id: any, data: any): Observable<any> {
    return this.http.put(this.url + "/" + id, data);
  }

  //delete
  deleteStudent(id:any):Observable<any>{
    return this.http.delete(this.url + "/" + id);
  }

}
