import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../../services/student.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DepartmentModel } from '../../../../models/department.model';

@Component({
  selector: 'app-add-student-modal',
  templateUrl: './add-student-modal.component.html',
  styleUrls: ['./add-student-modal.component.scss']
})
export class AddStudentModal implements OnInit {

  form!: FormGroup;
  departments: DepartmentModel[] = [];
  constructor(private studentService: StudentService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      title: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required,]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      department: ['', [Validators.required]]
    })
    this.studentService.getDepartments()
      .subscribe(response => {
        this.departments = response;
        console.log(this.departments)
      })
  }

  submit(form: FormGroup) {
    if(form.valid) {
    this.studentService.createStudent(form.value)
      .subscribe(response => {
        console.log(response)
      })
    } else {
      console.log(form)
    }
  }

}
