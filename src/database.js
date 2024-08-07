
const mysql = require("promise-mysql");
const dotenv = require("dotenv");
dotenv.config();

const connection = mysql.createConnection({

host: "localhost",
port: 3308,
database:"carrito de compras",
user: "root",
password: ""
})




const getConnection = async () => await connection;


module.exports = {
    getConnection
}