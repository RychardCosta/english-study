const connection = require('../../database/connection')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')



module.exports = {

async create(req, res){
        const {email, password} = req.body
        
        try {
               
            const user = await connection("users").where('email', email).select("id", "name", "email").first()
            const passwordFilter = await connection("users").where('email', email).select('password').first()
            const Token = jwt.sign(user, process.env.ACCESS_TOKEN, {expiresIn: "1h"}) 
            
            if(user.email === email){
                if(await bcrypt.compare(password, passwordFilter.password)){
                    res.header("authorization", `Bearer ${Token}`)
                    return res.status(200).json({mensage: "Login success",
                                                user: {
                                                    id: user.id,
                                                    email: user.email}})
                
                }else{
                    return res.status(401).json({mensage: "Wrong password"})
                }
            }else{
                return res.status(401).json({mensage: "Authentication failed"})

            }
            
        }catch (error) {
            
            return res.status(401).json({mensage: "Authentication failed"})
            
        }

    }


}           
