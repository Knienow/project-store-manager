const connection = require('../models/connection');
const { getValidId } = require('./validationProducts');
const { getAllProducts } = require('../services/products.service');

const getValidIdSales = async () => {
  const [validId] = await connection.execute(
    'SELECT id FROM sales',
  );

  const validIds = [];
  validId.forEach((element) => validIds.push(element.id));

  return validIds;
};

const validateSalesIds = async (req, res, next) => {
    const sales = req.body;
    const validId = await getValidId();
    const salesId = sales.map((sale) => sale.productId);
  
    const verifyUndefinedId = salesId.some((id) => id === undefined);
    if (verifyUndefinedId) {
      return res.status(400).json({ message: '"productId" is required' });
    }
  
    const verifyValidIds = salesId
      .map((id) => validId.includes(id))
      .some((bool) => bool === false);
    if (verifyValidIds) {
      return res.status(404).json({ message: 'Product not found' });
    }
  
    return next();
  };

  const validateAllProductId = async (req, res, next) => {
    const serviceAllProducts = await getAllProducts();
    const allProductsIds = serviceAllProducts.data.map((elem) => elem.id);
    const allQueries = req.body.map((elem) => elem.productId);
    const verifyId = allQueries.every((id) => allProductsIds.includes(id));
    const idIsUndefined = allQueries.some((bool) => bool === undefined); 
    if (idIsUndefined) {
      return res.status(400).json({ message: '"productId" is required' });
    }
    if (!verifyId) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return next();
  }; 
  
  const validateQuantity = (req, res, next) => {
    const sales = req.body;
    for (let i = 0; i < sales.length; i += 1) {
      if (sales[i].quantity <= 0) {
        console.log('sales', sales[i].quantity);
        return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
      }
      if (!sales[i].quantity) {
        return res.status(400).json({ message: '"quantity" is required' });
      }
    }
    return next();
  };

module.exports = {
  getValidIdSales,
  validateSalesIds, 
  validateAllProductId,
  validateQuantity,
};