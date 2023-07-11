const connection = require('../../models/connection');
const { getValidId } = require('./validationProducts');

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
  
  const validateSalesQuantity = (req, res, next) => {
    const sales = req.body;
    const salesQuantities = sales.map((sale) => sale.quantity);
  
    const verifyUndefined = salesQuantities.some((quant) => quant === undefined);
    if (verifyUndefined) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
  
    const validQuantity = salesQuantities.some((qtt) => qtt < 1);
    if (validQuantity) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
  
    return next();
  };

module.exports = {
  getValidIdSales,
  validateSalesIds, 
  validateSalesQuantity,
};