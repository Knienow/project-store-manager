const { salesService } = require('../services');

const getSales = async (req, res) => {
      const { data } = await salesService.getAllSales();
      return res.status(200).json(data);
    };
    
    const getSaleId = async (req, res) => {
        const { id } = req.params;
        const { status, data } = await salesService.getSaleByID(id);
        return res.status(status === 'NOT_FOUND' ? 404 : 200).json(data);
    };

    const createSale = async (req, res) => {
      const sale = req.body;
      const { status, data } = await salesService.postSale(sale);
      res.status(status === 'SUCCESSFUL' ? 201 : 404).json(data);
  };
    
    module.exports = {
      getSales,
      getSaleId,
      createSale,
    };
