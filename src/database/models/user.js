const sequelize = require('sequelize');

const User = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        nome: DataTypes.STRING,
        telefone: DataTypes.STRING,
        email: DataTypes.STRING,
        senha: DataTypes.STRING
    },{
        timestamps: false,
        tableName: "users"
    })
    return User;
}

module.exports = User;
