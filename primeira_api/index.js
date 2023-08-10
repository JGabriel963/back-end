const express = require("express");

const server = express();

// Query params = ?nome=NodeJS
// Route Params = /curso/2
// Request Body = { nome: "Nodejs", tipo: "Back-end" }

server.get("/items", (req,res) => {
    const nome = req.query.nome

    return res.json({  "message": `Item ${nome}`})
})

server.get("/curso/:id", (req, res) => {
    const id = req.params.id;

    return res.json({ "curso": `Curso: ${id}` })
})

server.listen(3000)