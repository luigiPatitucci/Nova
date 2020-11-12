const { DataTypes } = require('sequelize');
const db = require('../dbConfig');

 const Account = db.conexion.define('account', {
    balance:{
      type: DataTypes.BIGINT,
      allowNull: false,
      default: 0,
    },
    cbu:{
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        validate: {
            isNumeric: true 
        }  
    },
    code:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    currency:{
        type: DataTypes.ENUM('usd','ars'),
        defaultValue: 'ars'
    },
    verified:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
  
})
module.exports={
    Account
}
 