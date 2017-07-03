var router = require('express').Router();
var mongoose = require('mongoose');
var Challenge = mongoose.model('Challenge');

// return a list of tags
router.get('/', function(req, res, next) {
  Challenge.find().distinct('tagList').then(function(tags){
    return res.json({tags: tags});
  }).catch(next);
});

module.exports = router;
