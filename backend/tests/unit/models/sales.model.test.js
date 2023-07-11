const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { salesFromDB, saleByIdFromModel, postModel } = require('../mocks/sales.mock');

describe('Realizando testes - SALE MODEL:', function () {   
    afterEach(function () {
        sinon.restore();
    });
    it('Recuperando todas as vendas com sucesso', async function () {
        sinon.stub(connection, 'execute').resolves([salesFromDB]);
        const sales = await salesModel.findAllSales();
        expect(sales).to.be.an('array');
        expect(sales).to.be.deep.equal(salesFromDB);
    });
    it('Recuperando uma venda por ID com sucesso', async function () {
        sinon.stub(connection, 'execute').resolves([saleByIdFromModel]);
        const sale = await salesModel.findSaleById();
        expect(sale).to.be.an('array');
        expect(sale).to.be.deep.equal(saleByIdFromModel);
    });
    it('Cadastrando a venda de um produto com sucesso', async function () {
        sinon.stub(connection, 'execute')
        .onFirstCall()       
        .resolves([{ insertId: 2 }])
        .onSecondCall()
        .resolves();
        const sale = await salesModel.createSale(postModel);
        expect(sale).to.equal(2);
   });

   // testar caso de falha no cadastro da venda - aumentar cobertura de mutations 
});