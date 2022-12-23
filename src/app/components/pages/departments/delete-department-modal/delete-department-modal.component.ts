import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-department-modal',
  templateUrl: './delete-department-modal.component.html',
  styleUrls: ['./delete-department-modal.component.scss']
})
export class DeleteDepartmentModal {

  constructor(public dialogRef: MatDialogRef<DeleteDepartmentModal>,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

  ngOnInit() {
    console.log(this.data)
  }
}
