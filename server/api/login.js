var router = require('express').Router();
var Sequelize = require('sequelize');
var User = require('./users/user.model');


//assuming request.body is an object with keys email and password

router.post('/', function(req, res, next){
  //can replace wehre object with {where: req.body} if you are confident that the body does not have extra data
  User.findOne({where: {email: req.body.email, password: req.body.password}})
  .then((user)=>{
    if (!user) res.sendStatus(401);
    else {
      req.session.userId = user.id;
      console.log('in login router',req.session);
      console.log('session id', req.sessionID);
      //do something req.session
      res.status(200).json(user);
    }
  })
  .catch(next);
})

router.post('/signup', function(req, res, next){
  //can replace wehre object with {where: req.body} if you are confident that the body does not have extra data
  User.findOne({where: {email: req.body.email}})
  .then((user)=>{
    if (user) return res.send('this email already exists');
    else {
      User.create({
        email: req.body.email,
        password: req.body.password
      })
      .then((user) => {
        req.session.userId = user.id;
        res.status(200).json(user);}
        )
    }
  })
  .catch(next);
})

module.exports = router
