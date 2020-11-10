require("dotenv").config();
 const  Sequelize = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const db=`mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`
const conexion= new Sequelize(db)
   
module.exports = {
    db,
    conexion
}
