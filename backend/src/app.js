const express = require('express');
const { productsRouter } = require('./routes');

const app = express();
app.use(express.json());
app.use('/products', productsRouter);
// app.use('/sales', salesModel);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

// app.get('/products', async (_req, res) => {
//   const products = await productsModel.findAllProducts();
//   return res.status(200).json(products);
// });

// app.get('/sales', async (_req, res) => {
//   const sales = await salesModel.findAllSales();
//   return res.status(200).json(sales);
// });

// app.get('/products/:productId', async (req, res) => {
//   const { productId } = req.params;
//   const product = await productsModel.findProductById(productId);
//   if (!product) return res.status(404).json({ message: 'Product not found' });
//   return res.status(200).json(product);
// });

// app.get('/sales/:saleId', async (req, res) => {
//   const { saleId } = req.params;
//   const sale = await salesModel.findSaleById(saleId);
//   if (!sale) return res.status(404).json({ message: 'Sale not found' });
//   return res.status(200).json(sale);
// });

// app.delete('/products/:productId', async (req, res) => {
//   const { productId } = req.params;
//   await productsModel.remove(productId);
//   res.status(204).end();
// });

// app.delete('/sales/:saleId', async (req, res) => {
//   const { saleId } = req.params;
//   await salesModel.remove(saleId);
//   res.status(204).end();
// });

module.exports = app;