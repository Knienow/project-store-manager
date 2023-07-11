const connection = require('../../models/connection');

const getValidId = async () => {
  const [validId] = await connection.execute(
    'SELECT id FROM products',
  );

  const validIds = [];
  validId.forEach((element) => validIds.push(element.id));

  return validIds;
};

const validateProductsData = (req, res, next) => {
    const { name } = req.body;
    if (name.length === 0) {
      return res.status(400).json({ message: '"name" is required' });
    }
    if (name.length < 5) {
      return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
    }
    return next();
};

module.exports = {
  getValidId,
  validateProductsData,
};