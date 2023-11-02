import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../shared/student.service';

@Component({
  selector: 'app-assignstudent',
  templateUrl: './assignstudent.component.html',
  styleUrls: ['./assignstudent.component.css']
})
export class AssignstudentComponent implements OnInit {

  mentorId: string="";
  isEmpty: boolean=true;
  studentdata: any[]=[];
  constructor(private route: ActivatedRoute,private studentService: StudentService,private router:Router) { }
  data={};
  isDisabled=false;

  showStudentsWithMarks: boolean = false;
  showStudentsWithoutMarks: boolean = false;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.mentorId = params['id']; 
    });
    this.loadStudentData();
    this.getMentor();
  }

  private loadStudentData() {
    this.studentService.getStudent().subscribe(data => {
      this.studentdata = data;
      this.studentdata = this.studentdata.filter((student) => {
        return student.mentor_assigned === this.mentorId;
      });
      this.updateIsEmpty();
  })
}


  assignMarks(i:any){
    console.log(this.studentdata[i]._id);
    this.router.navigateByUrl(`editmarks/${this.studentdata[i]._id}`);
  }

  submitdata(){
    console.log(this.mentorId)
    this.studentService.submitData(this.mentorId).subscribe(
      (response) => {
        if (response.lock===true) {
          this.isDisabled = true;
        }
      },
      (error)=>{
        alert('All student marks is not assign')
      }
    );
    
  }

  private getMentor(){
    this.studentService.getMentor(this.mentorId).subscribe((data)=>{
      console.log(data);
      if(data.lock===true){
        this.isDisabled=true;
      }
     })
  }

  removeData(i:any){
    const assigningStudent={
      studentId: this.studentdata[i]._id,
      mentorId: '654308d888308469f2635ba2'
    }
    this.studentService.deleteassignStudent(assigningStudent).subscribe((res)=>{
      console.log(res);
      this.loadStudentData();
      if(this.studentdata.length!==0){
        this.isEmpty=false;
      }
    },
    (error)=>{
      alert('Data does not exist');
    }); 
  }

  private updateIsEmpty() {
    this.isEmpty = this.studentdata.length === 0;
  }



  onFilterMarks(event: any) {
    if (this.showStudentsWithMarks) {
      this.studentService.filterByMarks(this.mentorId).subscribe((filteredData) => {
        this.studentdata = filteredData;
        this.updateIsEmpty();
      });
    } else {
      this.loadStudentData();
    }
  }
  

  onFilterMarksNotAssign(event: any) {
    if (this.showStudentsWithoutMarks) {
      this.studentService.filterByMarksNotAssign(this.mentorId).subscribe((filteredData) => {
        console.log(filteredData);
        this.studentdata = filteredData;
        this.updateIsEmpty();
      });
    } else {
      this.loadStudentData();
    }
  }

}
