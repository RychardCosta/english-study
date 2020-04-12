const jwt = require('jsonwebtoken')


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
            


        jwt.verify(token, process.env.ACESS_TOKEN, (err, user) => {
            if(err) {return res.sendStatus(403)}
            
            req.user = user

            next()

        } )} catch {
            return res.sendStatus(401).json({error: "No token provided"})
        }
    }

}