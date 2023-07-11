const connection = require('./connection');

const findAllSales = async () => {
  const [sales] = await connection.execute(
    'SELECT sales.id AS saleId, sales.date, '
    + 'sales_products.product_id AS productId, sales_products.quantity '
    + 'FROM sales INNER JOIN sales_products ' 
    + 'ON sales.id = sales_products.sale_id '
    + 'ORDER BY id ASC;',
  );
  return sales;
};

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
};

const createSaleProducts = async (elem, saleId) => { 
  await connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?,?,?)',
      [saleId, elem.productId, elem.quantity],
    );
};

const createSale = async (sale) => {
  const [result] = await connection.execute(
    'INSERT INTO sales (date) VALUES (NOW());',
  );
  const idSale = result.insertId;
  const mapSales = sale.map(async (elem) => {
    await createSaleProducts(elem, idSale);
  });

  await Promise.all(mapSales);
  return idSale; 
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
    createSale,
    removeSale,
};