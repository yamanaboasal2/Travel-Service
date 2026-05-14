import { Request, Response } from 'express';
import Destination from '../models/Destination';

export const getAllDestinations = async (req: Request, res: Response) => {
  try {
    const includeInactive = req.query.includeInactive === 'true';
    const filter = includeInactive ? {} : { isActive: true };
    const destinations = await Destination.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      message: 'Destinations retrieved successfully',
      count: destinations.length,
      data: destinations
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const getDestinationById = async (req: Request, res: Response) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    return res.status(200).json({
      message: 'Destination retrieved successfully',
      data: destination
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const createDestination = async (req: Request, res: Response) => {
  try {
    const destination = await Destination.create(req.body);
    return res.status(201).json({
      message: 'Destination created successfully',
      data: destination
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error during destination creation' });
  }
};

export const updateDestination = async (req: Request, res: Response) => {
  try {
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    return res.status(200).json({
      message: 'Destination updated successfully',
      data: destination
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error during destination update' });
  }
};

export const deleteDestination = async (req: Request, res: Response) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    return res.status(200).json({ message: 'Destination deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error during destination deletion' });
  }
};
