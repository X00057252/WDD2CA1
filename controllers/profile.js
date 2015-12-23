var express = require('express');
var router = express.Router();

//loading models
var postsModel = require('../models/posts.js')
var usersModel = require('../models/users.js')

//listing products with sidebar data
router.get('/', function(req, res, next) {
  if(!req.session.username){
    res.redirect('/profile/login')
  }else{
    var counter = 0
    var params = {username: req.session.username,usertype:req.session.usertype}

    //adding posts to params
    postsModel.find().toArray(function(err,posts){
      if(err) throw err
      params.entries = posts
      counter++
      if(counter == 2)
        res.render('user_edit',params)
    })

    //  collecint user data for displaying in edit form
    usersModel.findOne({username:req.session.username},function(err,user){
      if(err) throw err
      params.fname = user.fname
      params.lname = user.lname
      params.email = user.email
      params.address = user.address
      counter++
      if(counter == 2)
        res.render('user_edit',params)
    })//<<<  users.toArray
  }// <<< ELSE

})// GET profile/

//  editing user details
router.post('/edit',function(req, res, next) {
  var params = {}
  var fname    = req.body.fname
  var lname    = req.body.lname
  var email    = req.body.email
  var address  = req.body.address
  var password = req.body.password
  //records to update
  var userNewData      = {fname:fname,lname:lname,email:email,address:address}
  //new password submitted
  if(password != ''){
    userNewData.password = password
  }
  //updating db for user records
  usersModel.update({username:req.session.username},{'$set':userNewData},function(err,result){
    if(err) throw err
    //if(result){
    userNewData.username = req.session.username
    userNewData.password = req.session.usertype
      params = userNewData
      params.changed = true
      postsModel.find().toArray(function(err,posts){
        if(err) throw err
        params.entries = posts
        params.usertype = req.session.usertype;
        res.render('user_edit',params);
      })
  })// <<< update details

 // }//<<< password changed

})//<<< POST /edit

router.post('/login', function(req, res, next) {
  if(!req.body.username || !req.body.password)
    return res.redirect('/') // Go Home

  //storing posted username and password
  var username = req.body.username
  var password = req.body.password

  //checking in db for the user
  usersModel.find({username:username,password:password}).toArray(function(err,users){
    if(err) throw err
    //if user exists with credentials
    if(users.length){
      req.session.username = username
      req.session.usertype = users[0].type
      //Go Home
      return res.redirect('/')
    }else
     return res.redirect('/')
  })
})// <<< GET profile/login

//  logging user out : destroying user session data and
router.get('/logout', function(req, res, next) {
  delete req.session.username
  delete req.session.usertype

  res.redirect('/')
});

//displaying login page
router.get('/login',function(req, res, next) {
  var params =  {}
  params.cartData = false
  postsModel.find().toArray(function(err,posts){
    if(err) throw err
    params.entries = posts
    res.render('login',params)
  })

})// <<< GET profile/login

//shortened console.log
function l(x){
  console.log(x)
}
//exporting
module.exports = router;



