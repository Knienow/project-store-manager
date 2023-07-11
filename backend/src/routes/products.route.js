const route = require('express').Router();
const { productsController } = require('../controllers');

route.get('/', productsController.getProducts);
route.get('/:id', productsController.getProductId);
route.post('/', productsController.createProducts);
route.put('/:id', productsController.updateProduct);
// route.delete('/:id', async (req, res) => {
//     const { productId } = req.params;
//     await productsController.remove(productId);
//     res.status(204).end();
// });

module.exports = route;