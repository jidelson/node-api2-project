const express = require('express');

const Hubs = require('../db.js');

const router = express();

router.post("/", (req, res) => {
    const post = req.body

    if (!post.title || !post.content) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    else {
        Hubs.add(req.body)
        .then(hub => {
            res.status(201).json(hub);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error adding the hub'
            })
        })
    }
})

router.post("/:id/comments", (req, res) => {
    const post = req.body

    const id = req.params.id

    if(!post.id){
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
    else if(!comments.text){
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    }
    else{
        Hubs.add(req.body)
        .then(hub => {
            comments.insert(comment)
            res.status(201).json(comment)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "There was an error while saving the comment to the database" 
            })
        })
    }
})

router.get("/", (req, res) => {
    if(!posts){
        res.status(500).json({ error: "The posts information could not be retrieved." })
    }
    else{
        Hubs.findPostComments(req.body)
        .then(hub => {
            res.status(201).json(posts)
        })
        
    }
})

router.get("/:id", (req, res) => {
    const id = req.params.id

    const post = posts.find(p => p.id === id)

    if(!post.id){
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
    else{
        Hubs.findPostComments(req.body)
        .then(hub => {
            res.status(201).json(post)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
    }
})

router.get("/:id/comments", (req, res) => {
    const id = req.params.id
    
    const comment = comments.find(c => c.id === id)
    const post = posts.find(p => p.id === id)
    
    if(!post.id){
        req.status(404).json({ message: "The post with the specified ID does not exist." })
    }
    else {
        Hubs.findPostComments(req.body)
        .then(hub => {
            res.status(201).json(comment)
        })
        .catch(error => {
            console.log(error);
            req.status(500).json({ error: "The comments information could not be retrieved." })
        })
    }
})

router.delete("/:id", (req, res) => {
    
        const id = req.params.id
    
        const deletedPost = posts.remove(p => p.id === id)
        if(deletedPost.length > 0) {
            posts = posts.filter(p => p.id !== id)
            res.status(200).json(deletedPost)
        } else {
            Hubs.remove(req.body)
            .then(hub => {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            })
            .catch(
                res.status(500).json({ error: "The post could not be removed" })
            )}
})

router.put("/:id", (req, res) => {
    
        const id = req.params.id
        const post = posts.find(p => p.id === id)
        const newPost = req.body

        if(!post){
            req.status(404).json({ message: "The post with the specified ID does not exist." })
        }
  
        else{
            Hubs.update(req.body)
            .then(hub => {
                posts = posts.map(post => post.id === req.params.id ? newPost : post)
            res.status(200).json(posts)
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ error: "The post information could not be modified." })
            })
        }
})



module.exports = router;