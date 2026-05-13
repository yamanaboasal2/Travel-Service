import { Request, Response } from 'express';
import Booking from '../models/Booking';
import Service from '../models/Service';

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name email')
      .populate('serviceId', 'title price');
    
    return res.status(200).json({
      message: 'Bookings retrieved successfully',
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const getUserBookings = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const bookings = await Booking.find({ userId })
      .populate('serviceId', 'title price description image duration');

    return res.status(200).json({
      message: 'User bookings retrieved successfully',
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('serviceId', 'title price description');

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    return res.status(200).json({
      message: 'Booking retrieved successfully',
      data: booking
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { serviceId, bookingDate, travelers, specialRequests } = req.body;
    const userId = (req as any).userId;

    // Get service to calculate price
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    const totalPrice = service.price * travelers;

    const booking = new Booking({
      userId,
      serviceId,
      bookingDate,
      travelers,
      specialRequests,
      totalPrice,
      status: 'pending'
    });

    await booking.save();

    // Populate after save
    await booking.populate('serviceId', 'title price');

    return res.status(201).json({
      message: 'Booking created successfully',
      data: booking
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error during booking creation' });
  }
};

export const updateBooking = async (req: Request, res: Response) => {
  try {
    const { status, bookingDate, travelers, specialRequests } = req.body;

    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Recalculate price if travelers changed
    if (travelers && travelers !== booking.travelers) {
      const service = await Service.findById(booking.serviceId);
      if (service) {
        booking.totalPrice = service.price * travelers;
        booking.travelers = travelers;
      }
    }

    if (status) booking.status = status;
    if (bookingDate) booking.bookingDate = bookingDate;
    if (specialRequests) booking.specialRequests = specialRequests;
    booking.updatedAt = new Date();

    await booking.save();

    return res.status(200).json({
      message: 'Booking updated successfully',
      data: booking
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error during booking update' });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled', updatedAt: new Date() },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    return res.status(200).json({
      message: 'Booking cancelled successfully',
      data: booking
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error during booking cancellation' });
  }
};
