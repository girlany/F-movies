const express = require("express");

const cors = require("cors");
const todosRoutes = require("./todos.routes");
//const jogadorRoutes = require("./jogador.routes");
const categoriaRoutes = require("./categoria.routes");


const app = express();

app.use(express.json());


app.use(cors());

app.use(todosRoutes);
//app.use(jogadorRoutes);

app.use(categoriaRoutes);


app.get("/health", (req, res) => {
  return res.json("up");
});

app.listen(3333, () => console.log("Server gih up in 3333"));