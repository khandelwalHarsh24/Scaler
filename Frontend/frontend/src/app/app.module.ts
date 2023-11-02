import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentcardComponent } from './card/studentcard/studentcard.component';
import { StudentService } from './shared/student.service';
import { HttpClientModule } from '@angular/common/http';
import { AssignstudentComponent } from './assignstudent/assignstudent.component';
import { EditstudentComponent } from './editstudent/editstudent.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    StudentcardComponent,
    AssignstudentComponent,
    EditstudentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
