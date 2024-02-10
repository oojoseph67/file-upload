const path = require("path");
const { StatusCodes } = require("http-status-codes");

const uploadProductImage = async (req, res) => {
  console.log(req.files);
  const {
    files: { image },
  } = req;
  const { name, data, size, encoding, tempFilePath, truncated, mimetype, md5 } =
    image;

  const imagePath = path.join(__dirname, "../../client/uploads/" + `${name}`);
  await image.mv(imagePath);

  res.status(StatusCodes.OK).json({
    msg: "upload product image",
    fileName: name,
    path: imagePath,
    path2: { src: `/uploads/${name}` },
  });
};

module.exports = {
  uploadProductImage,
};
