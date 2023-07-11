const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { productsFromDB, resServiceSuccessful, registredProduct } = require('../mocks/products.mock');

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
    it('Cadastrando um produto com sucesso', async function () {
        sinon.stub(productsModel, 'createProduct').resolves(registredProduct);
        const product = await productsService.postProduct('Caneta Galactica');
        expect(product).to.be.an('object');
        expect(product.status).to.be.equal('CREATED');
        expect(product.data).to.be.deep.equal({ insertId: 3, affectedRows: 1 });
    });
    // it('Cadastrando um produto sem sucesso', async function () {
    //     sinon.stub(productsModel, 'createProduct').resolves(registredProductFail);
    //     const product = await productsService.postProduct('Caneta Galactica');
    //     expect(product).to.be.deep.equal({
    //       error: true,
    //       message: 'Product not registered',
    //       status: 400,
    //     });
    // });
});