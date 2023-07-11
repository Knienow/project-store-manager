const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { salesFromDB, saleByIdFromModel, postModel, returnPost, resServiceSuccessful, invalidTest } = require('../mocks/sales.mock');

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
    it('Verificando se a busca falha ao informar um id inválido', async function () {
        const req = {};
        const res = {};
       
        req.params = { id: 100 };
        req.body = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesService, 'getSaleByID').resolves({ status: 'NOT_FOUND', data: { message: 'Sale not found' } });
        await salesController.getSaleId(req, res);
        expect(res.status).to.have.been.calledWith(404);
    });
    it('Cadastrando uma venda com sucesso', async function () {
        sinon.stub(salesService, 'postSale').resolves({ status: 'SUCCESSFUL', data: returnPost });
        const req = { body: postModel };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        await salesController.createSale(req, res);
        expect(res.status).to.have.been.calledWith(201);
    });
    it('Verificando se o cadastro de venda falha ao informar dados inválidos', async function () {
        sinon.stub(salesService, 'postSale').resolves({ status: 'NOT_FOUND', data: invalidTest });
        const req = { body: postModel };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        await salesController.createSale(req, res);
        expect(res.status).to.have.been.calledWith(404);
    });
});