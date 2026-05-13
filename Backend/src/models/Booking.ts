import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a user ID']
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: [true, 'Please provide a service ID']
  },
  bookingDate: {
    type: Date,
    required: [true, 'Please provide a booking date']
  },
  travelers: {
    type: Number,
    required: [true, 'Please provide number of travelers'],
    min: 1
  },
  specialRequests: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  totalPrice: {
    type: Number,
    required: [true, 'Please provide total price'],
    min: 0
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

export default mongoose.model('Booking', bookingSchema);
