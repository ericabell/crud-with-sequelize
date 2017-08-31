var express = require('express');
var router = express.Router();

const models = require('../models');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/users', function(req, res, next) {
  models.User.findAll()
    .then( (users) => {
      console.log(users);
      res.render('users', { users: users });
    })
})

router.get('/create_user', function(req, res, next) {
  res.render('new_user');
})

router.post('/create_user', function(req, res, next) {
  let newName = req.body.name;
  let newEmail = req.body.email;
  let newBio = req.body.bio;

  models.User.create({ name: newName, email: newEmail, bio: newBio })
    .then( () => {
      res.redirect('users');
    })
})

router.post('/delete/:id', function(req, res, next) {
  models.User.findById(req.params.id)
    .then( (user) => {
      user.destroy()
        .then( () => {
          res.redirect('/users');
        })
    })
})

router.get('/update/:id', function(req, res, next) {
  models.User.findById(req.params.id)
    .then( (user) => {
      res.render('update', {user: user});
    })
})

router.post('/update/:id', function(req, res, next) {
  models.User.findById(req.params.id)
    .then( (user) => {
      user.update({
        name: req.body.name,
        email: req.body.email,
        bio: req.body.bio
      })
        .then( () => {
          res.redirect('/users');
        })
    })
})

module.exports = router;
