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

const postSale = async (saleObject) => {
  const newSaleId = await salesModel.createSale(saleObject);
  return { status: 'SUCCESSFUL', data: newSaleId };
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