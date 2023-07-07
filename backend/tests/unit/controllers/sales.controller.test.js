const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { salesFromDB, saleByIdFromModel, resServiceSuccessful } = require('../mocks/sales.mock');

describe('Realizando testes - SALE CONTROLLER:', function () {   
    afterEach(function () {
        sinon.restore();
    });
    it('Recuperando todas as vendas com sucesso', async function () {
        sinon.stub(salesService, 'getAllSales').resolves({ status: 'SUCCESSFUL', data: salesFromDB });
        const req = {};
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        await salesController.getSales(req, res);
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(salesFromDB);
    });
    it('Recuperando uma venda por ID com sucesso', async function () {
        sinon.stub(salesService, 'getSaleByID').resolves(resServiceSuccessful);
        const req = { params: { id: 1 } };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        await salesController.getSaleId(req, res);
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(saleByIdFromModel);
    });
});