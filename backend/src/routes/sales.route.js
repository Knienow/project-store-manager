const route = require('express').Router();
const { salesController } = require('../controllers');
const { validateAllProductId, validateSalesQuantity } = require(
    '../services/validations/validationSales',
); 

route.get('/', salesController.getSales);
route.get('/:id', salesController.getSaleId);
route.post('/', validateAllProductId, validateSalesQuantity, salesController.createSale);

module.exports = route;