const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { salesFromDB, resServiceSuccessful, postModel } = require('../mocks/sales.mock');

describe('Realizando testes - SALE SERVICE:', function () {   
    beforeEach(function () {
        sinon.restore();
    });
    it('Recuperando todas as vendas com sucesso', async function () {
        sinon.stub(salesModel, 'findAllSales').resolves(salesFromDB);
        const sales = await salesService.getAllSales();
        expect(sales).to.be.an('object');
        expect(sales.status).to.be.equal('SUCCESSFUL');
        expect(sales.data).to.be.deep.equal(salesFromDB);
    });
    it('Recuperando uma venda por ID com sucesso', async function () {
        sinon.stub(salesModel, 'findSaleById').resolves(resServiceSuccessful);
        const sale = await salesService.getSaleByID();
        expect(sale).to.be.an('object');
        expect(sale.status).to.be.equal('SUCCESSFUL');
        expect(sale.data).to.be.deep.equal(resServiceSuccessful);
    });
    it('Cadastrando a venda de um produto com sucesso', async function () {
        sinon.stub(salesModel, 'createSale').resolves(1);
        const result = await salesService.postSale(postModel);
        expect(result).to.equal(1);
    });
});