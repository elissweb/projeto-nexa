const { Router } = require("express");
const { db } = require("../db"); // seu prisma client exportado aqui

console.log("Carregando rotaMensagens (mens.js)"); // log pra confirmar carregamento

const rotaMensagens = Router();

// Listar todas as mensagens
rotaMensagens.get("/mensagens", async (req, res) => {
  console.log("GET /mensagens recebido");
  try {
    const mensagens = await db.Mensagem.findMany();
    res.json(mensagens);
  } catch (error) {
    console.error("Erro GET /mensagens:", error);
    res.status(500).json({ erro: "Erro ao listar mensagens" });
  }
});

// Criar nova mensagem
rotaMensagens.post("/mensagens", async (req, res) => {
  console.log("POST /mensagens body:", req.body);
  try {
    const { data, mensagem, chatId, horario } = req.body;

    const novaMensagem = await db.Mensagem.create({
      data: { data, mensagem, chatId, horario },
    });

    res.json(novaMensagem);
  } catch (error) {
    console.error("Erro detalhado:", error); // 👈 coloca essa linha
    res.status(500).json({ erro: "Erro ao criar mensagem" });
  }
});

// Deletar mensagem
rotaMensagens.delete("/mensagens:id", async (req, res) => {
  console.log("DELETE /mensagens/:id", req.params.id);
  try {
    const id = Number(req.params.id);
    await db.Mensagem.delete({ where: { id } });
    res.json({ mensagem: "Mensagem deletada com sucesso!" });
  } catch (error) {
    console.error("Erro DELETE /mensagens/:id:", error);
    res.status(500).json({ erro: "Erro ao deletar mensagem" });
  }
});

// Atualizar mensagem
rotaMensagens.put("/mensagens:id", async (req, res) => {
  console.log("PUT /mensagens/:id", req.params.id, "body:", req.body);
  try {
    const id = Number(req.params.id);
    const { mensagem, horario } = req.body;

    const msgAtualizada = await db.Mensagem.update({
      where: { id },
      data: { mensagem, horario },
    });

    res.json(msgAtualizada);
  } catch (error) {
    console.error("Erro PUT /mensagens/:id:", error);
    res.status(500).json({ erro: "Erro ao atualizar mensagem" });
  }
});

module.exports = { rotaMensagens };
