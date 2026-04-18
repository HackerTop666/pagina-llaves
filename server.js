const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static("public"));

const filePath = path.join(__dirname, "llaves.json");

app.post("/login", (req, res) => {
    const { clave } = req.body;

    let data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    let index = data.findIndex(l => l.clave === clave);

    if (index === -1) {
        return res.json({ ok: false, msg: "Clave inválida" });
    }

    if (data[index].usada) {
        return res.json({ ok: false, msg: "Esta llave ya fue usada" });
    }

    data[index].usada = true;

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.json({ ok: true });
});

// 🔥 IMPORTANTE PARA RENDER
const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
    console.log("Servidor corriendo en " + PORT);
});
