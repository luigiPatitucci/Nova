const { DataTypes } = require('sequelize');
const {Token} = require("./Token");
const db = require('../dbConfig');


   const User =  db.conexion.define('user',{
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
            validated:{
              isEmail: false,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        name:{
            type:DataTypes.STRING,
            allowNull: true,
        },
        surname:{
            type:DataTypes.STRING,
            allowNull: true,
        },
        birthday: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        identityType: {
            type: DataTypes.ENUM(["dni", "passport"]),
            allowNull: true,
        },
        identityNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        avatar: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        address_street: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address_number: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        locality: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        province: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        role:{
            type: DataTypes.ENUM('user','admin'),
            defaultValue: 'user'
        },
        verified: {
			type: DataTypes.BOOLEAN,
			default: false,
		},
    })
module.exports={
    User,
    Token
}