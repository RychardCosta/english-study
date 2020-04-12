const jwt = require('jsonwebtoken')


const acess = '718b5fb998f71a1c283a58fe088e8b75d96faf7f1ced7f795c725837f761b1daa5d9efb118227de3492b08403b44066cc0f63c336577db0d9d1dbb7e2b8f52db'
const refresh = 'f72f37158002f1564cb3a0ad4a19d290244997306939bb421fcf578dda2db075e5e35a0a84cfc18dee165d873acb09a32cc8112fd8b9226b88848615249636c2'

module.exports = {
    


    
    valided(req, res, next) {
        try {        
        const authorizationHeader = req.headers.authorization
        const parts = authorizationHeader.split(" ")

        if (!parts.length === 2){
            return res.sendStatus(401).json({error: "Token error"}) 
        }

        const [scheme, token] = parts

        if(!/^Bearer$/i.test(scheme)){
            return res.sendStatus(401).json({error: "Token error"})
        }
            


        jwt.verify(token, acess, (err, user) => {
            if(err) {return res.sendStatus(403)}
            
            req.user = user

            next()

        } )} catch {
            return res.sendStatus(401).json({error: "No token provided"})
        }
    }

}