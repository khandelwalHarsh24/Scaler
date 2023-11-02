const express=require('express');
const router=express.Router();

const {postMentor,insertStudent,deleteStudent,editStudentMarks, finalSubmit,getMentor,studentFilterByMarks,studentFilterByMarksNotAssign}=require('../controller/mentorController');

router.route('/api/v1/mentorcreated').post(postMentor);
router.route('/api/v1/student/insert').post(insertStudent);
router.route('/api/v1/studentid/delete').post(deleteStudent);
router.route('/api/v1/studentmarks/edit').post(editStudentMarks);
router.route('/api/v1/student/finalSubmit').post(finalSubmit);
router.route('/api/v1/getMentor/:id').get(getMentor);
router.route('/api/v1/students/filter/assignmarks/:id').get(studentFilterByMarks)
router.route('/api/v1/students/filter/notassignmarks/:id').get(studentFilterByMarksNotAssign)
module.exports=router;