const mongoose = require("mongoose")


const blogSchema = mongoose.Schema({
    title : {type : String, required : true},
    description : {type : String, required : true},
    author_email : {type : String, required : true},
})

const BlogModel = mongoose.model("blog", blogSchema)

module.exports = {BlogModel}



