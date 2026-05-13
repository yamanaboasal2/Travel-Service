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
  discount: {
    type: Number,
    required: [true, 'Please provide a discount percentage'],
    min: 0,
    max: 100
  },
  image: {
    type: String,
    default: null
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    default: null
  },
  expiryDate: {
    type: Date,
    required: [true, 'Please provide an expiry date']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Offer', offerSchema);
