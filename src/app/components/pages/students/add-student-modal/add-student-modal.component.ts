import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../../services/student.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-student-modal',
  templateUrl: './add-student-modal.component.html',
  styleUrls: ['./add-student-modal.component.scss']
})
export class AddStudentModal implements OnInit {

  form!: FormGroup;

  constructor(private studentService: StudentService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      title: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required,]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      departmentId: ['', [Validators.required]],
      department: ['', [Validators.required]]
    })
  }

}
