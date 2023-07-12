const route = require('express').Router();
const { productsController } = require('../controllers');
const { validateProductsData } = require('../middlewares/validationProducts');

route.get('/', productsController.getProducts);
route.get('/:id', productsController.getProductId);
// route.post('/', getValidId, validateProductsData, productsController.createProducts);
// route.put('/:id', getValidId, validateProductsData, productsController.updateProduct);
route.post(
    '/', 
    validateProductsData,
    productsController.createProducts,
);
route.put(
    '/:id', 
    validateProductsData,
    productsController.updateProduct,
);
// route.delete('/:id', async (req, res) => {
//     const { productId } = req.params;
//     await productsController.remove(productId);
//     res.status(204).end();
// });

module.exports = route;