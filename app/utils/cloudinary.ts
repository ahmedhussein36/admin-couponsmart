import axios from 'axios';

export const fetchImages = async (cursor: string | null = null) => {
  const response = await axios.get('/api/getImages', {
    params: { nextCursor: cursor },
  });
  return response.data;
};

export const deleteImage = async (public_id: string) => {
  const response = await axios.delete('/api/deleteImage', {
    data: { public_id },
  });
  return response.data;
};
