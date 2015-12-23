var express = require('express');
var router = express.Router();

//loading models
var postsModel = require('../models/posts.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  //cartData defaluts to nothing
  var params = {}

  //filling params with username and type
  if(req.session.username)
    params.username = req.session.username
  if(req.session.usertype)
    params.usertype = req.session.usertype

  //finding posts
  postsModel.find({}).toArray(function(err,posts){
    if(err) throw err
    params.entries = posts
    res.render('index',params);
  })

})// <<< GET /

function l(x){
  console.log(x)
}

module.exports = router;
