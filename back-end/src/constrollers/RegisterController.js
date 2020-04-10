const crypto = require('crypto')
const connection = require('../database/connection')
const bcrypt = require('bcrypt')

module.exports = {
    create(req, res) {
        const {nome, email, password} = req.body;
        const id = crypto.randomBytes(4).toString("HEX")
   
        bcrypt.hash(password, 10, async(errBcrypt, passwordHash) => {
            if(errBcrypt){return res.status(500).send({error: errBcrypt})}
            
            try {
                emailVal = await connection('users').where('email', email).select('email')
                if (emailVal[0].email === email){
                    return res.status(401).json({mensage: "Email já está cadastrado"})}
                
            } catch (error) {
                
             try {              
                await connection('users')
                .insert({
                    id,
                    nome,
                    email,
                    password: passwordHash,
                    })

                return res.status(201).json({
                    mensage: "Usuário cadsatrado com sucesso",
                    usuario:{id, nome, email}})                   
    
            } catch (error) {
                return res.status(500).json({error: error})

            }}
        })
    }
}