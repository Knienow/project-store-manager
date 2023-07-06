const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { productsFromDB, productByIdFromModel, resServiceSuccessful } = require('../mocks/products.mock');

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
});