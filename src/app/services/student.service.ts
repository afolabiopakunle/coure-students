import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { StudentModel } from '../models/student.model';
import { Observable } from 'rxjs';
import { DepartmentModel } from '../models/department.model';
import { SchoolModel } from '../models/school.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getStudents(): Observable<StudentModel[]> {
   return this.http.get<StudentModel[]>(`${environment.API_BASE_URL}/students`)
  }

  createStudent(data: StudentModel): Observable<StudentModel> {
    return this.http.post<StudentModel>(`${environment.API_BASE_URL}/students`, data)
  }

  getDepartments(): Observable<DepartmentModel[]> {
    return this.http.get<DepartmentModel[]>(`${environment.API_BASE_URL}/departments`)
  }

  getSchools(): Observable<SchoolModel[]> {
    return this.http.get<SchoolModel[]>(`${environment.API_BASE_URL}/schools`)
  }
}
