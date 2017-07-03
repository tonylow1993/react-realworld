var router = require('express').Router();
var passport = require('passport');
var mongoose = require('mongoose');
var Challenge = mongoose.model('Challenge');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var auth = require('../auth');

// Preload challenge objects on routes with ':challenge'
router.param('challenge', function(req, res, next, slug) {
  Challenge.findOne({ slug: slug})
    .populate('author')
    .then(function (challenge) {
      if (!challenge) { return res.sendStatus(404); }

      req.challenge = challenge;

      return next();
    }).catch(next);
});

router.param('comment', function(req, res, next, id) {
  Comment.findById(id).then(function(comment){
    if(!comment) { return res.sendStatus(404); }

    req.comment = comment;

    return next();
  }).catch(next);
});

router.get('/', auth.optional, function(req, res, next) {
  var query = {};
  var limit = 20;
  var offset = 0;

  if(typeof req.query.limit !== 'undefined'){
    limit = req.query.limit;
  }

  if(typeof req.query.offset !== 'undefined'){
    offset = req.query.offset;
  }

  if( typeof req.query.tag !== 'undefined' ){
    query.tagList = {"$in" : [req.query.tag]};
  }

  Promise.all([
    req.query.author ? User.findOne({username: req.query.author}) : null,
    req.query.favorited ? User.findOne({username: req.query.favorited}) : null
  ]).then(function(results){
    var author = results[0];
    var favoriter = results[1];

    if(author){
      query.author = author._id;
    }

    if(favoriter){
      query._id = {$in: favoriter.favorites};
    } else if(req.query.favorited){
      query._id = {$in: []};
    }

    return Promise.all([
      Challenge.find(query)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({createdAt: 'desc'})
        .populate('author')
        .exec(),
      Challenge.count(query).exec(),
      req.payload ? User.findById(req.payload.id) : null,
    ]).then(function(results){
      var challenges = results[0];
      var challengesCount = results[1];
      var user = results[2];

      return res.json({
        challenges: challenges.map(function(challenge){
          return challenge.toJSONFor(user);
        }),
        challengesCount: challengesCount
      });
    });
  }).catch(next);
});

router.get('/feed', auth.required, function(req, res, next) {
  var limit = 20;
  var offset = 0;

  if(typeof req.query.limit !== 'undefined'){
    limit = req.query.limit;
  }

  if(typeof req.query.offset !== 'undefined'){
    offset = req.query.offset;
  }

  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    Promise.all([
      Challenge.find({ author: {$in: user.following}})
        .limit(Number(limit))
        .skip(Number(offset))
        .populate('author')
        .exec(),
      Challenge.count({ author: {$in: user.following}})
    ]).then(function(results){
      var challenges = results[0];
      var challengesCount = results[1];

      return res.json({
        challenges: challenges.map(function(challenge){
          return challenge.toJSONFor(user);
        }),
        challengesCount: challengesCount
      });
    }).catch(next);
  });
});

router.post('/', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    var challenge = new Challenge(req.body.challenge);

    challenge.author = user;

    return challenge.save().then(function(){
      console.log(challenge.author);
      return res.json({challenge: challenge.toJSONFor(user)});
    });
  }).catch(next);
});

// return a challenge
router.get('/:challenge', auth.optional, function(req, res, next) {
  Promise.all([
    req.payload ? User.findById(req.payload.id) : null,
    req.challenge.populate('author').execPopulate()
  ]).then(function(results){
    var user = results[0];

    return res.json({challenge: req.challenge.toJSONFor(user)});
  }).catch(next);
});

// update challenge
router.put('/:challenge', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if(req.challenge.author._id.toString() === req.payload.id.toString()){
      if(typeof req.body.challenge.title !== 'undefined'){
        req.challenge.title = req.body.challenge.title;
      }

      if(typeof req.body.challenge.description !== 'undefined'){
        req.challenge.description = req.body.challenge.description;
      }

      if(typeof req.body.challenge.body !== 'undefined'){
        req.challenge.body = req.body.challenge.body;
      }

      if(typeof req.body.challenge.tagList !== 'undefined'){
        req.challenge.tagList = req.body.challenge.tagList
      }

      req.challenge.save().then(function(challenge){
        return res.json({challenge: challenge.toJSONFor(user)});
      }).catch(next);
    } else {
      return res.sendStatus(403);
    }
  });
});

// delete challenge
router.delete('/:challenge', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    if(req.challenge.author._id.toString() === req.payload.id.toString()){
      return req.challenge.remove().then(function(){
        return res.sendStatus(204);
      });
    } else {
      return res.sendStatus(403);
    }
  }).catch(next);
});

// Favorite an challenge
router.post('/:challenge/favorite', auth.required, function(req, res, next) {
  var challengeId = req.challenge._id;

  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    return user.favorite(challengeId).then(function(){
      return req.challenge.updateFavoriteCount().then(function(challenge){
        return res.json({challenge: challenge.toJSONFor(user)});
      });
    });
  }).catch(next);
});

// Unfavorite an challenge
router.delete('/:challenge/favorite', auth.required, function(req, res, next) {
  var challengeId = req.challenge._id;

  User.findById(req.payload.id).then(function (user){
    if (!user) { return res.sendStatus(401); }

    return user.unfavorite(challengeId).then(function(){
      return req.challenge.updateFavoriteCount().then(function(challenge){
        return res.json({challenge: challenge.toJSONFor(user)});
      });
    });
  }).catch(next);
});

// return an challenge's comments
router.get('/:challenge/comments', auth.optional, function(req, res, next){
  Promise.resolve(req.payload ? User.findById(req.payload.id) : null).then(function(user){
    return req.challenge.populate({
      path: 'comments',
      populate: {
        path: 'author'
      },
      options: {
        sort: {
          createdAt: 'desc'
        }
      }
    }).execPopulate().then(function(challenge) {
      return res.json({comments: req.challenge.comments.map(function(comment){
        return comment.toJSONFor(user);
      })});
    });
  }).catch(next);
});

// create a new comment
router.post('/:challenge/comments', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    var comment = new Comment(req.body.comment);
    comment.challenge = req.challenge;
    comment.author = user;

    return comment.save().then(function(){
      req.challenge.comments.push(comment);

      return req.challenge.save().then(function(challenge) {
        res.json({comment: comment.toJSONFor(user)});
      });
    });
  }).catch(next);
});

router.delete('/:challenge/comments/:comment', auth.required, function(req, res, next) {
  if(req.comment.author.toString() === req.payload.id.toString()){
    req.challenge.comments.remove(req.comment._id);
    req.challenge.save()
      .then(Comment.find({_id: req.comment._id}).remove().exec())
      .then(function(){
        res.sendStatus(204);
      });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
