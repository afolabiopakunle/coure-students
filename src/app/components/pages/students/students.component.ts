import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../../../services/student.service';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentModal } from './add-student-modal/add-student-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { StudentModel } from '../../../models/student.model';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {


  constructor(public dialog: MatDialog, private studentsService: StudentService) {}

  STUDENTS_LIST: StudentModel[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email'];
  dataSource = new MatTableDataSource<StudentModel>(this.STUDENTS_LIST);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.studentsService.getStudents()
      .subscribe(response => {
        this.dataSource = new MatTableDataSource<StudentModel>(response)
        console.log(this.STUDENTS_LIST)
      });
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<StudentModel>(this.STUDENTS_LIST)
  }

  addStudent(enterAnimationDuration: string, exitAnimationDuration: string) {
      this.dialog.open(AddStudentModal, {
        width: '550px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
  }
}
