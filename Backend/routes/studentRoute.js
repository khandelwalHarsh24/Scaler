const express=require('express');
const router=express.Router();

const {postStudent,getStudent,getSingleStudent,studentFilterByMarks}=require('../controller/studentController');
router.route('/api/v1/getStudents').get(getStudent);
router.route('/api/v1/studentcreated').post(postStudent);
router.route('/api/v1/student/:id').get(getSingleStudent);
module.exports=router;