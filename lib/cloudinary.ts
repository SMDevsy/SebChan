import cloudinaryLib from "cloudinary";
const cloudinary = cloudinaryLib.v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

export async function uploadToCloudinary(image: File, mediaId: string) {
  const buffer = await image.arrayBuffer();
  const mime = image.type;
  const encoding = "base64";
  const base64Data = Buffer.from(buffer).toString("base64");
  const fileUri = "data:" + mime + ";" + encoding + "," + base64Data;

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(fileUri, {
        invalidate: true,
        public_id: mediaId,
      })
      .then((result) => {
        console.log(result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

export default cloudinary;
