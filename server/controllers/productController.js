const Product = require("../models/index");
const { StatusCodes } = require("http-status-codes");

const createProduct = async (req, res) => {
  const { body } = req;
  const { name, price, image } = body;
  const product = await Product.create({ name, price, image });
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  res.send("list of all products");
};

module.exports = {
  createProduct,
  getAllProducts,
};
