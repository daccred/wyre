import { createStandaloneToast } from '@chakra-ui/toast';
import * as cloudinary from 'cloudinary';
import React from 'react';
import { env } from '@wyrecc/env';

interface FileUploadProps {
  filepath: string;
  title: string;
  folder: string;
}
/**
 * * Current verison of TRPC support only JSON as api parameters, hence this hook is used to handle file upload to the cloud
 * @returns uploadImage for calling the file upload method
 */

export const useFileUpload = () => {
  cloudinary.v2.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
  });

  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<unknown>();
  const { toast } = createStandaloneToast();

  /**
   *
   * @param filepath References the file path
   * @param folder  Folder in cloudinary to store the file
   * @param title  Name accessor for the file
   * @see https://cloudinary.com/documentation/react_image_and_video_upload
   */
  const uploadImage = async ({ filepath, folder, title }: FileUploadProps) => {
    try {
      setLoading(true);
      const upload = await cloudinary.v2.uploader.upload(filepath, {
        public_id: title,
        folder,
      });
      setLoading(false);
      setImageUrl(upload.secure_url);
      toast({
        title: 'File uploaded successfully.',
        //   description: "",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      setLoading(false);
      toast({
        title: 'An error occurred.',
        description: 'Unable to create user account.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      setError(error as string);
      throw new Error('File upload failed');
    }
  };
  return { uploadImage, imageUrl, loading, error };
};
