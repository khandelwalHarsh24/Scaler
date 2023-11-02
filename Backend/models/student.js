const mongoose = require('mongoose');
const Mentor = require('./mentor');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  project_name: {
    type: String,
    required: true
  },
  mentor_assigned: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor',
    default: null,
  },
  project_eval: {
    ideation: {
      type:Number,
      default: 0
    },
    execution: {
      type:Number,
      default: 0
    },
    viva: {
      type:Number,
      default: 0
    }
  }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
