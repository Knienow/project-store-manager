const connection = require('./connection');

// essa função executará a consulta SQL para recuperar todas as linhas da tabela products 
// e retornar essas linhas como um ARRAY para quem chamar essa função
const findAllProducts = async () => {
  const [products] = await connection.execute(
      'SELECT * FROM products',
  );
  return products;
};

// função para buscar por ID
const findProductById = async (productId) => {
    // desestruturando o retorno da função connection.execute em dois níveis 
    // o primeiro retorna o array com as linhas encontradas (array com um elemento ou arraz vazio)    
    const [[product]] = await connection.execute(
      'SELECT * FROM products WHERE id = ?',
      [productId],
    );
    return product;
};

// função para cadastro de produto
const createProduct = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUE (?);',
    [name],
  );
  return { id: insertId, name };
};

// EXEMPLO COURSE - ANALISAR
// const insert = async (driver) => {
//   const columns = getFormattedColumnNames(driver);
//   const placeholders = getFormattedPlaceholders(driver);
//   const query = `INSERT INTO drivers (${columns}) VALUE (${placeholders});`;
//   const [{ insertId }] = await connection.execute(query, [...Object.values(driver)]);
//   return insertId;
// };

// apenas comecei
// const removeProduct = async (id) => {
//   await connection.execute(
//     'DELETE FROM products WHERE id = ?',
//     [id],
//   );
// };
  
module.exports = {
    findAllProducts,
    findProductById,
    createProduct,
    // removeProduct,
};