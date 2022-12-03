'use strict';

module.exports = {
 up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users',
    [{
      id: 1,
      nome: 'App Admin',
      telefone: '00000000000',
      email: 'adm@app.com',
      senha: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
      // senha: secret_admin
    },   
    ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
