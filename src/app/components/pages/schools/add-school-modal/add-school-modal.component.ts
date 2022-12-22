import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchoolModel } from '../../../../models/school.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SchoolService } from '../../../../services/school.service';
import { AddStudentModal } from '../../students/add-student-modal/add-student-modal.component';

@Component({
  selector: 'app-add-school-modal',
  templateUrl: './add-school-modal.component.html',
  styleUrls: ['./add-school-modal.component.scss']
})
export class AddSchoolModal implements OnInit {

  form!: FormGroup;
  schools: SchoolModel[] = [];

  constructor(    private schoolService: SchoolService,
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
      const body: SchoolModel = {
        id: this.form.value['id'],
        name: this.form.value['name'],
      }
      if (!this.data) {
        this.schoolService.createSchool(body)
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
        this.schoolService.updateSchool(this.data.id, body)
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
