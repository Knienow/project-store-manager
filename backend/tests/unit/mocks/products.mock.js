const productsFromDB = [{
      id: 1,
      name: 'Martelo de Thor',
    },
    {
      id: 2,
      name: 'Traje de encolhimento',
    },
    {
      id: 3,
      name: 'Escudo do Capitão América',
    },
];

const productByIdFromModel = {
    id: 1,
    name: 'Martelo de Thor',
};

const productPost = {
  name: 'Caneta galactica',
};

const productCreated = {
  id: 3,
  name: 'Caneta galactica',
};

const productUpdateFail1 = {
  id: '',
  name: 'Caneta galactica',
};

const resServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: productByIdFromModel,
};

const resServiceNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'Product not found' },
};

const updatedProduct = { affectedRows: 1 };

const registredProduct = { insertId: 3, affectedRows: 1 };

const registredProductFail = { insertId: 3, affectedRows: 1 };

const result = {
  id: 3,
  name: {
    name: 'Caneta galactica',
  },
};

module.exports = {
    productsFromDB,
    productByIdFromModel,
    productPost,
    productCreated,
    resServiceSuccessful,
    resServiceNotFound,
    updatedProduct,
    registredProduct,
    registredProductFail,
    result,
    productUpdateFail1,
};
