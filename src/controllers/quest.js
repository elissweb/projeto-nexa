const { Router } = require("express");
const { db } = require("../db");
const rotaQuestionario = Router();

rotaQuestionario.get("/questionarios", async (req, res) => {
  const questionarios = await db.questionario.findMany();
  res.json(questionarios);
});

rotaQuestionario.post("/questionarios", async (req, res) => {
  const { titulo, enunciado, Resposta } = req.body;

  await db.questionario.create({
    data: {
      titulo,
      enunciado,
      Resposta,
    },
  });

  res.json({ mensagem: "okay" });
});

rotaQuestionario.delete("/questionarios/:id", async (req, res) => {
  const id = Number(req.params.id);
  await db.questionario.delete({
    where: { id },
  });
  res.json({ mensagem: "okay" });
});

rotaQuestionario.put("/questionarios/id", async (req, res) => {
  const id = Number(req.params.id);
  const data = {};

  await db.questionario.update({
    where: { id },
    data,
  });

  res.send({ mensagem: "okay" });
});

module.exports = { rotaQuestionario };
