const studentSchema = require("../models/student");


const getStudent = async (req, res) => {
    const student = await studentSchema.find()
    if (!student) {
        res.status(500).json({ success: false });
    }
    res.status(200).json(student);
};

const getSingleStudent = async (req, res) => {
  const student = await studentSchema.findById(req.params.id)
  if (!student) {
      res.status(500).json({ success: false });
  }
  res.status(200).json(student);
};    

const postStudent = async (req, res) => {
    let newUser = new studentSchema({
      name: req.body.name,
      project_name: req.body.project_name,
    });
    newUser = await newUser.save();
  
    if (!newUser) return res.status(404).send("The user cannot be created");
    res.status(200).json(newUser);
};




  module.exports={postStudent,getStudent,getSingleStudent}