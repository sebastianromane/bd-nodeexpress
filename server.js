require('dotenv').config()
const { agregarLikes, obtenerLikes, duplicatePost  } = require('./posts');
const express = require ('express');
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors());
app.use(express.static('public'))

app.listen(process.env.PORT, console.log("SERVIDOR ENCENDIDO"))


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.get("/posts", async (req, res) => {
    const posts = await obtenerLikes()
    res.json(posts)
})

app.post("/posts", async (req, res) => {
    try {
        const payload = req.body
        const resultDuplicate = await duplicatePost(payload)
        if (
            payload.id === "" ||
            payload.titulo === "" ||
            payload.url === "" ||
            payload.descripcion === ""

        ) {
            console.log("Faltan datos por ingresar");
        } else if (resultDuplicate[0].num > 0){
            res.send("Registro existente")
           
        } else{
            await agregarLikes(payload)
            res.send("Registro agregado con éxito")
        }

    } catch (error) {
        res.json({message: "Faltan campos por ingresar"});
    }  
    });