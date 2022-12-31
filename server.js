






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