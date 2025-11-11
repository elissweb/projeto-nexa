const { Router } = require("express");
const { db } = require("../db");
const { connect } = require("http2");
const rotaResposta = Router();

rotaResposta.get("/respostas", async (req, res) => {
  const respostas = await db.resposta.findMany();
  res.json(respostas);
});

rotaResposta.post("/respostas", async (req, res) => {
  const { questionario, questionarioId, usuarioId, usuario, resposta } =
    req.body;

  await db.resposta.create({
    data: {
      resposta,
      usuario,
      questionario,
      usuario: {
        connect: {
          id,
        },
      },
      questionario: {
        connect: {
          id,
        },
      },
    },
  });

  res.json({ mensagem: "okay" });
});

rotaResposta.delete("/respostas/:id", async (req, res) => {
  const id = Number(req.params.id);
  await db.resposta.delete({
    where: { id },
  });
  res.json({ mensagem: "okay" });
});

rotaResposta.put("/respostas/id", async (req, res) => {
  const id = Number(req.params.id);
  const data = {};

  await db.resposta.update({
    where: { id },
    data,
  });

  res.send({ mensagem: "okay" });
});

module.exports = { rotaResposta };
