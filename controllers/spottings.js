var express = require('express');
var router = express.Router();
//loading models
var postsModel = require('../models/posts.js')

/* GET home page. */
router.get('/', function(req, res, next) {
    var params = {}
    //collecting if exist
    if(!req.session.username)
        return res.redirect('/profile/login')
    if(req.session.username)
        params.username = req.session.username
    if(req.session.usertype)
        params.usertype = req.session.usertype

    //finding posts
    postsModel.find().toArray(function(err,posts){
        if(err) throw err
        params.entries = posts
        params.posts   = posts
        res.render('spottings',params);
    })


});

//  displaying specific spottings post
router.get('/id/:id',function(req,res,next){
    //cartData defaluts to nothing
    var params = {}
    //post id
    var _id     = req.params.id

    if(!req.session.username)
        return res.redirect('/profile/login')
    //filling params with username and type
    if(req.session.username)
        params.username = req.session.username
    if(req.session.usertype)
        params.usertype = req.session.usertype

    //finding the request post
    postsModel.find().toArray(function(err,posts){
        if(err) throw err
        posts.forEach(function(post){
            if(post._id == _id)
                params.posts = [post]
        })
        params.entries   = posts
        //Rendering spottings view
        res.render('spottings',params);
    })

})

//shortened console.log
function l(x){
    console.log(x)
}
//exporting website router
module.exports = router;
