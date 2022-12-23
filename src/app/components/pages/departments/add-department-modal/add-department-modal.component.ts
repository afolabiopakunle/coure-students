import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchoolModel } from '../../../../models/school.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddStudentModal } from '../../students/add-student-modal/add-student-modal.component';
import { DepartmentService } from '../../../../services/department.service';
import { DepartmentModel } from '../../../../models/department.model';
import { SchoolService } from '../../../../services/school.service';
import { StudentService } from '../../../../services/student.service';

@Component({
  selector: 'app-add-department-modal',
  templateUrl: './add-department-modal.component.html',
  styleUrls: ['./add-department-modal.component.scss']
})
export class AddDepartmentModal {
  form!: FormGroup;
  departments: DepartmentModel[] = [];
  schools: SchoolModel[] = [];

  constructor(    private departmentService: DepartmentService,
                  private studentService: StudentService,
                  private fb: FormBuilder,
                  public dialogRef: MatDialogRef<AddDepartmentModal>,
                  @Inject(MAT_DIALOG_DATA) public data: any,) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      schoolId: [this.data?.schoolId || '', Validators.required]
    })
    this.studentService.getSchools()
      .subscribe(response => {
        this.schools = response;
      })
  }

  submit(form: FormGroup) {
    if (form.valid) {
      const schoolName = this.schools.find(school => this.form.value['schoolId'] == school.id)
      const body: DepartmentModel = {
        id: this.form.value['id'],
        name: this.form.value['name'],
        schoolId: this.form.value['schoolId'],
        school: {
          id: this.form.value['schoolId'],
          name: schoolName?.name
        }
      }
      if (!this.data) {
        this.departmentService.createDepartment(body)
          .subscribe({
            next: (data) => {
              this.dialogRef.close();
            },
            error: (err) => {
              this.dialogRef.close();
            },
          })
      } else {
        body.id = this.data.id;
        this.departmentService.updateDepartment(this.data.id, body)
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
