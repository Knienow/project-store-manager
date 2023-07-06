const salesModel = require('../models/sales.model');

const getAllsales = async () => {
  const sales = await salesModel.findAllsales();
  return sales;
};

const getSaleByID = async () => {
    const salesId = await salesModel.findSaleById();
    return salesId;
};

// const deletSale = async () => {
//     const sale = await salesModel.removeSale();
//     return sale;
// };

module.exports = {
  getAllsales,
  getSaleByID,
//   deletSale,
};