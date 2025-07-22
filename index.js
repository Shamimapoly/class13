const express = require("express");
const app = express();
const multer = require("multer");
const fs = require("fs");
const upload = multer({ dest: "uploads/" });
const port = 8000;
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
app.use(express.json());
app.use(cors());


cloudinary.config({
  cloud_name: "dz6mb5kkp",
  api_key: "575795312266681",
  api_secret: "hJ3UDGIs4GhB8S6F4iBJ-AYTuKs",
});

app.post("/sendimage", upload.single("avatar"), async (req, res) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      public_id: `image_${Date.now()}`, // unique name to avoid overwrite
    });
  console.log(uploadResult);
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({ error: "Image upload failed." });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
