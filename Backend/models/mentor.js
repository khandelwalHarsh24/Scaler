const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  children_assigned: [{
    child: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student', 
      default: null
    },
  }],
  lock: {
    type: Boolean,
    default: false,
  }
});

const Mentor = mongoose.model('Mentor', mentorSchema);
module.exports = Mentor;
