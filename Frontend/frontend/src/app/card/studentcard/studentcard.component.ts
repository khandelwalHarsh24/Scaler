import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from 'src/app/shared/student.service';

@Component({
  selector: 'app-studentcard',
  templateUrl: './studentcard.component.html',
  styleUrls: ['./studentcard.component.css'],
})
export class StudentcardComponent implements OnInit {
  constructor(private studentService: StudentService) {}

  studentdata: any[] = [];
  isDisabled = false;
   

  ngOnInit(): void {
    this.loadStudentData();
    
  }



  isMentorAssigned(student: any): boolean {
    return student.mentor_assigned !== null;
  }

  private loadStudentData() {
    this.studentService.getStudent().subscribe((data) => {
      this.studentdata = data.filter(
        (student) => student.mentor_assigned === null
      );
    });
  }

  

  toggleButtonState(i: any) {
    const assigningStudent = {
      studentId: this.studentdata[i]._id,
      mentorId: '654308d888308469f2635ba2',
    };
    // this.studentService.assignStudent(assigningStudent).subscribe(
    //   (response) => {
    //     console.log(response);
    //     this.loadStudentData();
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
    this.studentService.getMentor('654308d888308469f2635ba2').subscribe((mentorData) => {
      if (mentorData.lock===true) {
        alert('Already Submitted')
      } else {
        this.studentService.assignStudent(assigningStudent).subscribe(
          (response) => {
            console.log(response);
            this.loadStudentData();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }
}
