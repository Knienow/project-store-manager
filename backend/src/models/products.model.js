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
    // desestruturando o retorno da função connection.execute em dois níveis - o primeiro retorna o array com as linhas encontradas (array com um elemento ou arraz vazio)    
    const [[product]] = await connection.execute(
      'SELECT * FROM products WHERE id = ?',
      [productId],
    );
    return product;
    // return camelize(product);
};

// const removeProduct = async (id) => {
//   await connection.execute(
//     'DELETE FROM products WHERE id = ?',
//     [id],
//   );
// };
  
module.exports = {
    findAllProducts,
    findProductById,
    // removeProduct,
};