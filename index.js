const express = require("express");
const { findPostComments } = require("./data/db");
const server = express();

server.use(express.json());

server.post("/api/posts", (req, res) => {
    const post = req.body

    if (!post.title || !post.content) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    else if (!post) {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    }
    else {
        posts.insert(post)
        res.status(201).json(post)
    }
})

server.post("/api/posts/:id/comments", (req, res) => {
    const post = req.body
    const comment = req.body

    const id = req.params.id

    if(!post.id){
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
    else if(!comment.text){
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    }
    else if(!comment){
        res.status(500).json({ error: "There was an error while saving the comment to the database" })
    }
    else{
        comments.insert(comment)
        res.status(201).json(comment)
    }
})

server.get("/api/posts", (req, res) => {
    if(!posts){
        res.status(500).json({ error: "The posts information could not be retrieved." })
    }
    else{
        res.status(201).json(posts)
    }
})

server.get("/api/posts/:id", (req, res) => {
    const id = req.params.id

    const post = posts.find(p => p.id === id)

    if(!post.id){
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
    else if(!post){
        res.status(500).json({ error: "The post information could not be retrieved." })
    }
    else{
        res.status(201).json(post)
    }
})

server.get("/api/posts/:id/comments", (req, res) => {
    const id = req.params.id
    
    const comment = comments.find(c => c.id === id)
    const post = posts.find(p => p.id === id)
    
    if(!post.id){
        req.status(404).json({ message: "The post with the specified ID does not exist." })
    }
    else if (!comments){
        req.status(500).json({ error: "The comments information could not be retrieved." })
    }
    else {
        res.status(201).json(comment)
    }
})

server.delete("/api/posts/:id", (req, res) => {
    try{
        const id = req.params.id
    
        const deletedPost = posts.remove(p => p.id === id)
        if(deletedPost.length > 0) {
            posts = posts.filter(p => p.id !== id)
            res.status(200).json(deletedPost)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }}
        catch{
            res.status(500).json({ error: "The post could not be removed" })
        }
})

server.put("/api/posts/:id", (req, res) => {
    try{
        const id = req.params.id
        const post = posts.find(p => p.id === id)
        const newPost = req.body

        if(!post){
            req.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        else if (!newPost.title || !newPost.contents){
            req.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        }
        else{
            posts = posts.map(post => post.id === req.params.id ? newPost : post)
            res.status(200).json(posts)
        }
    }
    catch{
        res.status(500).json({ error: "The post information could not be modified." })
    }
})


