import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-school',
  templateUrl: './delete-school.component.html',
  styleUrls: ['./delete-school.component.scss']
})
export class DeleteSchoolModal implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteSchoolModal>,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

  ngOnInit() {
    console.log(this.data)
  }

}
