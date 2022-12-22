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
  styleUrls: ['./add-student-modal.component.scss'],
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
      firstName: [this.data?.firstName || '', [Validators.required]],
      lastName: [this.data?.lastName || '', [Validators.required]],
      title: [this.data?.title || '', [Validators.required]],
      phoneNumber: [this.data?.phoneNumber || '', [Validators.required]],
      dateOfBirth: [this.data?.dateOfBirth || '', [Validators.required]],
      email: [this.data?.email || '', [Validators.required, Validators.email]],
      address: [this.data?.address || '', [Validators.required]],
      departmentId: [this.data?.departmentId || '', [Validators.required]],
      schoolId: [this.data?.schoolId || ''],
    })
    this.studentService.getDepartments()
      .subscribe(response => {
        this.departments = response;
      })
    this.studentService.getSchools()
      .subscribe(response => {
        this.schools = response;
      })
  }

  submit(form: FormGroup) {
    if (form.valid) {
      const pickedDept = this.departments.find(department => department.id === this.form.value['departmentId']);
      const pickedSchool = this.schools.find(school => school.id === this.form.value['schoolId']);
      const pickedDOB = (typeof this.form?.value['dateOfBirth'] == 'object') ? this.form?.value['dateOfBirth'].toISOString() : this.form.value['dateOfBirth'];
      console.log(typeof this.form?.value['dateOfBirth'], 'TYPE')
      const body: StudentModel = {
        firstName: this.form.value['firstName'],
        lastName: this.form.value['lastName'],
        title: this.form.value['title'],
        email: this.form.value['email'],
        address: this.form.value['address'],
        phoneNumber: this.form.value['phoneNumber'],
        dateOfBirth: pickedDOB,
        departmentId: this.form.value['departmentId'],
        department: {
          id: this.form.value['departmentId'],
          name: pickedDept?.name,
          schoolId: this.form.value['schoolId'],
          school: {
            id: this.form.value['schoolId'],
            name: pickedSchool?.name,
          },
        },
      }
      if (!this.data) {
        this.studentService.createStudent(body)
          .subscribe({
            next: (data) => {
              console.log(data);
              this.dialogRef.close();
            },
            error: (err) => {
              console.log(err);
              this.dialogRef.close();
            },
          })
      } else {
        console.log(this.data.id)
        body.id = this.data.id;
        this.studentService.updateStudent(this.data.id, body)
          .subscribe({
            next: (data) => {
              console.log(data);
              this.dialogRef.close();
            },
            error: (err) => {
              console.log(err);
              this.dialogRef.close();
            },
          })
      }

    } else {
      this.dialogRef.close()
    }
  }

}
