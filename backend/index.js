const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 5000;
const sequelize = require("./config/database");

app.set("port", process.env.PORT || port);
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

sequelize.sync(); //verifica a base de dados

//definir rotas

app.use("/api/v1", require("./routes/clientes.route.js"));
app.use("/api/v1", require("./routes/veiculos.route.js"));
app.use("/api/v1", require("./routes/reparacoes.route.js"));
app.use("/api/v1", require("./routes/material_utilizado.route.js"));
app.use("/api/v1", require("./routes/auth.route.js"));

app.listen(app.get("port"), () => {
  console.log("Servidor a correr na porta " + app.get("port"));
});
