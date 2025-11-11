const { Router } = require("express");
const { db } = require("../db");
const rotaChat = Router();

rotaChat.get("/chats", async (req, res) => {
  const chats = await db.chat.findMany({
    include: {
      usuario: true, // Se o nome do relacionamento for 'usuario'
      profissionais: true, // Se o nome do relacionamento for 'profissionais'
    },
  });
  res.json(chats);
});

rotaChat.post("/chats", async (req, res) => {
  const { data, usuarioId, profissionaisId, mensagem } = req.body;

  console.log("Valores recebidos:", {
    data,
    usuarioId,
    profissionaisId,
    mensagem,
  }); // Debug

  try {
    await db.chat.create({
      data: {
        data: data,
        mensagem: mensagem,
        usuario: {
          connect: {
            id: usuarioId,
          },
        },
        profissionais: {
          connect: {
            id: profissionaisId,
          },
        },
      },
    });

    res.status(201).json({ mensagem: "Chat criado com sucesso" });
  } catch (error) {
    console.error("Erro completo:", error);
    res
      .status(400)
      .json({ mensagem: "Erro ao criar o chat", error: error.message });
  }
});

rotaChat.delete("/chats/:id", async (req, res) => {
  const id = Number(req.params.id);
  await db.chat.delete({
    where: { id },
  });
  res.json({ mensagem: "Chat deletado com sucesso" });
});

rotaChat.put("/chats/:id", async (req, res) => {
  const id = Number(req.params.id);
  const data = req.body;

  if (Object.keys(data).length === 0) {
    return res
      .status(400)
      .send({ mensagem: "Nenhum dado fornecido para atualização" });
  }

  try {
    const chatAtualizado = await db.chat.update({
      where: { id },
      data,
    });
    res.send({ mensagem: "Chat atualizado com sucesso", chat: chatAtualizado });
  } catch (error) {
    console.error(error);
    res
      .status(404)
      .json({ mensagem: "Erro ao atualizar chat ou ID não encontrado" });
  }
});

module.exports = { rotaChat };
