const cloud_name = "doprq0tiz";
const upload_preset = "shuttersync_app";

export const uploadToCloudinary = async (pics, fileType) => {
  if (pics && fileType) {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", upload_preset);
    data.append("cloud_name", cloud_name);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`,
      { method: "POST", body: data }
    );

    const fileData = await res.json();
    console.log("res",fileData.url);
    return fileData.url;
  } else {
    console.log("Please select a file to upload");
  }
};
