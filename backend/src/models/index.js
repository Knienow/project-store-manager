// as funcionalidades implementadas no diretório src/models são especificamente utilizadas somente para acesso ao banco de dados
const productsModel = require('./products.model');
const salesModel = require('./sales.model');

module.exports = {
    productsModel,
    salesModel,
};