const { productsModel } = require('../models');

const getAllProducts = async () => {
  const products = await productsModel.findAllProducts();
  return { status: 'SUCCESSFUL', data: products };
};

const getProductByID = async (id) => {
    const productsId = await productsModel.findProductById(id);
    if (!productsId) {
      return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
    }
    return { status: 'SUCCESSFUL', data: productsId };
};

// const deletProduct = async () => {
//     const product = await productsModel.removeProduct();
//     return product;
// };

module.exports = {
  getAllProducts,
  getProductByID,
//   deletProduct,
};
