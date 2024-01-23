const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cors = require("cors")

const connection = require("./config/db")  // mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const {UserModel} = require("./models/User.model")
const {blogRouter} = require("./routes/blog.routes")
const {authentication} = require("./middlewares/authenticate.middleware")

const app = express()

app.use(express.json())

app.use(cors({
    origin : "*"
}))

app.get("/", (req, res) => {
    res.send({"msg" : "API working, check /ping"})
})

app.get("/ping", (req, res) => {
    res.send({"msg" : "pong"})
})

app.post("/signup", async (req, res) => {
        const {name, email, password} = req.body;
        try{
            bcrypt.hash(password, 4, async function(err, hash) {
                await UserModel.create({name, email, password : hash})
                return res.send({msg : "signup successfull"})
            });
        }
        catch(err){
            console.log(err)
            return res.send({msg : "something went wrong, please try again later"})
        }
})

app.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email})

    if(!user){
        return res.send({msg : "Invalid credentials"})
    }

    const hash = user.password
    bcrypt.compare(password, hash, function(err, result) {
         if(result){
                const token = jwt.sign({userID : user._id}, "masaisecret")
                return res.send({msg : "login successfull", token : token})
         }
         else{
            return res.send({msg : "login failed"})
         }
    });
})



app.use(authentication)

app.use("/blogs", blogRouter)


app.listen(7500, async () => {
    try{
        await connection
        console.log("connected to mongodb successfully")
    }
    catch(err){
        console.log("error while connecting to DB")
        console.log(err)
    }
    console.log("listening on port 7500")
})


