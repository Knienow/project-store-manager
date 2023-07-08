const { salesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusRest');

const getSales = async (req, res) => {
    //   const sale = await Sales.getAllSales();
      const { status, data } = await salesService.getAllSales();
      return res.status(mapStatusHTTP(status)).json(data);
    };
    
    const getSaleId = async (req, res) => {
        const { id } = req.params;
        const { status, data } = await salesService.getSaleByID(id);
        return res.status(mapStatusHTTP(status)).json(data);
    };

    // verificar se model e service estão ok - desenvolver os testes 
    const createSale = async (req, res) => {
      const { productId, quantity } = req.body;
      const { status, data } = await salesService.postSale(productId, quantity);
      return res.status(mapStatusHTTP(status)).json(data);
  };
    
    module.exports = {
      getSales,
      getSaleId,
      createSale,
    };
