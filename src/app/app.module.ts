import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './materials/materials.module';
import { HeaderComponent } from './components/partials/header/header.component';
import { StudentsComponent } from './components/pages/students/students.component';
import { HttpClientModule } from '@angular/common/http';
import { AddStudentModal } from './components/pages/students/add-student-modal/add-student-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteStudentModal } from './components/pages/students/delete-student-modal/delete-student-modal.component';
import { DepartmentsComponent } from './components/pages/departments/departments.component';
import { SchoolsComponent } from './components/pages/schools/schools.component';
import { AddSchoolModal } from './components/pages/schools/add-school-modal/add-school-modal.component';
import { DeleteSchoolModal } from './components/pages/schools/delete-school/delete-school.component';
import { AddDepartmentModal } from './components/pages/departments/add-department-modal/add-department-modal.component';
import { DeleteDepartmentModal } from './components/pages/departments/delete-department-modal/delete-department-modal.component';
import { OnlyNumber } from './services/directives/NumbersOnly';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StudentsComponent,
    AddStudentModal,
    DeleteStudentModal,
    DepartmentsComponent,
    SchoolsComponent,
    AddSchoolModal,
    DeleteSchoolModal,
    AddDepartmentModal,
    DeleteDepartmentModal,
    OnlyNumber,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
