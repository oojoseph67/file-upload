const Product = require("../models/index");
const { StatusCodes } = require("http-status-codes");

const createProduct = async (req, res) => {
  const { body } = req;
  const { name, price, image } = body;
  const product = await Product.create({ name, price, image });
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products, count: products.length });
};

module.exports = {
  createProduct,
  getAllProducts,
};
