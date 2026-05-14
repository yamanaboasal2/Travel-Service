import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'Please provide a city'],
    trim: true
  },
  phone: {
    type: String,
    default: '',
    trim: true
  },
  comment: {
    type: String,
    required: [true, 'Please provide a comment'],
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'hidden'],
    default: 'approved'
  },
  color: {
    type: String,
    default: 'from-sky-400 to-cyan-500'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Comment', commentSchema);
