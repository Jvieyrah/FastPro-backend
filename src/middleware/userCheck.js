const StructuredError = require( '../errors/StructuredError');

const userCheck = (req, res, next) => {
  const { nome, telefone, email, senha } = req.body;
  // valida se todos os campos estão preenchidos corretamente
  if (!email || !senha || !nome || !telefone) {
    throw new StructuredError('All fields must be filled', 400);
  }
  //simple e-mail regex validation
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email))
    throw new StructuredError('email must be a valid e-mail format', 400);
  if (senha.length < 8)
    throw new StructuredError('Password must have at least 8 characters', 400);
  //  a senha deve ter pelo menos um número e uma letra maiúscula e um caractere especial
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
  if (!passwordRegex.test(senha))
    throw new StructuredError('Password must have at least one uppercase letter and one number', 400);
  next();
}

module.exports = userCheck;
