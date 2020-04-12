const connection = require('../../database/connection')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')


const acess = '718b5fb998f71a1c283a58fe088e8b75d96faf7f1ced7f795c725837f761b1daa5d9efb118227de3492b08403b44066cc0f63c336577db0d9d1dbb7e2b8f52db'
const refresh = 'f72f37158002f1564cb3a0ad4a19d290244997306939bb421fcf578dda2db075e5e35a0a84cfc18dee165d873acb09a32cc8112fd8b9226b88848615249636c2'


module.exports = {

async create(req, res){
        const {email, password} = req.body
        
        try {
               
            const user = await connection("users").where('email', email).select("id", "name", "email").first()
            const passwordFilter = await connection("users").where('email', email).select('password').first()
            const accessToken = jwt.sign(user, acess, {expiresIn: "1h"}) 
            
            if(user.email === email){
                if(await bcrypt.compare(password, passwordFilter.password)){
                    res.header("authorization", `Bearer ${accessToken}`)
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
