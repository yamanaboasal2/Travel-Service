import { Request, Response } from 'express';
import Comment from '../models/Comment';

export const getPublishedComments = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find({ status: 'approved' }).sort({ createdAt: -1 });

    return res.status(200).json({
      message: 'Comments retrieved successfully',
      count: comments.length,
      data: comments
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });

    return res.status(200).json({
      message: 'Comments retrieved successfully',
      count: comments.length,
      data: comments
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.create(req.body);

    return res.status(201).json({
      message: 'Comment created successfully',
      data: comment
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error during comment creation' });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    return res.status(200).json({
      message: 'Comment updated successfully',
      data: comment
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error during comment update' });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    return res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error during comment deletion' });
  }
};
