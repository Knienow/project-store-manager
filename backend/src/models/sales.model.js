// const camelize = require('camelize');
const connection = require('./connection');

const findAllSales = async () => {
  const [sales] = await connection.execute(
    'SELECT * FROM sales',
    // 'SELECT * FROM StoreManager.sales'
  );
  return sales;
//   return camelize(sales); 
};

// função para buscar por ID
const findSaleById = async (saleId) => {
    const [[sale]] = await connection.execute(
      'SELECT * FROM sales WHERE id = ?',
      [saleId],
    );
    return sale;
    // return camelize(sale);
};

module.exports = {
    findAllSales,
    findSaleById,
};