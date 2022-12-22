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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StudentsComponent,
    AddStudentModal,
    DeleteStudentModal
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
