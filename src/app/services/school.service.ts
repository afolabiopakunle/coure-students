import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SchoolModel } from '../models/school.model';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private http: HttpClient) { }

  getSchools(): Observable<SchoolModel[]> {
    return this.http.get<SchoolModel[]>(`${environment.API_BASE_URL}/schools`)
  }

  deleteSchool(id: string) {
    return this.http.delete(`${environment.API_BASE_URL}/students/${id}`)
  }

  createSchool(body: any) {
    return this.http.post(`${environment.API_BASE_URL}/schools`, body)
  }

  updateSchool(id: string, body: any) {
    return this.http.put(`${environment.API_BASE_URL}/schools`, body)
  }
}
