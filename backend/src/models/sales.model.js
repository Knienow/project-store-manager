// const camelize = require('camelize');
const connection = require('./connection');

const findAllSales = async () => {
  const [sales] = await connection.execute(
    'SELECT sales.id AS saleId, sales.date, '
    + 'sales_products.product_id AS productId, sales_products.quantity '
    + 'FROM sales INNER JOIN sales_products ' 
    + 'ON sales.id = sales_products.sale_id '
    + 'ORDER BY id ASC;',
    // 'SELECT * FROM StoreManager.sales'
  );
  return sales;
//   return camelize(sales); 
};

// função para buscar por ID
const findSaleById = async (saleId) => {
    const [sale] = await connection.execute(
      'SELECT sales.date, sales_products.product_id AS productId, '
      + 'sales_products.quantity '
      + 'FROM sales_products '
      + 'INNER JOIN sales '
      + 'ON sales_products.sale_id = sales.id '
      + 'WHERE sale_id = ? '
      + 'ORDER BY id ASC;',
      [saleId],
    );
    return sale;
    // return camelize(sale);
};

const removeSale = async (id) => {
  await connection.execute(
    'DELETE FROM sales WHERE id = ?',
    [id],
  );
};

module.exports = {
    findAllSales,
    findSaleById,
    removeSale,
};