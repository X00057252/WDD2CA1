var express = require('express');
var router = express.Router();
//loading models
var postsModel = require('../models/posts.js')
var usersModel = require('../models/users.js')
//fill sidebar

/* GET home page. */
router.get('/', function(req, res, next) {
    //restricting admin area to admin users only
    if(!req.session.username)
        return res.redirect('/profile/login')
    if(req.session.usertype == 'ordinary')
        return res.redirect('/')
    //counter for async processes
    var counter = 0
    var params =  {username: req.session.username,usertype:req.session.usertype }

    //retreiving posts
    postsModel.find().toArray(function(err,posts){
        if(err) throw err
        params.entries = posts
        counter++
        tryToRenderAdminView(res,counter,params)
    })

    //collecting users
    usersModel.find().toArray(function(err,users){
        if(err) throw err
        params.users = users
        counter++
        tryToRenderAdminView(res,counter,params)
    })


})//  GET /

//if counter == 2 => renderView
function tryToRenderAdminView(res,counter,params){
    if(counter == 2){
        res.render('admin',params)
    }
}// <<<-| function tryToRenderView(

//exporting website router
module.exports = router;
