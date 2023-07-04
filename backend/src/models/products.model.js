// const camelize = require('camelize');
const connection = require('./connection');

// essa função executará a consulta SQL para recuperar todas as linhas da tabela products e retornar essas linhas como um ARRAY para quem chamar essa função
const findAllProducts = async () => {
  const [products] = await connection.execute(
      'SELECT * FROM products',
      // 'SELECT * FROM StoreManager.products'
  );
  return products;
//   return camelize(products); 
};

// função para buscar por ID
const findProductById = async (productId) => {
    const [[product]] = await connection.execute(
      'SELECT * FROM products WHERE id = ?',
      [productId],
    );
    return product;
    // return camelize(product);
};
  
module.exports = {
    findAllProducts,
    findProductById,
};