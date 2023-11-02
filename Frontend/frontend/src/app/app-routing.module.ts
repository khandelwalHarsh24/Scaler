import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { StudentcardComponent } from './card/studentcard/studentcard.component';
import { AssignstudentComponent } from './assignstudent/assignstudent.component';
import { EditstudentComponent } from './editstudent/editstudent.component';

const routes: Routes = [
  { path: '', component: StudentcardComponent },
  { path: 'assign_student/:id' , component: AssignstudentComponent},
  {path:'editmarks/:id',component: EditstudentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
