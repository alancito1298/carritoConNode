const database = require("./database")
const express = require("express");
const morgan = require("morgan");

//confg inicial
const app = express();
app.set("port",4006);
app.listen(app.get("port"));
console.log("escuchando puerto" + app.get("port"));

//Middlewares
app.use(morgan("dev"));






app.get("/productos", async (req, res) => {
    const connection = await database.getConnection();
    const [resultado] = await connection.query("SELECT * FROM `productos en stock` WHERE ID = 1");
    
    
    res.send("mensaje recibido ok " + resultado.nombre);
   
    
} 

)
/* 
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



const getConnection = async () => await connection;*/