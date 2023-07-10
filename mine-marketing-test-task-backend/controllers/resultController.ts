import { Request, Response } from 'express';
import Result from '../models/Result';

export const saveResult = async (req: Request, res: Response) => {
  try {
    const { userId, countryCode, phoneCode, capitalCity, currencyCode, name } = req.body;

    // Create a new result instance
    const newResult = new Result({
      userId,
      countryCode,
      phoneCode,
      capitalCity,
      currencyCode,
      name,
    });

    // Save the result to the database
    await newResult.save();

    res.status(201).json({ message: 'Result saved successfully' });
  } catch (error) {
    console.error('Error saving result:', error);
    res.status(500).json({ message: 'Failed to save result' });
  }
};

export const getResultsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Find all results associated with the specified user
    const results = await Result.find({ userId });

    res.status(200).json(results);
  } catch (error) {
    console.error('Error retrieving results:', error);
    res.status(500).json({ message: 'Failed to retrieve results' });
  }
};
