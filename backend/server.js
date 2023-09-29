const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3001;
const cors = require("cors");

app.use(cors());

function loadJSON(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, { encoding: "utf-8" }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

app.get("/dados", async (req, res) => {
  try {
    const total = await loadJSON("final.json");

    const dados = [...total];

    res.json(dados);
  } catch (error) {
    console.error("Erro ao carregar", error);
    res.status(500).send("Erro ao processar os arquivos.");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
