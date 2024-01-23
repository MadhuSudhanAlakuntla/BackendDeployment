const express = require("express")
const jwt = require("jsonwebtoken")
const {BlogModel} = require("../models/Blog.model");
const { UserModel } = require("../models/User.model");

const blogRouter = express.Router();

blogRouter.get("/", async (req, res) => {
    const blogs = await BlogModel.find()
    res.send({blogs : blogs})
})

blogRouter.post("/create", async (req, res) => {
    const {title, description} = req.body;
    const userID = req.userID

    const user = await UserModel.findOne({_id : userID})
    const author_email = user.email;

    await BlogModel.create({title, description, author_email})
    res.send({msg : "blog created"})
})


blogRouter.patch("/edit/:blogID", async (req, res) => {
        const blogID = req.params.blogID
        const payload = req.body;

        const userID = req.userID
        const user = await UserModel.findOne({_id : userID})
        const user_email = user.email;

        const blog = await BlogModel.findOne({_id : blogID})
        const author_email = blog.author_email

        console.log(user_email,author_email)

        if(user_email !== author_email){
            return res.send({msg : "You are not authorised to do this operation"})
        }
        else{
            await BlogModel.findByIdAndUpdate(blogID, payload)
            return res.send({msg : "Blog updated"})
        }
})


blogRouter.delete("/delete/:blogID", async (req, res) => {
    const blogID = req.params.blogID

    const userID = req.userID
    const user = await UserModel.findOne({_id : userID})
    const user_email = user.email;

    const blog = await BlogModel.findOne({_id : blogID})
    const author_email = blog.author_email

    console.log(user_email,author_email)
    if(user_email !== author_email){
        return res.send({msg : "You are not authorised to do this operation"})
    }
    else{
        await BlogModel.findByIdAndDelete(blogID)
        return res.send({msg : "Blog deleted"})
    }
})

module.exports = {blogRouter}