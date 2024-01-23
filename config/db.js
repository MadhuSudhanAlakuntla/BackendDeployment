const mongoose = require("mongoose");
const connection = mongoose.connect("mongodb+srv://madhusudhan03833:madhusudhanmongodb03833@cluster0.7xo7j5y.mongodb.net/mydata")
module.exports = {connection}