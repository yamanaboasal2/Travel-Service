import { Request, Response } from 'express';
import Contact from '../models/Contact';

export const getAllMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });

    return res.status(200).json({
      message: 'Messages retrieved successfully',
      count: messages.length,
      data: messages
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const getMessageById = async (req: Request, res: Response) => {
  try {
    const message = await Contact.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    // Mark as read
    if (message.status === 'new') {
      message.status = 'read';
      await message.save();
    }

    return res.status(200).json({
      message: 'Message retrieved successfully',
      data: message
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    const contact = new Contact({
      name,
      email,
      subject,
      message,
      status: 'new'
    });

    await contact.save();

    return res.status(201).json({
      message: 'Message sent successfully',
      data: contact
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error during message submission' });
  }
};

export const updateMessageStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    return res.status(200).json({
      message: 'Message status updated successfully',
      data: message
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error during status update' });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    return res.status(200).json({
      message: 'Message deleted successfully'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error during message deletion' });
  }
};
