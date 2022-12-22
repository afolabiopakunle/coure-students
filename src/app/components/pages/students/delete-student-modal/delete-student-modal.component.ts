import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-student-modal',
  templateUrl: './delete-student-modal.component.html',
  styleUrls: ['./delete-student-modal.component.scss']
})
export class DeleteStudentModal {

  name!: string;

  constructor(public dialogRef: MatDialogRef<DeleteStudentModal>,
              @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}
