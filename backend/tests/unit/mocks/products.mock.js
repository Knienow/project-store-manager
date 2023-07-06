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

const resServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: productByIdFromModel,
};

const resServiceNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'message' },
};

module.exports = {
    productsFromDB,
    productByIdFromModel,
    resServiceSuccessful,
    resServiceNotFound,
};
