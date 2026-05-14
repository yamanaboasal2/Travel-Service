import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a destination name'],
    trim: true
  },
  country: {
    type: String,
    required: [true, 'Please provide a country'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  image: {
    type: String,
    default: null
  },
  price: {
    type: Number,
    default: 0,
    min: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  duration: {
    type: String,
    default: ''
  },
  highlights: {
    type: [String],
    default: []
  },
  isActive: {
    type: Boolean,
    default: true
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

export default mongoose.model('Destination', destinationSchema);
