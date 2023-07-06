const { productsService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusRest');

const getProducts = async (req, res) => {
//   const product = await products.getAllProducts();
  const { status, data } = await productsService.getAllProducts();
  return res.status(mapStatusHTTP(status)).json(data);
};

const getProductId = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await productsService.getProductByID(id);
    return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getProducts,
  getProductId,
};