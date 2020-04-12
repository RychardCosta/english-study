const crypto = require('crypto')
const connection = require('../../database/connection')
const bcrypt = require('bcrypt')

module.exports = {
    create(req, res) {
        const {name, email, password} = req.body;
        const id = crypto.randomBytes(4).toString("HEX")
        generationPasswordHashAndCreateUser(name, email, password, id)


        function generationPasswordHashAndCreateUser(name, email, password, id){

            bcrypt.hash(password, 10, async(errBcrypt, passwordHash) => {
                if(errBcrypt){return res.status(500).send({error: errBcrypt})
                }
                try {
                const infoDB = await connection('users').where('email', email).select('email', 'id')
                if (infoDB[0].email === email || infoDB[0].id === id){
                    return res.status(401).json({mensage: "Email já está cadastrado"}
                )}
                }catch (error) {
                    try {
                        await connection('users')
                        .insert({
                            id,
                            name,
                            email,
                            password: passwordHash,
                            })
                        return res.status(201).json({
                            mensage: "Usuário cadastrado com sucesso",
                            usuario:{id, name, email}})  
                    } catch (error) {
                        return res.status(500).json({error: error})
                    }}
                    connection.destroy()
                })
    }}
}
