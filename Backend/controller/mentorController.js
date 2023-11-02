const mentorSchema = require("../models/mentor");
const studentSchema=require('../models/student')
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const postMentor = async (req, res) => {
    let newUser = new mentorSchema({
      name: req.body.name,
    //   children_assigned: req.body.children_assigned,
    });
    newUser = await newUser.save();
  
    if (!newUser) return res.status(404).send("The Mentor cannot be created");
    res.status(200).json(newUser);
};

const getMentor=async(req,res)=>{
  console.log(req.params.id);
  const mentor = await mentorSchema.findById(req.params.id)
  console.log(mentor);
  if (!mentor) {
      res.status(500).json({ success: false });
  }
  res.status(200).json(mentor);
}

const insertStudent=async(req,res)=>{
  const {studentId,mentorId}=req.body;
  let mentor = await mentorSchema.findById(mentorId);
  let student = await studentSchema.findById(studentId);
  if(mentorId==null){
    return res.status(400).json({"message": "Mentor is not avalaible"})
  }
  const studentObjectId = new mongoose.Types.ObjectId(studentId);
  const mentorObjectId = new mongoose.Types.ObjectId(mentorId);
  // console.log(mentor);
  // console.log(mentor.children_assigned.length);
  mentor.children_assigned.push({child:studentObjectId});
  student.mentor_assigned=mentorObjectId;
  if(mentor.children_assigned.length>4){
    return res.status(404).json({"message":"Request is Invalid"});
  }
  await mentor.save();
  await student.save();
  res.status(200).json({"message":`${student.name}: assigned to ${mentor.name}`})
}

const deleteStudent=async(req,res)=>{
  const {studentId,mentorId}=req.body;
  let mentor = await mentorSchema.findById(mentorId);
  let student = await studentSchema.findById(studentId);
  if (!mentor || !student) {
    return res.status(404).json({"message":"Mentor or Student not found"});
  }
  const studentObjectId = new mongoose.Types.ObjectId(studentId);
  const mentorObjectId = new mongoose.Types.ObjectId(mentorId);
  mentor.children_assigned = mentor.children_assigned.filter(
    (child) => !child.child.equals(studentObjectId)
  )
  student.mentor_assigned = null;
  student.project_eval.ideation=0;
  student.project_eval.evaluation=0;
  student.project_eval.viva=0;
  await mentor.save();
  await student.save();
  res.status(200).json({"message":`${student.name} removed from ${mentor.name}`});
}


const editStudentMarks=async(req,res)=>{
  const {data,studentId,mentorId}=req.body;
  const mentorObjectId = new mongoose.Types.ObjectId(mentorId);
  let student = await studentSchema.findById(studentId);
  let mentor = await mentorSchema.findById(mentorId);
  // console.log(student);
  // console.log(mentor);

  // if (!student || student.mentor_assigned!==mentorObjectId || mentor.lock===true) {
  //   return res.status(404).send("Mentor or Student not found");
  // }
  student.project_eval.ideation=data.ideation;
  student.project_eval.execution=data.execution;
  student.project_eval.viva=data.viva;
  await student.save();
  res.status(200).json({"message":'Marks Assigned'});
}


const finalSubmit=async(req,res)=>{
  const {mentorId}=req.body;
  // console.log(mentorId)
  const mentorObjectId = new mongoose.Types.ObjectId(mentorId);
  let mentor = await mentorSchema.findById(mentorId);
  // console.log(mentor);
  if (!mentor) {
    return res.status(404).send("Mentor not found");
  }
  const students = await studentSchema.find({ mentor_assigned: mentorObjectId });
  // console.log(students);
  if(students.length<3 && students.length>4){
    return res.status(404).send("Mentor does not meet the student capacity requirements");
  }
  for(let i=0;i<students.length;i++){
    if(students[i].project_eval.execution===0 || students[i].project_eval.ideation===0 
      || students[i].project_eval.viva===0){
        return res.status(404).send("Invalid Submit");
      }
  }
  mentor.lock=true;
  await mentor.save();
  res.status(200).json({"message": "Marks Printed","lock": mentor.lock});
}

const studentFilterByMarks = async (req, res) => {
  const mentor = await mentorSchema.findById(req.params.id);
  let studentMarks = [];

  if (!mentor) {
    return res.status(404).json({ message: "Not Found" });
  }

  for (let i=0;i<mentor.children_assigned.length;i++) {
    let studentId = new ObjectId(mentor.children_assigned[i].child);
    // console.log(studentId);
    let student = await studentSchema.findById(studentId);
    // console.log(student);
    if (student.project_eval.execution!==0 && student.project_eval.evaluation!==0 && student.project_eval.viva!==0) {
      studentMarks.push(student);
    } 
  }

  return res.status(200).json(studentMarks);
};

const studentFilterByMarksNotAssign = async (req, res) => {
  const mentor = await mentorSchema.findById(req.params.id);
  let studentMarks = [];

  if (!mentor) {
    return res.status(404).json({ message: "Not Found" });
  }

  for (let i=0;i<mentor.children_assigned.length;i++) {
    let studentId = new ObjectId(mentor.children_assigned[i].child);
    // console.log(studentId);
    let student = await studentSchema.findById(studentId);
    // console.log(student);
    if (student.project_eval.execution===0 || student.project_eval.evaluation===0 || student.project_eval.viva===0) {
      studentMarks.push(student);
    } 
  }

  return res.status(200).json(studentMarks);
};

module.exports={postMentor,insertStudent,deleteStudent,editStudentMarks,finalSubmit,getMentor,studentFilterByMarks,studentFilterByMarksNotAssign}


