import { Request, Response } from 'express';
import Settings from '../models/Settings';

const getCompanySettings = async () => {
  return Settings.findOneAndUpdate(
    { key: 'company' },
    { $setOnInsert: { key: 'company' } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
};

export const getSettings = async (req: Request, res: Response) => {
  try {
    const settings = await getCompanySettings();
    return res.status(200).json({
      message: 'Settings retrieved successfully',
      data: settings
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      { key: 'company' },
      { ...req.body, key: 'company', updatedAt: new Date() },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json({
      message: 'Settings updated successfully',
      data: settings
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error during settings update' });
  }
};
