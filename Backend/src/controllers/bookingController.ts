import { Request, Response } from 'express';
import Booking from '../models/Booking';
import Service from '../models/Service';
import Offer from '../models/Offer';

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name email')
      .populate('serviceId', 'title price')
      .populate('packageId', 'title price country duration');
    
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
    const {
      serviceId,
      packageId,
      bookingDate,
      travelers,
      specialRequests,
      customer,
      selectedServices = [],
      destination,
      tripType,
      paymentMethod,
      totalPrice
    } = req.body;
    const userId = (req as any).userId;

    let calculatedTotal = Number(totalPrice) || 0;

    if (serviceId) {
      const service = await Service.findById(serviceId);
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }
      calculatedTotal = service.price * travelers;
    }

    if (packageId) {
      const travelPackage = await Offer.findById(packageId);
      if (!travelPackage) {
        return res.status(404).json({ error: 'Package not found' });
      }
      calculatedTotal = travelPackage.price * travelers;
    }

    const booking = new Booking({
      userId,
      serviceId: serviceId || null,
      packageId: packageId || null,
      bookingDate,
      travelers,
      specialRequests,
      customer,
      selectedServices,
      destination,
      tripType,
      paymentMethod,
      totalPrice: calculatedTotal,
      status: 'pending'
    });

    await booking.save();

    // Populate after save
    await booking.populate('serviceId', 'title price');
    await booking.populate('packageId', 'title price country duration');

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
    const { status, bookingDate, travelers, specialRequests, customer, paymentMethod, notes } = req.body;

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
    if (customer) booking.customer = { ...booking.customer, ...customer };
    if (paymentMethod) booking.paymentMethod = paymentMethod;
    if (notes) booking.notes = notes;
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

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    return res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error during booking deletion' });
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
