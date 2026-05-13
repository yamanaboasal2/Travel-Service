import { Request, Response } from 'express';
import Service from '../models/Service';

export const getAllServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.find();
    return res.status(200).json({
      message: 'Services retrieved successfully',
      count: services.length,
      data: services
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const getServiceById = async (req: Request, res: Response) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    return res.status(200).json({
      message: 'Service retrieved successfully',
      data: service
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const createService = async (req: Request, res: Response) => {
  try {
    const { title, description, price, image, duration } = req.body;

    const service = new Service({
      title,
      description,
      price,
      image,
      duration
    });

    await service.save();

    return res.status(201).json({
      message: 'Service created successfully',
      data: service
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error during service creation' });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const { title, description, price, image, duration } = req.body;

    let service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    if (title) service.title = title;
    if (description) service.description = description;
    if (price) service.price = price;
    if (image) service.image = image;
    if (duration) service.duration = duration;

    await service.save();

    return res.status(200).json({
      message: 'Service updated successfully',
      data: service
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error during service update' });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    return res.status(200).json({
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error during service deletion' });
  }
};
