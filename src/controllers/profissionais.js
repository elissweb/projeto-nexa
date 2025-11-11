const { Router } = require("express");
const { db } = require("../db");
const { connect } = require("http2");
const rotaProfissional = Router();

rotaProfissional.get("/profissionais", async (req, res) => {
  const profissionais = await db.profissionais.findMany();
  res.json(profissionais);
});

rotaProfissional.post("/profissionais", async (req, res) => {
  const { nome, contato, chat } = req.body;

  await db.profissional.create({
    data: {
      nome,
      contato,
      chat,
    },
  });

  res.json({ mensagem: "okay" });
});

rotaProfissional.delete("/profissionais/:id", async (req, res) => {
  const id = Number(req.params.id);
  await db.profissionais.delete({
    where: { id },
  });
  res.json({ mensagem: "okay" });
});

rotaProfissional.put("/profissionais/id", async (req, res) => {
  const id = Number(req.params.id);
  const data = {};

  await db.profissionais.update({
    where: { id },
    data,
  });

  res.send({ mensagem: "okay" });
});

module.exports = { rotaProfissional };
