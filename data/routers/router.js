const express = require("express");
const router = express.Router();
const Hubs = require("../db.js");


router.post("/", (req, res) => {
    const post = req.body

    if (!post.title || !post.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    else {
        Hubs.insert(post)
        .then((post) => {
            res.status(201).json(post);
        })
        .catch((error) => {
            res.status(404).json({ error: "A post with that ID can't be found"})
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({message: 'Error adding the post'})
        })
    }
})

router.post("/:id/comments", (req, res) => {
    const comment = req.body

    const {id} = req.params
    try{
    if(!comment.text){
        res.status(404).json({ message: "Please provide text for the comment." });
    } else {
        comment.post_id = id;
        Hubs.insertComment(comment)
            .then((comment) => {
                Hubs.findPostComments(comment.post_id)
            .then((postComment) => {
                res.status(201).json({ postComment });
            })
            .catch((error) => {
                res.status(500).json({ errorMessage: "There was an error while saving the comment to the database"});
            });
        })
            .catch((error) => {
                res.status(400).json({ message: "The post with the specified ID does not exist", data: error});
            });
    }} catch(error) {
        res.status(500).json({errorMessage:"There was an error while saving the comment to the database"})
    }
})

router.get("/", (req, res) => {
   Hubs.find()
   .then((posts) => {
       res.status(200).json(posts)
   })
   .catch((err) =>{
       res.status(500).json({ error: "The posts information could not be retrieved" })
   })
})

router.get("/:id", (req, res) => {
    const {id} = req.params

    Hubs.findById(id)
        .then((post) => {
            if (post[0] === undefined){
                res.status(404).json({message: "The post with the specified ID does not exist."});
            }
            else{
                res.status(200).json({ data: post })
            }
        })
        .catch((err) => {
            res.status(500).json({error: "The post information could not be retrieved"})
        })
})

router.get("/:id/comments", (req, res) => {
    const {id} = req.params
    
    Hubs.findById(id)
    .then((post) => {
        if (post[0] === undefined){
            res.status(404).json({ message: "The post with the specified ID does not exist"})
        } else {
            Hubs.findPostComments(id)
            .then((comment) => {
                if (comment[0] === undefined) {
                    res.status(200).json({ message: "This post has no comments yet" })
                }
                else {
                    res.status(200).json({ data: comment})
                }
            })
        }
    })
    .catch((err) => {
        res.status(500).json({error: "The comments information could not be retrieved"})
    })
    .catch((err) => {
        res.status(500).json({error: "The posts information could not be retrieved"})
    })
})

router.delete("/:id", (req, res) => {
    
        const {id} = req.params;
    
        Hubs.findById(id)
        .then((post) => {
           if(post[0] === undefined){
            res.status(404).json({error: "The post with the specified ID does not exist."})
           } else {
               Hubs.remove(id)
               .then((deletedPost) => {
                   res.status(201).json({ deletedPost: post})
               })
               .catch((error) => {
                   res.status(500).json({ error: "The post could not be removed." })
               })
           }
        })
        .catch((error) => {
            res.status(500).json({ error: "The post could not be removed." })
        })
})

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const editPost = req.body;
  
    if (!editPost.title || !editPost.contents) {
      res.status(400).json({errorMessage: "Please provide title and contents for the post."});
    } else {
      Hubs.update(id, editPost)
        .then((response) => {
          if (response === 1) {
            Hubs.findById(id)
              .then((post) => {
                res.status(200).json(post);
              })
              .catch((err) =>
                res.status(404).json({message: "The post with the specified ID does not exist"})
              );
          } else {
            res.status(404).json({ message: "The post with the specified ID does not exist" });
          }
        })
        .catch((err) => {
          res.status(500).json({ error: "The post information could not be modified." });
        });
    }
  });



    module.exports = router;