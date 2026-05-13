import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: 0
  },
  image: {
    type: String,
    default: null
  },
  duration: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Service', serviceSchema);
