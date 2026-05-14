import bcrypt from 'bcryptjs';
import User from '../models/User';
import Service from '../models/Service';
import Offer from '../models/Offer';
import Destination from '../models/Destination';
import Settings from '../models/Settings';
import Comment from '../models/Comment';

const services = [
  {
    title: 'Flight Booking',
    description: 'Book your flight easily with top international and local airlines. We guarantee competitive prices, flexible options, and full support at every step.',
    price: 120,
    image: 'Flight Bookingjpg.jpg',
    duration: 'Flexible',
    features: ['International & Domestic Flights', 'Best Price Guarantee', 'Easy Cancellation & Rescheduling', '24/7 Customer Support'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Hotel Reservations',
    description: 'Enjoy luxury or budget stays at the best hotels worldwide. We help you choose the perfect hotel for your needs with exclusive offers and trusted reviews.',
    price: 150,
    image: 'Hotel Reservations.jpg',
    duration: 'Flexible',
    features: ['Wide Range of Accommodations', 'Verified Reviews & Ratings', 'Best Price Guarantee'],
    color: 'from-amber-500 to-orange-500'
  },
  {
    title: 'Tour Packages',
    description: 'Discover the world with all-inclusive tour packages covering flights, accommodation, tours, and activities.',
    price: 300,
    image: 'Tour Packages.jpg',
    duration: '3-10 Days',
    features: ['All-Inclusive Packages', 'Customizable Itineraries', 'Expert Local Guides'],
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Visa Services',
    description: 'Navigate visa requirements effortlessly with our expert consultation services.',
    price: 90,
    image: 'Visa Assistance.jpg',
    duration: '3-15 Days',
    features: ['Visa Consultations', 'Document Preparation', 'Application Tracking'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Travel Insurance',
    description: 'Protect your investment with comprehensive travel insurance covering emergencies, cancellations, and lost luggage.',
    price: 60,
    image: 'Travel Planning.jpg',
    duration: 'Trip Duration',
    features: ['Medical Coverage', 'Trip Cancellation', 'Lost Luggage Support'],
    color: 'from-red-500 to-rose-500'
  },
  {
    title: 'Group Travel',
    description: 'Experience unforgettable adventures with specialized group travel packages and exclusive group discounts.',
    price: 250,
    image: 'Group Travel.jpg',
    duration: 'Flexible',
    features: ['Special Group Rates', 'Private Tours', 'Organized Itineraries'],
    color: 'from-teal-500 to-cyan-500'
  }
];

const offers = [
  {
    title: 'Istanbul Package',
    country: 'Turkey',
    duration: '5 Days / 4 Nights',
    price: 750,
    originalPrice: 882,
    discount: 15,
    rating: 4.9,
    video: 'Istanbul Package.mp4',
    mediaType: 'video',
    description: 'Experience the magic of Istanbul where East meets West. Explore historic landmarks, enjoy a Bosphorus cruise, and immerse yourself in Turkish culture and cuisine.',
    includes: ['Flight tickets', 'Hotel stay', 'Guided tours', 'Airport transfer'],
    highlights: ['Hagia Sophia', 'Bosphorus cruise', 'Grand Bazaar']
  },
  {
    title: 'Aqaba Beach Trip',
    country: 'Jordan',
    duration: '4 Days / 3 Nights',
    price: 400,
    discount: 0,
    rating: 4.8,
    video: 'Aqaba Beach Trip.mp4',
    mediaType: 'video',
    description: 'Discover the breathtaking beauty of Aqaba with pristine Red Sea waters, diving spots, and optional desert adventures.',
    includes: ['Hotel stay', 'Transport', 'Beach activities'],
    highlights: ['Red Sea', 'Snorkeling', 'Wadi Rum option']
  },
  {
    title: 'Sharm El Sheikh Luxury Package',
    country: 'Egypt',
    duration: '5 Days / 4 Nights',
    price: 900,
    originalPrice: 1200,
    discount: 25,
    rating: 5,
    video: 'Sharm El Sheikh Luxury Package.mp4',
    mediaType: 'video',
    description: 'Indulge in ultimate luxury at a premier resort destination with beaches, diving, spa retreats, and entertainment.',
    includes: ['All-inclusive resort', 'Flights', 'Transfers', 'Activities'],
    highlights: ['Red Sea diving', 'Luxury resort', 'Spa facilities']
  },
  {
    title: 'Dubai Luxury Experience',
    country: 'UAE',
    duration: '6 Days / 5 Nights',
    price: 1200,
    originalPrice: 1333,
    discount: 10,
    rating: 4.9,
    video: 'Dubai Luxury Experience.mp4',
    mediaType: 'video',
    description: 'Experience modern luxury in Dubai, from skyscrapers and desert safaris to shopping and fine dining.',
    includes: ['Luxury hotel', 'Desert safari', 'City tour', 'Airport transfer'],
    highlights: ['Burj Khalifa', 'Desert safari', 'Dubai Marina']
  },
  {
    title: 'Cairo & Pyramids Explorer',
    country: 'Egypt',
    duration: '4 Days / 3 Nights',
    price: 650,
    discount: 0,
    rating: 4.7,
    video: 'Cairo & Pyramids Explorer.mp4',
    mediaType: 'video',
    description: 'Uncover ancient Egypt with the Great Pyramids, Sphinx, Egyptian Museum, and Nile experiences.',
    includes: ['Hotel stay', 'Guided tours', 'Museum tickets', 'Transport'],
    highlights: ['Pyramids', 'Sphinx', 'Egyptian Museum']
  },
  {
    title: 'Maldives Paradise Retreat',
    country: 'Maldives',
    duration: '7 Days / 6 Nights',
    price: 1500,
    originalPrice: 3333,
    discount: 55,
    rating: 5,
    video: 'Maldives Paradise Retreat.mp4',
    mediaType: 'video',
    description: 'Escape to paradise with overwater bungalows, white-sand beaches, turquoise waters, and marine adventures.',
    includes: ['Resort stay', 'Meals', 'Water activities', 'Transfers'],
    highlights: ['Overwater villa', 'Snorkeling', 'Beach escape']
  }
];

const destinations = [
  { name: 'Dubai', country: 'UAE', description: 'Luxury desert city with modern landmarks, shopping, and desert adventures.', image: 'dubi.jpg', price: 1200, rating: 4.9, duration: '6 Days / 5 Nights', highlights: ['Burj Khalifa', 'Desert Safari', 'Dubai Marina'] },
  { name: 'Cairo', country: 'Egypt', description: 'Ancient wonders, Nile culture, museums, and unforgettable historical experiences.', image: 'Cairo.jpg', price: 650, rating: 4.7, duration: '4 Days / 3 Nights', highlights: ['Pyramids', 'Sphinx', 'Egyptian Museum'] },
  { name: 'Amman', country: 'Jordan', description: 'A rich cultural city with warm hospitality, Roman landmarks, and local cuisine.', image: 'Amman.jpg', price: 450, rating: 4.6, duration: '3 Days / 2 Nights', highlights: ['Citadel', 'Roman Theater', 'Downtown Amman'] },
  { name: 'Istanbul', country: 'Turkey', description: 'Historic city where East meets West with markets, mosques, and Bosphorus views.', image: 'turkya.jpg', price: 750, rating: 4.9, duration: '5 Days / 4 Nights', highlights: ['Hagia Sophia', 'Bosphorus', 'Grand Bazaar'] },
  { name: 'Maldives', country: 'Maldives', description: 'Tropical paradise with crystal clear waters, beaches, and relaxing resorts.', image: 'maldevi.jpg', price: 1500, rating: 5, duration: '7 Days / 6 Nights', highlights: ['Overwater Villas', 'Snorkeling', 'White Beaches'] },
  { name: 'Paris', country: 'France', description: 'City of lights with art, romance, cuisine, and iconic landmarks.', image: 'france.jpg', price: 1300, rating: 4.8, duration: '5 Days / 4 Nights', highlights: ['Eiffel Tower', 'Louvre', 'Seine River'] }
];

const comments = [
  { name: 'Sarah Johnson', city: 'London', comment: 'Rainbow Travel planned every detail perfectly. The package was organized, clear, and easy to enjoy.', color: 'from-sky-400 to-cyan-500' },
  { name: 'Mike Chen', city: 'Dubai', comment: 'Great service and fast support. Booking flights and hotels through them saved us time and stress.', color: 'from-amber-400 to-orange-500' },
  { name: 'Emily Davis', city: 'Paris', comment: 'The team was professional, friendly, and helped us choose the best destination for our budget.', color: 'from-emerald-400 to-teal-500' }
];

export const seedDatabase = async () => {
  const adminEmail = 'yamanabuasal20@gmail.com';
  const adminPassword = '123';

  const admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    const password = await bcrypt.hash(adminPassword, await bcrypt.genSalt(10));
    await User.create({
      name: 'Yaman Admin',
      email: adminEmail,
      password,
      role: 'admin',
      status: 'active'
    });
  }

  if (await Service.countDocuments() === 0) {
    await Service.insertMany(services);
  }

  if (await Offer.countDocuments() === 0) {
    await Offer.insertMany(offers);
  }

  if (await Destination.countDocuments() === 0) {
    await Destination.insertMany(destinations);
  }

  if (await Comment.countDocuments() === 0) {
    await Comment.insertMany(comments);
  }

  await Settings.findOneAndUpdate(
    { key: 'company' },
    {
      key: 'company',
      companyName: 'Rainbow Travel & Tourism',
      website: 'rainbowtravel.ps',
      description: 'Your trusted travel agency in Nablus, offering complete travel solutions, organized trips, competitive prices, and continuous offers.',
      email: 'info@rainbowtravel.ps',
      phone: '0597441666',
      location: 'Nablus City Center, Second Floor, Nablus, Palestine',
      socialLinks: {
        facebook: 'https://www.facebook.com/RainbowPalestina/',
        instagram: 'https://www.instagram.com/rainbowtours93?igsh=aDVqZjEzazN3dzQ5',
        tiktok: 'https://www.tiktok.com/@rainbowtourspal'
      },
      rating: 'Average rating 4.9/5 from 597 reviews',
      updatedAt: new Date()
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
};
