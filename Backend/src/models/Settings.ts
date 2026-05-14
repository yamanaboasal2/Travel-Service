import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    default: 'company'
  },
  companyName: {
    type: String,
    default: 'Rainbow Travel & Tourism'
  },
  website: {
    type: String,
    default: 'rainbowtravel.ps'
  },
  description: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: 'info@rainbowtravel.ps'
  },
  phone: {
    type: String,
    default: '0597441666'
  },
  location: {
    type: String,
    default: 'Nablus City Center, Second Floor, Nablus, Palestine'
  },
  socialLinks: {
    facebook: { type: String, default: 'https://www.facebook.com/RainbowPalestina/' },
    instagram: { type: String, default: 'https://www.instagram.com/rainbowtours93?igsh=aDVqZjEzazN3dzQ5' },
    tiktok: { type: String, default: 'https://www.tiktok.com/@rainbowtourspal' }
  },
  rating: {
    type: String,
    default: 'Average rating 4.9/5 from 597 reviews'
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Settings', settingsSchema);
