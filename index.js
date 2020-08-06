const express = require("express");
const { findPostComments } = require("./data/db");
const server = express();

server.use(express.json());

// const  =

server.post("/api/posts", (req, res) => {
    const post = req.body

    if (!post.title || !post.content) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    else if (!post) {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    }
    else {
        posts.push(post)
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
        comments.push(comment)
        res.status(201).json(comment)
    }
})