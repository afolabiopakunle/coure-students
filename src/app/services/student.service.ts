import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getStudents() {
    this.http.get(`${environment.API_BASE_URL}/students`)
      .subscribe(response => {
        console.log(response)
      })
  }
}
