const cloudinary = require("cloudinary").v2;
const multer = require("multer");
cloudinary.config({
  cloud_name: "dzk7fwx89",
  api_key: "937552425357822",
  api_secret: "Z84yvKTzfmx8_K72uFemyO5dvAY",
});

const storage = new multer.memoryStorage();
async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result;
}
const upload = multer({ storage });
module.exports = { upload, imageUploadUtil };
