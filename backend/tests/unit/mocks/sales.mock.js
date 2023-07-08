const salesFromDB = [
    {
      saleId: 1,
      date: '2021-09-09T04:54:29.000Z',
      productId: 1,
      quantity: 2,
    },
    {
      saleId: 1,
      date: '2021-09-09T04:54:54.000Z',
      productId: 2,
      quantity: 2,
    },
];

const saleByIdFromModel = [
    {
      date: '2021-09-09T04:54:29.000Z',
      productId: 1,
      quantity: 2,
    },
    {
      date: '2021-09-09T04:54:54.000Z',
      productId: 2,
      quantity: 2,
    },
];

const resServiceSuccessful = {
status: 'SUCCESSFUL',
data: saleByIdFromModel,
};

const resServiceNotFound = {
status: 'NOT_FOUND',
data: { message: 'message' },
};

module.exports = {
  salesFromDB,
  saleByIdFromModel,
  resServiceSuccessful,
  resServiceNotFound,
};