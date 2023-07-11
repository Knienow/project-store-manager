const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { productsFromDB, productByIdFromModel, productCreated, resServiceSuccessful, resServiceNotFound } = require('../mocks/products.mock');

describe('Realizando testes - PRODUCT CONTROLLER:', function () {   
    afterEach(function () {
        sinon.restore();
    });
    it('Recuperando todos os produtos com sucesso', async function () {
        sinon.stub(productsService, 'getAllProducts').resolves({ status: 'SUCCESSFUL', data: productsFromDB });
        const req = {};
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        await productsController.getProducts(req, res);
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(productsFromDB);
    });
    it('Recuperando um produto por ID com sucesso', async function () {
        sinon.stub(productsService, 'getProductByID').resolves(resServiceSuccessful);
        const req = { params: { id: 1 } };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        await productsController.getProductId(req, res);
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(productByIdFromModel);
    });
    it('Recuperando um produto por ID sem sucesso', async function () {
        sinon.stub(productsService, 'getProductByID').resolves(resServiceNotFound);
        const req = { params: { id: 100 } };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        await productsController.getProductId(req, res);
        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
    it('Cadastrando um produto com sucesso', async function () {
        const req = { body: { name: 'Caneta galactica' } }; 
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        sinon
        .stub(productsService, 'postProduct')
        .resolves({ status: 'CREATED', data: productCreated });
        await productsController.createProducts(req, res);
        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith(productCreated);
    });
    it('Cadastrando um produto sem sucesso - string vazia', async function () {
        const req = { body: { name: '' } }; 
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        sinon
        .stub(productsService, 'postProduct')
        .resolves({ status: 'BAD_REQUEST', data: { message: '"name" is required' } });
        await productsController.createProducts(req, res);
        expect(res.status).to.have.been.calledWith(400);
        expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });
    it('Cadastrando um produto sem sucesso - name com menos de 5 caracteres', async function () {
        const req = { body: { name: 'cane' } }; 
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        sinon
        .stub(productsService, 'postProduct')
        .resolves({ status: 'INVALID_VALUE', data: { message: '"name" length must be at least 5 characters long' } });
        await productsController.createProducts(req, res);
        expect(res.status).to.have.been.calledWith(422);
        expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });
    // it('Atualizando um produto com sucesso', async function () {});
});