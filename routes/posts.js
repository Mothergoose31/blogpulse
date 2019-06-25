const express = require('express');
const db = require('../models');
const router = express.Router();

// get -posts/new sends the form for creating a new post \
router.get('/new',function(req,res){
    db.author.findAll()
    .then(function(authors){
        res.render('posts/new',{authors});
    });
});

//get /posts/:id  - returns the selected post
router.get('/:id',function(req,res){
db.post.findOne({
    where:{id: parseInt(req.params.id)},
    include:[db.author,db.comment]
})
.then(function(post){
    res.render('posts/show',{post})
});

});

//get post /posts = create a new post record
router.post('/',function(req,res){
    db.post.create({
        title:req.body.title,
        content: req.body.content,
        authorId:req.body.authorId
    }).then(function(post){
        res.redirect('/')
    });
});
//
router.post('/:id',function(req,res){
    db.comment.create({
        name:req.body.name,

        body:req.body.body
    }).then(function(postId){
        res.redirect
    })
})

module.exports = router;