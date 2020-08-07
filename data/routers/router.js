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

module.exports = router;