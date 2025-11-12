const { Router } = require("express");
const { db } = require("../db");
const rotaUsuario = Router();

rotaUsuario.get("/usuarios", async (req, res) => {
  const usuarios = await db.usuario.findMany();
  res.json(usuarios);
});

rotaUsuario.post("/usuarios", async (req, res) => {
  const {
    nome,
    apelido,
    gmail,
    senha,
    rua,
    telefone,
    foto_de_perfil,
    idade,
    estado,
    cidade,
    bairro,
    data_nascimento,
  } = req.body;

  try {
    const created = await db.usuario.create({
      data: {
        nome,
        apelido,
        gmail,
        senha,
        rua,
        telefone,
        foto_de_perfil,
        estado,
        cidade,
        bairro,
        data_nascimento: new Date(data_nascimento),
      },
    });
    res.status(201).json(created);
  } catch (error) {
    console.error('Erro ao criar usuario:', error);
    // handle unique constraint error (gmail)
    if (error && error.code === 'P2002') {
      return res.status(400).json({ mensagem: 'Email (gmail) já cadastrado', campo: error.meta?.target });
    }
    res.status(500).json({ mensagem: 'Erro ao criar usuario', error: error.message });
  }
});

rotaUsuario.delete("/usuarios/:id", async (req, res) => {
  const id = Number(req.params.id);
  await db.usuario.delete({
    where: { id },
  });
  res.json({ mensagem: "okay" });
});

rotaUsuario.put("/usuarios/:id", async (req, res) => {
  const id = Number(req.params.id);
  const data = {};

  if (req.body.nome) data.nome = req.body.nome;
  if (req.body.email) data.email = req.body.email;

  await db.usuario.update({
    where: { id },
    data,
  });

  res.send({ mensagem: "okay" });
});

module.exports = { rotaUsuario };
