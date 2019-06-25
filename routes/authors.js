const express = require('express');
const db = require('../models');
const router = express.Router();

//get /authors - returns all authors
router.get('/',function(req,res){
    console.log("wtf");
    db.author.findAll().then(function(authors){
        res.render('authors/index',{authors});
    });
})
//get / authors - sends a form for adding a new author 
router.get('/new',function(req,res){
    res.render('authors/new');
})

//post /author -create a new author
router.post('/',function(req,res){
    db.author.create({
        name:req.body.name
    }).then(function(data){
        res.redirect('/authors');
    });
})

//get  /author/:id - returns the selected author

    router.get('/:id', function(req, res) {
        db.author.findOne({
        where: {id: parseInt(req.params.id)},
        include: [db.post]
        })
        .then(function(author) {
        res.render('authors/show', {author});
        });
    });



module.exports = router;

