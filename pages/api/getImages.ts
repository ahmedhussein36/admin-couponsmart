import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, NEXT_PUBLIC_CLOUDINARY_API_KEY, NEXT_PUBLIC_CLOUDINARY_API_SECRET } = process.env;
  const { nextCursor } = req.query;

  if (!NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !NEXT_PUBLIC_CLOUDINARY_API_KEY || !NEXT_PUBLIC_CLOUDINARY_API_SECRET) {
    return res.status(500).json({ error: 'Missing Cloudinary configuration' });
  }

  try {
    const response = await axios.get(
      `https://api.cloudinary.com/v1_1/${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/resources/image`,
      {
        params: {
          max_results: 50,
          next_cursor: nextCursor || undefined,
        },
        auth: {
          username: NEXT_PUBLIC_CLOUDINARY_API_KEY,
          password: NEXT_PUBLIC_CLOUDINARY_API_SECRET,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch images from Cloudinary' });
  }
}
