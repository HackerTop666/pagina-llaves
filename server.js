const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(express.static("public"));

// 🔐 verificar llave
app.post("/login", (req, res) => {
    const { clave } = req.body;

    let data = JSON.parse(fs.readFileSync("llaves.json"));

    let llave = data.find(l => l.clave === clave);

    if (!llave) {
        return res.json({ ok: false, msg: "Clave inválida" });
    }

    if (llave.usada) {
        return res.json({ ok: false, msg: "Esta llave ya fue usada en otro navegador" });
    }

    llave.usada = true;

    fs.writeFileSync("llaves.json", JSON.stringify(data, null, 2));

    res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});