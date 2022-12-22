import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../../../services/student.service';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentModal } from './add-student-modal/add-student-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { StudentModel } from '../../../models/student.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DepartmentModel } from '../../../models/department.model';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {


  constructor(public dialog: MatDialog, private studentsService: StudentService) {}

  STUDENTS_LIST: StudentModel[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phoneNumber', 'departmentId', 'getDetails'];
  dataSource = new MatTableDataSource<StudentModel>(this.STUDENTS_LIST);
  departments!: DepartmentModel[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.studentsService.getStudents()
      .subscribe(response => {
        this.dataSource = new MatTableDataSource<StudentModel>(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    this.studentsService.getDepartments()
      .subscribe(response => {
        this.departments = response;
      })
  }

  ngAfterViewInit() {
  }

  addStudent(enterAnimationDuration: string, exitAnimationDuration: string) {
      this.dialog.open(AddStudentModal, {
        width: '650px',
        enterAnimationDuration,
        exitAnimationDuration,
      })
        .afterClosed()
        .subscribe(() => {
          this.ngOnInit();
        });
  }

  findDept(dept: number) {
    const depart = this.departments?.find(department => dept == department.id )
    return depart?.name
  }

  getRecord(row: any, enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(AddStudentModal, {
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
}
