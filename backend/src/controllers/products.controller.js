const { productsService } = require('../services');

const getProducts = async (req, res) => {
  const { data } = await productsService.getAllProducts();
  return res.status(200).json(data);
};

const getProductId = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.getProductByID(id);
  return res.status(status === 'NOT_FOUND' ? 404 : 200).json(data);
};

const createProducts = async (req, res) => {
  const { name } = req.body;
  const { data } = await productsService.postProduct(name);
  return res.status(201).json(data);
};

const updateProduct = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const product = { id, name };
  await productsService.updateProd(product);
  return res.status(200).json(product);
};

const deleteProducts = async (req, res) => {
  const product = await productsService.getAllProducts();
  return res.status(200).json(product);
};

module.exports = {
  getProducts,
  getProductId,
  createProducts,
  updateProduct,
  deleteProducts,
};