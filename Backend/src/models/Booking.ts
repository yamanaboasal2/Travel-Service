import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    default: null
  },
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offer',
    default: null
  },
  customer: {
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    nationality: { type: String, default: '' },
    passportType: { type: String, default: '' }
  },
  selectedServices: {
    type: [String],
    default: []
  },
  destination: {
    type: String,
    default: ''
  },
  tripType: {
    type: String,
    default: ''
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
  paymentMethod: {
    type: String,
    default: 'cash'
  },
  notes: {
    type: String,
    default: ''
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
