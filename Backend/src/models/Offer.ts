import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  country: {
    type: String,
    default: ''
  },
  duration: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: 0
  },
  originalPrice: {
    type: Number,
    default: null
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  rating: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    default: null
  },
  video: {
    type: String,
    default: null
  },
  mediaType: {
    type: String,
    enum: ['image', 'video'],
    default: 'video'
  },
  includes: {
    type: [String],
    default: []
  },
  highlights: {
    type: [String],
    default: []
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    default: null
  },
  expiryDate: {
    type: Date,
    default: null
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

export default mongoose.model('Offer', offerSchema);
