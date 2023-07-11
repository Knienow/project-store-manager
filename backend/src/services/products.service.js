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

const postProduct = async (name) => {
  if (!name) {
    return { status: 'BAD_REQUEST', data: { message: '"name" is required' } };
  }
  if (name.length < 5) {
    return { status: 'INVALID_VALUE', 
    data: { message: '"name" length must be at least 5 characters long' } };
  }
  const product = await productsModel.createProduct(name);
  return { status: 'CREATED', data: product };
};

const updateProd = async (id, name) => {
  const updatedProducts = await productsModel.findProductById(id);
  if (!updatedProducts) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  if (!name) {
    return { status: 'BAD_REQUEST', data: { message: '"name" is required' } };
  }
  if (name.length < 5) {
    return { status: 'INVALID_VALUE', 
    data: { message: '"name" length must be at least 5 characters long' } };
  }
  const product = await productsModel.upProduct(id, name);
  return { status: 'SUCCESSFUL', data: product };
};

// apenas comecei
// const deletProduct = async () => {
//     const product = await productsModel.removeProduct();
//     return product;
// };

module.exports = {
  getAllProducts,
  getProductByID,
  postProduct,
  updateProd,
//   deletProduct,
};
