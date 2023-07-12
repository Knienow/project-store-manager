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
    it('Cadastrando um produto sem sucesso - name com menos de 5 caracteres', async function () {
        sinon.stub(productsModel, 'createProduct').resolves({ id: 20, name: 'cane' });
        const product = await productsService.postProduct('cane');
        expect(product).to.be.deep.equal({ status: 'INVALID_VALUE', 
        data: { message: '"name" length must be at least 5 characters long' } });
    });
    it('Cadastrando um produto sem sucesso - chave name com string vazia', async function () {
        sinon.stub(productsModel, 'createProduct').resolves({ id: 20, name: '' });
        const product = await productsService.postProduct('');
        expect(product).to.be.deep.equal({ status: 'BAD_REQUEST', data: { message: '"name" is required' } });
    });
    it('Atualizando um produto com sucesso', async function () {
        sinon.stub(productsModel, 'upProduct').resolves({ id: 1, name: 'Martelo do Coringa' });
        const result = await productsService.updateProd(1, 'Martelo do Coringa');
        expect(result).to.be.an('object');
        expect(result).to.be.deep.equal({ status: 'SUCCESSFUL', 
        data: { id: 1, name: 'Martelo do Coringa' } });
    });
    it('Atualizando um produto sem sucesso - chave id vazia', async function () {
        sinon.stub(productsModel, 'upProduct').resolves({ id: '', name: 'Martelo de Thor' });
        const result = await productsService.updateProd('', 'Martelo de Thor');
        expect(result).to.be.an('object');
        expect(result).to.be.deep.equal({ status: 'NOT_FOUND', data: { message: 'Product not found' } });
    });
    it('Atualizando um produto sem sucesso - name com menos de 5 caracteres', async function () {
        sinon.stub(productsModel, 'upProduct').resolves({ id: 1, name: 'Mar' });
        const result = await productsService.updateProd(1, 'Mar');
        expect(result).to.be.an('object');
        expect(result).to.be.deep.equal({ status: 'INVALID_VALUE', 
        data: { message: '"name" length must be at least 5 characters long' } });
    });
    it('Atualizando um produto sem sucesso - chave name vazia', async function () {
        sinon.stub(productsModel, 'upProduct').resolves({ id: 1, name: '' });
        const result = await productsService.updateProd(1, '');
        expect(result).to.be.an('object');
        expect(result).to.be.deep.equal({ status: 'BAD_REQUEST', data: { message: '"name" is required' } });
    });
});