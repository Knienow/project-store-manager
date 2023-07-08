const { salesModel } = require('../models');

const getAllSales = async () => {
  const sales = await salesModel.findAllSales();
  return { status: 'SUCCESSFUL', data: sales };
};

const getSaleByID = async (id) => {
    const salesId = await salesModel.findSaleById(id);
    if (salesId.length === 0) {
      return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
    }
    return { status: 'SUCCESSFUL', data: salesId };
};

// apenas iniciei - verificar como fazer as validações para quando for inserido mais de um produto numa venda
const postSale = async (productId, quantity) => {
  // Será validado que não é possível cadastrar uma venda sem o campo productId
  if (!productId) {
    return { status: 'BAD_REQUEST', data: { message: '"productId" is required' } };
  }
  // Será validado que não é possível cadastrar uma venda sem o campo quantity
  if (!quantity) {
    return { status: 'BAD_REQUEST', data: { message: '"quantity" is required' } };
  }
  // Será validado que não é possível cadastrar uma venda com o campo quantity menor ou igual a 0 (Zero)
  if (quantity.length <= 0) {
    return { status: 'INVALID_VALUE', 
    data: { message: ' "quantity" must be greater than or equal to 1' } };
  }
  // Será validado que não é possível cadastrar uma venda com o campo productId inexistente, em uma requisição com um único item
  // Será validado que não é possível cadastrar uma venda com o campo productId inexistente, em uma requisição com vários items
  if (productId.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  const sale = await salesModel.createSale(productId);
  return { status: 'CREATED', data: sale };
};

// apenas comecei
const deletSale = async (id) => {
    const sale = await salesModel.removeSale(id);
    return sale;
};

module.exports = {
  getAllSales,
  getSaleByID,
  postSale,
  deletSale,
};