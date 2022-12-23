import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddDepartmentModal } from './add-department-modal/add-department-modal.component';
import { DepartmentService } from '../../../services/department.service';
import { AddStudentModal } from '../students/add-student-modal/add-student-modal.component';
import { DepartmentModel } from '../../../models/department.model';
import { DeleteDepartmentModal } from './delete-department-modal/delete-department-modal.component';
import { SchoolService } from '../../../services/school.service';
import { SchoolModel } from '../../../models/school.model';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {

  DEPARTMENT_LIST: DepartmentModel[] = [];
  displayedColumns: string[] = ['id', 'name', 'school', 'getDetails', 'delete'];
  dataSource = new MatTableDataSource<DepartmentModel>(this.DEPARTMENT_LIST);
  depts: DepartmentModel[] = [];
  schools: SchoolModel[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog,
              private departmentService: DepartmentService,
              private schoolService: SchoolService) {
  }

  ngOnInit() {
    this.departmentService.getDepartments()
      .subscribe(response => {
        this.dataSource = new MatTableDataSource<DepartmentModel>(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    this.schoolService.getSchools()
      .subscribe(response => {
        this.schools = response;
      })
  }

  getRecord(row: any, enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(AddDepartmentModal, {
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

  deleteDepartment(row: any, enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(DeleteDepartmentModal, {
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
        this.departmentService.deleteDepartment(row.id)
          .subscribe(response => {
            const a = document.createElement('a');
            a.click();
            a.remove();
            this.ngOnInit();
          })
      }})
  }

  findDept(dept: number) {
    const depart = this.schools?.find(school => dept == school.id )
    return depart?.name
  }

  addDepartment(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(AddDepartmentModal, {
      width: '650px',
      enterAnimationDuration,
      exitAnimationDuration,
    })
      .afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }

}
