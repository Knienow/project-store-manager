const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
// const { productsFromDB, productByIdFromModel, productPost, productCreated } = require('../mocks/products.mock');
const { productsFromDB, productByIdFromModel, productPost, result } = require('../mocks/products.mock');

describe('Realizando testes - PRODUCT MODEL:', function () {   
    afterEach(function () {
        sinon.restore();
    });
    it('Recuperando todos os produtos com sucesso', async function () {
        sinon.stub(connection, 'execute').resolves([productsFromDB]);
        const products = await productsModel.findAllProducts();
        expect(products).to.be.an('array');
        expect(products).to.be.deep.equal(productsFromDB);
    });
    it('Recuperando um produto por ID com sucesso', async function () {
        sinon.stub(connection, 'execute').resolves([[productByIdFromModel]]);
        const product = await productsModel.findProductById();
        expect(product).to.be.an('object');
        expect(product).to.be.deep.equal(productByIdFromModel);
    });
    it('Cadastrando um produto com sucesso', async function () {
        sinon.stub(connection, 'execute')
        .onFirstCall()       
        .resolves([{ insertId: 3 }])
        .onSecondCall()
        .resolves();
        const product = await productsModel.createProduct(productPost);
        expect(product).to.be.deep.equal(result);
    });
    it('Atualizando um produto com sucesso', async function () {
        sinon.stub(connection, 'execute')
        .onFirstCall()       
        .resolves([{ insertId: 1 }])
        .onSecondCall()
        .resolves();
        const product = await productsModel.upProduct(1, 'Martelo do Coringa');
        expect(product).to.be.an('object');
        expect(product).to.be.deep.equal({ id: 1, name: 'Martelo do Coringa' });
    });
});