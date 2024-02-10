const path = require("path");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const maxSize = 1024 * 1024;

const uploadProductImage = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError("No File Uploaded");
  }
  const {
    files: { image },
  } = req;
  const { name, data, size, encoding, tempFilePath, truncated, mimetype, md5 } =
    image;

  if (!mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please upload an imag");
  }

  if (size > maxSize) {
    throw new CustomError.BadRequestError(`Image must not be more than ${maxSize} mb`);
  }

  const imagePath = path.join(
    __dirname,
    "../../client/public/uploads/" + `${name}`
  );
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
