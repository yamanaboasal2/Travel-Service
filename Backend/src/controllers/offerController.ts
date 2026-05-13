import { Request, Response } from 'express';
import Offer from '../models/Offer';

export const getAllOffers = async (req: Request, res: Response) => {
  try {
    const offers = await Offer.find().populate('serviceId');
    return res.status(200).json({
      message: 'Offers retrieved successfully',
      count: offers.length,
      data: offers
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const getOfferById = async (req: Request, res: Response) => {
  try {
    const offer = await Offer.findById(req.params.id).populate('serviceId');

    if (!offer) {
      return res.status(404).json({ error: 'Offer not found' });
    }

    return res.status(200).json({
      message: 'Offer retrieved successfully',
      data: offer
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const createOffer = async (req: Request, res: Response) => {
  try {
    const { title, description, discount, image, serviceId, expiryDate } = req.body;

    const offer = new Offer({
      title,
      description,
      discount,
      image,
      serviceId,
      expiryDate
    });

    await offer.save();

    return res.status(201).json({
      message: 'Offer created successfully',
      data: offer
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error during offer creation' });
  }
};

export const updateOffer = async (req: Request, res: Response) => {
  try {
    const { title, description, discount, image, serviceId, expiryDate } = req.body;

    let offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({ error: 'Offer not found' });
    }

    if (title) offer.title = title;
    if (description) offer.description = description;
    if (discount) offer.discount = discount;
    if (image) offer.image = image;
    if (serviceId) offer.serviceId = serviceId;
    if (expiryDate) offer.expiryDate = expiryDate;

    await offer.save();

    return res.status(200).json({
      message: 'Offer updated successfully',
      data: offer
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error during offer update' });
  }
};

export const deleteOffer = async (req: Request, res: Response) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);

    if (!offer) {
      return res.status(404).json({ error: 'Offer not found' });
    }

    return res.status(200).json({
      message: 'Offer deleted successfully'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error during offer deletion' });
  }
};
