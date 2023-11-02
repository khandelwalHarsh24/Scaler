    import { Component, OnInit } from '@angular/core';
    import { FormBuilder, FormGroup, Validators } from '@angular/forms';
    import { StudentService } from '../shared/student.service';
    import { ActivatedRoute, Router } from '@angular/router';


    @Component({
      selector: 'app-editstudent',
      templateUrl: './editstudent.component.html',
      styleUrls: ['./editstudent.component.css']
    })
    export class EditstudentComponent implements OnInit {


      studentForm!: FormGroup ;
      studentdata:any;
      constructor(private fb: FormBuilder,private studentService:StudentService,private route: ActivatedRoute,private router:Router) {}

      studentid:any;
      marks:any;

    

      ngOnInit(): void {
        this.studentForm = this.fb.group({
          ideation: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
          execution:[0, [Validators.required, Validators.pattern('^[0-9]*$')]],
          viva:[0, [Validators.required, Validators.pattern('^[0-9]*$')]]
        });
        this.loadSingledata();
      }

      onSubmit() {
        // if (this.studentForm.valid) {
          const data = {
            ideation: this.studentForm.value.ideation,
            execution: this.studentForm.value.execution,
            viva: this.studentForm.value.viva
          }
          console.log(data);
          console.log(this.studentdata.mentor_assigned);
          const studentEditData = {
            studentId: this.studentid,
            mentorId: this.studentdata.mentor_assigned,
            data: {
              ideation: data.ideation, 
              execution: data.execution,
              viva: data.viva    
            }
          };
          this.studentService.editData(studentEditData).subscribe();
          this.router.navigateByUrl('assign_student/654308d888308469f2635ba2');
        // }
      }

      loadSingledata(){
        this.route.params.subscribe((params) => {
          this.studentid = params['id']; 
          this.studentService.getSingleStudent(this.studentid).subscribe(data => {
            this.studentdata = data;
            // console.log(this.studentdata)
            this.studentForm.patchValue({
              ideation: this.studentdata.project_eval.ideation,
              execution: this.studentdata.project_eval.execution,
              viva: this.studentdata.project_eval.viva,
            });
          });
        });
      
      }
      

      

    }
