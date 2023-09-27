

const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());



// lire le fichier json
const fs = require("fs");
const data = fs.readFile("./pizzas_saved.json", "utf8", (err, data) => {
    // route
    app.get("/getPizzas", (req, res) => {
        res.json(data)

    })
})


app.listen(port, () => {
    console.log("API demarrée sur localhost");
})

