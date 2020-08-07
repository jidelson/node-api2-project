const express = require("express");
const server = require("./server")


server.use(express.json());

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });

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


