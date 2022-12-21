import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../services/student.service';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentModal } from './add-student-modal/add-student-modal.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  constructor(public dialog: MatDialog, private studentsService: StudentService) {}

  ngOnInit() {
    this.studentsService.getStudents();
  }

  addStudent(enterAnimationDuration: string, exitAnimationDuration: string) {
      this.dialog.open(AddStudentModal, {
        width: '550px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
  }
}
