const sinon = require('sinon');
const chai = require('chai');
const mocha = require('mocha');
const db = require('../../../src/database/models');
const { describe, it } = mocha
const chaiHttp = require('chai-http');
const app = require('../../../src/app');
chai.use(chaiHttp);

const { expect } = require('chai');
describe('1: Teste da rota login', () => {
    // casos de missin parameters
    it('1-1: quando a requisição é feita não permita o acesso sem informar um email, deve ser retornado um status 400', async () => {
      const httpResponse = await chai.request(app).post('/login').send({ senha: 'secret_admin' });
      expect(httpResponse.status).to.be.equal(400);
    });
  
    it('1-2: quando a requisição é feita não permita o acesso sem informar um email, deve ser retornado um erro no formato string', async () => {
      const httpResponse = await chai.request(app).post('/login').send({ senha: 'secret_admin' });
      expect(httpResponse.body).to.have.property('message').to.be.a('string');
      expect(httpResponse.body.message).to.deep.equal('All fields must be filled');
    });
  
    it('1-3: quando a requisição é feita não permita o acesso sem informar uma senha, deve ser retornado um status 400', async () => {
       const httpResponse = await chai.request(app).post('/login').send({ email: 'admin@admin.com' });
      expect(httpResponse.status).to.be.equal(400);
    });
  
    it('1-4: quando a requisição é feita não permita o acesso sem informar uma senha, deve ser retornado um erro no formato string', async () => {
      const httpResponse = await chai.request(app).post('/login').send({ email: 'admin@admin.com' });
      expect(httpResponse.body).to.have.property('message').to.be.a('string');
      expect(httpResponse.body.message).to.deep.equal('All fields must be filled');
    });
  
    it('1-5: quando a requisição é feita não permita o acesso sem informar uma senha, deve ser retornado um status 400', async () => {
      const httpResponse = await chai.request(app).post('/login').send({ email: 'admin@admin.com' });
      expect(httpResponse.status).to.be.equal(400);
    });
  
     // casos de email inválido

    sinon.stub(db.User,'findOne').resolves(null);

    it('1-7: quando a requisição é feita com um email inválido, deve ser retornado um status 401', async () => {
      sinon.stub(userModel,'findOne').resolves(null);
      const httpResponse = await chai.request(app).post('/login').send({ email: 'fakeuser@fakedomain.com', senha: 'secret_admin' });
      expect(httpResponse.status).to.be.equal(401);
    });
  
    it('1-8: quando a requisição é feita com um email inválido, deve ser retornado um erro no formato string', async () => {
      const httpResponse = await chai.request(app).post('/login').send({ email: 'fakeuser@fakedomain.com', senha: 'secret_admin' });
      expect(httpResponse.body).to.have.property('message').to.be.a('string');
      expect(httpResponse.body.message).to.deep.equal('Incorrect email or password');
    });
  
    // casos de senha inválida
    it('1-9: quando a requisição é feita com uma senha inválida, deve ser retornado um status 401', async () => {
      const httpResponse = await chai.request(app).post('/login').send({email: 'admin@admin.com', semha: 'bogus_password'});
      expect(httpResponse.status).to.be.equal(401);
    });
  
    it('1-10: quando a requisição é feita com uma senha inválida, deve ser retornado um erro no formato string', async () => {
      const httpResponse = await chai.request(app).post('/login').send({email: 'admin@admin.com', semha: 'bogus_password'});
      expect(httpResponse.body).to.have.property('message').to.be.a('string');
      expect(httpResponse.body.message).to.deep.equal('Incorrect email or password');
      sinon.restore();
    });

    sinon.restore();
  
  /// caso de sucesso 
  const user = {
    id: 1,
    nome: 'admin',
    telefone: '123456789',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  }; 
  sinon.stub(db.User,'findOne').resolves(user);
    it('1-11: quando a requisição é feita com sucesso, deve ser retornado um status 200', async () => {
  
      const httpResponse = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: 'secret_admin' });
      expect(httpResponse.status).to.be.equal(200);
    });
  
    it('1-12: quando a requisição é feita com sucesso, deve ser retornado token no formato string', async () => {
      const httpResponse = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: 'secret_admin' });
      expect(httpResponse.body).to.have.property('token').to.be.a('string');
      sinon.restore();
    });
  });
  


