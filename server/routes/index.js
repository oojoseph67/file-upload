const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
} = require("../controllers/productController");
const {
  uploadProductImage,
  uploadProductImageAndCreateProduct,
} = require("../controllers/uploadController");

router.route('/products/').get(getAllProducts)
router.route("/products/uploads").post(uploadProductImageAndCreateProduct);

module.exports = router