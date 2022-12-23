import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SchoolModel } from '../models/school.model';
import { environment } from '../environments/environment';
import { DepartmentsComponent } from '../components/pages/departments/departments.component';
import { DepartmentModel } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<DepartmentModel[]> {
    return this.http.get<DepartmentModel[]>(`${environment.API_BASE_URL}/departments`)
  }

  deleteDepartment(id: string) {
    return this.http.delete(`${environment.API_BASE_URL}/departments/${id}`)
  }

  createDepartment(body: any) {
    return this.http.post(`${environment.API_BASE_URL}/departments`, body)
  }

  updateDepartment(id: string, body: any) {
    return this.http.put(`${environment.API_BASE_URL}/departments/${id}`, body)
  }
}
