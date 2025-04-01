const Product = require("../../models/product");

const getFilteredProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      message: "filtered",
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error occured in filter",
    });
  }
};
const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product)
      return res.status(404).json({
        success: false,
        message: "some error occured in filter",
      });
    res.status(200).json({
      success: true,
      message: "filtered",
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error occured in filter",
    });
  }
};

module.exports = { getFilteredProducts, getProductDetails };
