const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET! as string;
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME! as string;

const uploadToCloudinary = async (file: File): Promise<{ public_id: string; secure_url: string }> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", `bb_minh_duy/certificates`)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Upload to Cloudinary failed");
  }

  const data = await res.json();
  return { public_id: data.public_id, secure_url: data.secure_url };
};

function extractPublicIdFromUrl(url: string): string | null {
  try {
    const uploadPart = url.split("/upload/")[1]; // "v1234567890/folder/image.jpg"
    const parts = uploadPart.split("/");

    // Remove version if it starts with 'v' followed by digits
    if (parts[0].startsWith("v") && /^\d+$/.test(parts[0].slice(1))) {
      parts.shift(); // remove version part
    }

    const joinedPath = parts.join("/"); // "folder/image.jpg"
    const publicId = joinedPath.replace(/\.[^/.]+$/, ""); // remove file extension

    return publicId;
  } catch {
    return null;
  }
}


export { uploadToCloudinary, extractPublicIdFromUrl };
