let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Pokemon = require('../models/PokemonModel');


/* GET ALL POKEMON */
router.get('/', function(req, res) {
  let ret;
  Pokemon.find({}, null, {populate: {path: 'evolution', select: 'name'}, lean: true}, function (err, products) {
    products.forEach(product =>{
      if(product.evolution) product.evolution = product.evolution.name;
    });
    if (err) ret = err;
    else ret = products;
    res.json(products);
  });
});

/* GET POKEMON BY ID */
router.get('/:id', function(req, res) {

  Pokemon.findById(req.params.id, function (err, post) {
    res.send(post);
  });
});

/* SAVE POKEMON */
router.post('/', function(req, res) {
  let ret;
  Pokemon.create(req.body, function (err, post) {
    if (err) ret = err;
    else ret = post;
    res.json(ret);
  });
});

/* UPDATE POKEMON */
router.put('/:id', function(req, res) {
  let ret;
  Pokemon.findByIdAndUpdate(req.params.id, req.body, {new: true} , function (err, post) {
    if (err) ret = err;
    else ret = post;
    res.json(ret);
  });
});

/* DELETE POKEMON */
router.delete('/:id', function(req, res) {
  let ret;
  Pokemon.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) res = err;
    else ret = post;
    res.json(ret);
  });
});


module.exports = router;
