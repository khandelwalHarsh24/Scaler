
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class StudentService {

  constructor(private http: HttpClient) {}

  getStudent(): Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3000/api/v1/getStudents');
  }

  assignStudent(data:any): Observable<any>{
    return this.http.post<any>('http://localhost:3000/api/v1/student/insert',data);
  }

  deleteassignStudent(data:any):  Observable<any>{
    return this.http.post<any>('http://localhost:3000/api/v1/studentid/delete',data);
  }

  getSingleStudent(id:any): Observable<any>{
    return this.http.get<any>(`http://localhost:3000/api/v1/student/${id}`)
  }

  editData(studentData:any): Observable<any>{
    console.log(studentData);
    return this.http.post<any>('http://localhost:3000/api/v1/studentmarks/edit',studentData).pipe(
      map((response: any) => response), // Assuming the response is in the expected format
      catchError((error: any) => {
        console.error('Edit request failed:', error);
        // Handle the error as needed (e.g., logging, user feedback)
        return throwError('Edit request failed. Please try again later.'); // You can customize the error message
      })
    );;
  }

  submitData(mentorId:any):Observable<any>{
    return this.http.post<any>('http://localhost:3000/api/v1/student/finalSubmit',{mentorId})
  }


  getMentor(mentorId:any):Observable<any>{
    return this.http.get<any>(`http://localhost:3000/api/v1/getMentor/${mentorId}`);
  }

  filterByMarks(id: any): Observable<any>{
    return this.http.get<any>(`http://localhost:3000/api/v1/students/filter/assignmarks/${id}`)
  }

  filterByMarksNotAssign(id: any): Observable<any>{
    return this.http.get<any>(`http://localhost:3000/api/v1/students/filter/notassignmarks/${id}`)
  }

  
}
