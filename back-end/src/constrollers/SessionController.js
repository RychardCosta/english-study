
module.exports = {
    create(request, response) {
        console.log("Deu certo")
        
        return response.json({
            "nome": "Rychard"
        })

    }
}