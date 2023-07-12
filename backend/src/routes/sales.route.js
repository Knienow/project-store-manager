const route = require('express').Router();
const { salesController } = require('../controllers');
const {
    validateAllProductId, 
    validateQuantity,
} = require('../middlewares/validateSales');

route.get('/', salesController.getSales);
route.get('/:id', salesController.getSaleId);
// route.post('/', validateAllProductId, validateSalesQuantity, salesController.createSale);
route.post(
    '/', 
    validateAllProductId, 
    validateQuantity,
    salesController.createSale,
);

module.exports = route;