const Product = require("../models");
const path = require("path");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const maxSize = 1024 * 1024;

const uploadProductImageLocal = async (req, res) => {
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
    throw new CustomError.BadRequestError(
      `Image must not be more than ${maxSize} mb`
    );
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

const uploadProductImage = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError("No File Uploaded");
  }
  const {
    files: { image },
  } = req;
  const { name, data, size, encoding, tempFilePath, truncated, mimetype, md5 } =
    image;
  const result = await cloudinary.uploader.upload(tempFilePath, {
    use_filename: true,
    folder: "FILE UPLOAD API",
  });
  const { secure_url, url, folder, format, height, weight, signature } = result;

  fs.unlinkSync(tempFilePath);
  res.status(StatusCodes.OK).json({
    msg: "upload product image",
    signature,
    path2: { src: secure_url },
  });
};

const uploadProductImageAndCreateProduct = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError("No File Uploaded");
  }

  const { body, files, query } = req;
  const { name, price } = query;
  const { image } = files;

  const {
    name: fileName,
    data,
    size,
    encoding,
    tempFilePath,
    truncated,
    mimetype,
    md5,
  } = image;

  if (!mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please upload an imag");
  }

  if (size > maxSize) {
    throw new CustomError.BadRequestError(
      `Image must not be more than ${maxSize} mb`
    );
  }

  // Upload image to cloudinary
  const result = await cloudinary.uploader.upload(image.tempFilePath, {
    use_filename: true,
    folder: "FILE UPLOAD API",
  });

  // Extract necessary fields from cloudinary response
  const { secure_url } = result;

  // Delete temporary file after upload
  fs.unlinkSync(image.tempFilePath);

  // Create product in the database
  const product = await Product.create({ name, price, image: secure_url });

  // Send response
  res.status(StatusCodes.CREATED).json({ product });
};

module.exports = {
  uploadProductImage,
  uploadProductImageAndCreateProduct,
};
