const cloud_name = "doprq0tiz";
const upload_preset = "shuttersync_app";

export const uploadToCloudinary = async (file, fileType) => {
  if (!file) {
    console.error("No file provided.");
    return null;
  }

  // Infer type if not provided
  const resourceType = fileType || (file.type.startsWith("video") ? "video" : "image");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", upload_preset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud_name}/${resourceType}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  if (data.error) {
    console.error("Cloudinary Upload Error:", data.error.message);
    return null;
  }

  console.log("Cloudinary Upload Success:", data.secure_url);
  return data.secure_url;
};
