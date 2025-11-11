const express = require("express");
const { db } = require("./db");
const { rotaUsuario } = require("./controllers/usuario");
const { rotaQuestionario } = require("./controllers/quest");
const { rotaResposta } = require("./controllers/resp");
const { rotaChat } = require("./controllers/chat");
const { rotaProfissional } = require("./controllers/profissionais");
const { rotaMensagens } = require("./controllers/mens");
const server = express();

server.use(express.json());
server.use(rotaUsuario);
server.use(rotaQuestionario);
server.use(rotaResposta);
server.use(rotaChat);
server.use(rotaProfissional);
server.use(rotaMensagens);

server.get("/", (req, res) => {
  res.json(200);
});
// Use PORT env var if provided, otherwise default to 3000
const PORT = process.env.PORT || 3000;

// endpoint to return the current port
server.get('/porta', (req, res) => {
  res.json({ port: Number(PORT) });
});

server.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
