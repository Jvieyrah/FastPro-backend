const db = require('../database/models');
const bcrypt = require('bcryptjs');
const tokenManager = require('../helpers/tokenManager.js');
const StructuredError = require('../errors/StructuredError');

class UserService {
  makelogin = async (userPassword) => {
    // valida se todos os campos estão preenchidos
    const { email , senha } = userPassword;
    if (!email || !senha) throw new StructuredError('All fields must be filled', 400);
    // encripta senha recebida e compara com a senha do banco
    const userExists = await db.User.findOne({ where: { email } });
    if (!userExists) throw new StructuredError('Incorrect email or password', 401);
    const passwordMatch = await bcrypt.compare(senha, userExists.senha);
    if (!passwordMatch) throw new StructuredError('Incorrect email or password', 401);
    // caso esteja tudo certo, gera token
    const { nome } = userExists;
    const token = tokenManager.generateToken({ nome, email });
    return token;
  };

  validateLogin = async (token) => {
    const { email } = tokenManager.verifyToken(token);
    const user = await  db.User.findOne({ where: { email
    }, attributes: { exclude: ['senha', 'id', 'telefone'] } });
    if (!user) throw new StructuredError('User not found', 404);   
    return user;
  };

  createUser = async (user) => {  
    const { nome, telefone, email, senha } = user; 
    // encripta senha recebida
    const salt = bcrypt.genSaltSync(10);
    // verifica se o usuário já existe
    const userExists = await db.User.findOne({ where: { email } });
    if (userExists) throw new StructuredError('User already registered', 409);
    // caso esteja tudo certo, cria o usuário 
    const hash = bcrypt.hashSync(senha, salt);
    await db.User.create({ nome, telefone, email, senha: hash });
    // gera token
    const token = tokenManager.generateToken({ nome, email });
    return token;
  };  
}

module.exports = UserService;
