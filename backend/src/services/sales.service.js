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

// const deletSale = async () => {
//     const sale = await salesModel.removeSale();
//     return sale;
// };

module.exports = {
  getAllSales,
  getSaleByID,
//   deletSale,
};