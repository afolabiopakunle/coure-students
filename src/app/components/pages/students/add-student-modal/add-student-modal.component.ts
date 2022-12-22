import { Component, Inject, OnInit } from '@angular/core';
import { StudentService } from '../../../../services/student.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DepartmentModel } from '../../../../models/department.model';
import { SchoolModel } from '../../../../models/school.model';
import { StudentModel } from '../../../../models/student.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-student-modal',
  templateUrl: './add-student-modal.component.html',
  styleUrls: ['./add-student-modal.component.scss']
})
export class AddStudentModal implements OnInit {

  form!: FormGroup;
  departments: DepartmentModel[] = [];
  schools: SchoolModel[] = [];

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddStudentModal>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      title: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required,]],
      dateOfBirth: ['', [Validators.required,]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      departmentId: ['', [Validators.required]],
      schoolId: ['', [Validators.required]],
    })
    this.studentService.getDepartments()
      .subscribe(response => {
        this.departments = response;
      })
    this.studentService.getSchools()
      .subscribe(response => {
        this.schools = response;
        console.log(this.schools)
      })
  }

  submit(form: FormGroup) {
    if (form.valid) {
    const pickedDept = this.departments.find(department => department.id === this.form.value['departmentId']);
    const pickedSchool = this.schools.find(school => school.id === this.form.value['schoolId']);
    const body: StudentModel = {
        // id: Math.random() * 9999999,
        firstName: this.form.value['firstName'],
        lastName: this.form.value['lastName'],
        title: this.form.value['title'],
        email: this.form.value['email'],
        address: this.form.value['address'],
        phoneNumber: this.form.value['phoneNumber'],
        dateOfBirth: this.form.value['dateOfBirth'].toISOString(),
        departmentId: this.form.value['departmentId'],
        department: {
          id: this.form.value['departmentId'],
          name: pickedDept?.name,
          schoolId: this.form.value['schoolId'],
          school: {
            id: this.form.value['schoolId'],
            name: pickedSchool?.name
          }
        }
      }
      console.log(body)
      this.studentService.createStudent(body)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.dialogRef.close();
          },
          error: (err) => {
            console.log(err);
            this.dialogRef.close();
          }
        })
      } else {
        this.dialogRef.close()
    }
    }

}
