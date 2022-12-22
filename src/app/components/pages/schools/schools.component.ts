import { Component, OnInit, ViewChild } from '@angular/core';
import { AddStudentModal } from '../students/add-student-modal/add-student-modal.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { SchoolService } from '../../../services/school.service';
import { StudentModel } from '../../../models/student.model';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentModel } from '../../../models/department.model';
import { SchoolModel } from '../../../models/school.model';
import { DeleteStudentModal } from '../students/delete-student-modal/delete-student-modal.component';
import { AddSchoolModal } from './add-school-modal/add-school-modal.component';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss']
})
export class SchoolsComponent implements OnInit {

  SCHOOL_LIST: SchoolModel[] = [];
  displayedColumns: string[] = ['id', 'name', 'getDetails', 'delete'];
  dataSource = new MatTableDataSource<SchoolModel>(this.SCHOOL_LIST);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private schoolService: SchoolService) {
  }

  ngOnInit() {
    this.schoolService.getSchools()
      .subscribe(response => {
        this.dataSource = new MatTableDataSource<SchoolModel>(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  addSchool(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(AddSchoolModal, {
      width: '650px',
      enterAnimationDuration,
      exitAnimationDuration,
    })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  getRecord(row: any, enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(AddSchoolModal, {
      width: '650px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: row,
    })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  deleteSchool(row: any, enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(DeleteStudentModal, {
      width: '650px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        row,
        message: 'Are you sure you want to delete?',
        buttonText: {
          ok: 'Delete',
          cancel: 'No'
        }
      },
    })
      .afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log(confirmed, row);
        this.schoolService.deleteSchool(row.id)
          .subscribe(response => {
            const a = document.createElement('a');
            a.click();
            a.remove();
            this.ngOnInit();
          })

      }})
  }
}
