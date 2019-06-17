const express = require('express');

const Forum = require('../models/forum');

const router = express.Router();

// create
router.post('/create', (req, res, next) => {
    let newForum = new Forum({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author,
        comments: []
    });

    Forum.addForum(newForum, (err, forum) => {
        if (err) {
            console.log(err)
            res.json({success: false, msg: 'Failed to create post'});
        }
        else {
            res.json({success: true, msg: 'Post created'});
        }
    });
});

// delete
router.post('/delete', (req, res, next) => {
    const id = req.body.id;
    Forum.remove({ _id: id }, (err) => {
        if(err){
            throw err;
        }
        res.json({
            success: true,
            msg: 'Post has now been deleted'
        });
    });
});

// get all
router.get('/forumList', (req, res, next) => {
    Forum.find({}, [], {sort: {_id: 1}}, (err, forums) => {
        if(err) throw err;
        res.status(200).json({
            status: 'success',
            data: forums
        })
    })
});

module.exports = router;