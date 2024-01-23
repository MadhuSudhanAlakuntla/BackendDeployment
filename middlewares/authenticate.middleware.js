const jwt = require("jsonwebtoken")

const authentication = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.send({msg : "login first"})
    }

    jwt.verify(token, "masaisecret", async (err, decoded) => {
        if(decoded){
            const userID = decoded.userID;
            req.userID = userID
            next()
        }
    })
}


module.exports = {authentication}