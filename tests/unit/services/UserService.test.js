const sinon = require('sinon');
const chai = require('chai');
const mocha = require('mocha');
const db = require('../../../src/database/models');
const tokenManager = require('../../../src/helpers/tokenManager.js');
const { describe, it, afterEach } = mocha
const chaiHttp = require('chai-http');
const app = require('../../../src/app');
chai.use(chaiHttp);
const { expect } = require('chai');

afterEach(() => {
  sinon.restore();
});

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
     
     it('1-7: quando a requisição é feita com um email inválido, deve ser retornado um status 401', async () => {
      sinon.stub(db.User,'findOne').resolves(null);
      const httpResponse = await chai.request(app).post('/login').send({ email: 'fakeuser@fakedomain.com', senha: 'secret_admin' });
      expect(httpResponse.status).to.be.equal(401);
      sinon.restore();
    });
  
    it('1-8: quando a requisição é feita com um email inválido, deve ser retornado um erro no formato string', async () => {
      sinon.stub(db.User,'findOne').resolves(null);
      const httpResponse = await chai.request(app).post('/login').send({ email: 'fakeuser@fakedomain.com', senha: 'secret_admin' });
      expect(httpResponse.body).to.have.property('message').to.be.a('string');
      expect(httpResponse.body.message).to.deep.equal('Incorrect email or password');
      sinon.restore();
    });
  
    // casos de senha inválida
    const BogusUser = {
      id: 1,
      nome: 'admin',
      telefone: '123456789',
      email: 'admin@admin.com',
      senha: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
    }; 
    it('1-9: quando a requisição é feita com uma senha inválida, deve ser retornado um status 401', async () => {
      sinon.stub(db.User,'findOne').resolves(BogusUser);
      const httpResponse = await chai.request(app).post('/login').send({ email: 'fakeuser@fakedomain.com', senha: 'XPTO' });
      expect(httpResponse.status).to.be.equal(401);
      sinon.restore();
    });
  
    it('1-10: quando a requisição é feita com uma senha inválida, deve ser retornado um erro no formato string', async () => {
      sinon.stub(db.User,'findOne').resolves(BogusUser);
      const httpResponse = await chai.request(app).post('/login').send({ email: 'fakeuser@fakedomain.com', senha: 'XPTO' });
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
    senha: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  }; 
     it('1-11: quando a requisição é feita com sucesso, deve ser retornado um status 200', async () => {
      sinon.stub(db.User,'findOne').resolves(user);  
      const httpResponse = await chai.request(app).post('/login').send({ email: 'admin@admin.com', senha: 'secret_admin' });
      expect(httpResponse.status).to.be.equal(200);
      sinon.restore();
    });
  
    it('1-12: quando a requisição é feita com sucesso, deve ser retornado token no formato string', async () => {
      sinon.stub(db.User,'findOne').resolves(user);
      const httpResponse = await chai.request(app).post('/login').send({ email: 'admin@admin.com', senha: 'secret_admin' });
      expect(httpResponse.body).to.have.property('token').to.be.a('string');
      sinon.restore();
    });
  });
  
  describe('2: Teste da rota validate', () => {
    const token = tokenManager.generateToken({  nome: 'admin', email: 'admin@admin.com' });
    const wrongToken = tokenManager.generateToken({  nome: 'bogusUser', email: 'bogusEmail@admin.com' });

    const userOutput = {
      nome: 'admin',
      email: 'admin@admin.com',
    }; 

    it('2-1: quando a requisição é feita com um token válido, deve ser retornado um status 200', async () => {
      sinon.stub(db.User,'findOne').resolves(userOutput);
      const httpResponse = await chai.request(app).get('/validate').set('authorization', token);
      expect(httpResponse.status).to.be.equal(200);
      sinon.restore();
    });

    it('2-2: quando a requisição é feita com um token válido, deve ser retornado um objeto no formato JSON', async () => {
      sinon.stub(db.User,'findOne').resolves(userOutput);
      const httpResponse = await chai.request(app).get('/validate').set('authorization', token);
      expect(httpResponse.body).to.be.an('object');
      sinon.restore();
    });

    it('2-3: quando a requisição é feita com um token válido, deve ser retornado um objeto com as propriedades "nome" e "email" corretas', async () => {
      sinon.stub(db.User,'findOne').resolves(userOutput);
      const httpResponse = await chai.request(app).get('/validate').set('authorization', token);
      expect(httpResponse.body).to.have.property('nome');
      expect(httpResponse.body).to.have.property('email');
      expect(httpResponse.body.nome).to.be.a('string');
      expect(httpResponse.body.email).to.be.a('string');
      expect(httpResponse.body).to.be.deep.equal(userOutput);
    });

  // caso de token inválido
    it('3-4: quando a requisição é feita com um token inválido, deve ser retornado um status 401', async () => {
      sinon.stub(db.User,'findOne').resolves(null);
      const httpResponse = await chai.request(app).get('/validate').set('authorization', wrongToken);
      expect(httpResponse.status).to.be.equal(404);
      sinon.restore();
    });

    it('3-5: quando a requisição é feita com um token inválido, deve ser retornado um erro no formato string', async () => {
      sinon.stub(db.User,'findOne').
      resolves(null);
      const httpResponse = await chai.request(app).get('/validate').set('authorization', wrongToken);
      expect(httpResponse.body).to.have.property('message').to.be.a('string');
      expect(httpResponse.body.message).to.deep.equal('User not found');
      sinon.restore();
    });
  });

  describe('4: Teste da rota /signup', () => {
    const userNew = {
      nome: 'teste',
      telefone: '123456789',
      email: 'teste@admin.com',
      senha:  "Secret@dmin1",
    };

    const userNewOutput = {
      id: 10,
      nome: 'teste',
      telefone: '123456789',
      email: 'teste@admin.com',
      senha: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
    };

    const userRegisted = {
      nome: 'admin',
      telefone: '123456789',
      email: 'admin@admin.com',
      senha:  "Secret@dmin1",
    };

    const userOutput = {
      id: 1,
      nome: 'admin',
      telefone: '123456789',
      email: 'admin@admin.com',
      senha: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
    };

    const brokenUserEmail = {
      nome: 'admin',
      telefone: '123456789',
      email: 'wrongEmail.com',
      senha: 'Secret_@'
    };

    const brokenUserPassword = {
      nome: 'admin',
      telefone: '123456789',
      email: 'admin@admin.com',
      senha: 'Secret_@'
    };

    // caso de sucesso

    it('4-1: quando a requisição é feita com sucesso, deve ser retornado um status 201', async () => {
      sinon.stub(db.User,'findOne').resolves(null);
      sinon.stub(db.User,'create').resolves(userNewOutput);
      const httpResponse = await chai.request(app).post('/signup').send(userNew);
      expect(httpResponse.status).to.be.equal(201);
      sinon.restore();
    });

    it('4-2: quando a requisição é feita com sucesso, deve ser retornado um objeto no formato JSON com atributo token do tipo string', async () => {
      sinon.stub(db.User,'findOne').resolves(null);
      sinon.stub(db.User,'create').resolves(userNewOutput);
      const httpResponse = await chai.request(app).post('/signup').send(userNew);
      expect(httpResponse.body).to.have.property('token');
      console.log(httpResponse.body);
      sinon.restore();
    });

    // caso de usuário já cadastrado
    it('4-3: quando a requisição é feita com um usuário já cadastrado, deve ser retornado um status 409', async () => {
      sinon.stub(db.User,'findOne').resolves(userOutput);
      const httpResponse = await chai.request(app).post('/signup').send(userRegisted);
      expect(httpResponse.status).to.be.equal(409);
      sinon.restore();
    });

    it('4-4: quando a requisição é feita com um usuário já cadastrado, deve ser retornado um erro no formato string', async () => {
      sinon.stub(db.User,'findOne').resolves(userOutput);
      const httpResponse = await chai.request(app).post('/signup').send(userRegisted);
      expect(httpResponse.body).to.have.property('message').to.be.a('string');
      expect(httpResponse.body.message).to.deep.equal('User already registered');
      sinon.restore();
    });

    // caso de formato de email inválido
    it('4-5: quando a requisição é feita com um email inválido, deve ser retornado um status 400, deve ser retornado um erro no formato string', async () => {
      sinon.stub(db.User,'findOne').resolves(null);
      const httpResponse = await chai.request(app).post('/signup').send(brokenUserEmail);
      expect(httpResponse.status).to.be.equal(400);
      expect(httpResponse.body).to.have.property('message').to.be.a('string');
      expect(httpResponse.body.message).to.deep.equal('email must be a valid e-mail format');
      sinon.restore();
    });

    // caso de formato de senha inválida
    it('4-6: quando a requisição é feita com uma senha inválida, deve ser retornado um status 400, deve ser retornado um erro no formato string', async () => {
      sinon.stub(db.User,'findOne').resolves(null);
      const httpResponse = await chai.request(app).post('/signup').send(brokenUserPassword);
      expect(httpResponse.status).to.be.equal(400);
      expect(httpResponse.body).to.have.property('message').to.be.a('string');
      expect(httpResponse.body.message).to.deep.equal('Password must have at least one uppercase letter and one number');
      sinon.restore();
    });
  });
