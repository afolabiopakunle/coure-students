import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../../services/student.service';

@Component({
  selector: 'app-add-student-modal',
  templateUrl: './add-student-modal.component.html',
  styleUrls: ['./add-student-modal.component.scss']
})
export class AddStudentModal implements OnInit {

  constructor(private studentService: StudentService) {
  }

  ngOnInit(): void {

  }

}
