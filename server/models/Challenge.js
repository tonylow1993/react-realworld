var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var User = mongoose.model('User');

var ChallengeSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  title: String,
  description: String,
  body: String,
  favoritesCount: {type: Number, default: 0},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  tagList: [{ type: String }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true});

ChallengeSchema.plugin(uniqueValidator, {message: 'is already taken'});

ChallengeSchema.pre('validate', function(next){
  this.slugify();

  next();
});

ChallengeSchema.methods.slugify = function() {
  this.slug = slug(this.title);
};

ChallengeSchema.methods.updateFavoriteCount = function() {
  var challenge = this;

  return User.count({favorites: {$in: [challenge._id]}}).then(function(count){
    challenge.favoritesCount = count;

    return challenge.save();
  });
};

ChallengeSchema.methods.toJSONFor = function(user){
  return {
    slug: this.slug,
    title: this.title,
    description: this.description,
    body: this.body,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    tagList: this.tagList,
    favorited: user ? user.isFavorite(this._id) : false,
    favoritesCount: this.favoritesCount,
    author: this.author.toProfileJSONFor(user)
  };
};

mongoose.model('Challenge', ChallengeSchema);
