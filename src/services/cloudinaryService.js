import axios from 'axios';
const uploadFileOnCloudinary = async (fileData) => {
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      fileData
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

export { uploadFileOnCloudinary };
