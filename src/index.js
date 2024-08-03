const express = require("express");
const morgan = require("morgan");

//confg inicial
const app = express();
app.set("port",4000);
app.listen(app.get("port"));
console.log("escuchando puerto" + app.get("port"));

//Middlewares
app.use(morgan("dev"));






app.get("/productos", (req, res) => {
    res.send("mensaje recibido ok")
}

)