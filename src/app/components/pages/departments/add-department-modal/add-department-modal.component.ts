import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchoolModel } from '../../../../models/school.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddStudentModal } from '../../students/add-student-modal/add-student-modal.component';
import { DepartmentService } from '../../../../services/department.service';
import { DepartmentModel } from '../../../../models/department.model';

@Component({
  selector: 'app-add-department-modal',
  templateUrl: './add-department-modal.component.html',
  styleUrls: ['./add-department-modal.component.scss']
})
export class AddDepartmentModal {
  form!: FormGroup;
  departments: DepartmentModel[] = [];

  constructor(    private departmentService: DepartmentService,
                  private fb: FormBuilder,
                  public dialogRef: MatDialogRef<AddStudentModal>,
                  @Inject(MAT_DIALOG_DATA) public data: any,) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.data?.name || '', Validators.required]
    })
  }

  submit(form: FormGroup) {
    if (form.valid) {
      const schoolId = this.data.schoolId;
      const body: DepartmentModel = {
        id: this.form.value['id'],
        name: this.form.value['name'],
        schoolId,
        school: null
      }
      if (!this.data) {
        this.departmentService.createDepartment(body)
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
