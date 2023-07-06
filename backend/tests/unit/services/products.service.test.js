const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { productsFromDB, resServiceSuccessful } = require('../mocks/products.mock');

describe('Realizando testes - PRODUCT SERVICE:', function () {   
    afterEach(function () {
        sinon.restore();
    });
    it('Recuperando todos os produtos com sucesso', async function () {
        sinon.stub(productsModel, 'findAllProducts').resolves(productsFromDB);
        const products = await productsService.getAllProducts();
        expect(products).to.be.an('object');
        expect(products.status).to.be.equal('SUCCESSFUL');
        expect(products.data).to.be.deep.equal(productsFromDB);
    });
    it('Recuperando um produto por ID com sucesso', async function () {
        sinon.stub(productsModel, 'findProductById').resolves(resServiceSuccessful);
        const product = await productsService.getProductByID();
        expect(product).to.be.an('object');
        expect(product.status).to.be.equal('SUCCESSFUL');
        expect(product.data).to.be.deep.equal(resServiceSuccessful);
    });
});