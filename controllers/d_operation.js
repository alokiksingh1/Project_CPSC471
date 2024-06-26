var express = require('express');
var router = express.Router();
var mysql =require('mysql');
const bodyParser = require('body-parser');
// var multer = require ('multer');
var fs = require ('fs');
var path = require ('path');

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

var db = require.main.require ('./models/db_controller');
module.exports = router;

router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});






router.get('/',function(req,res){

    db.getAlloperation(function(err,result){
        
        res.render('d_operation.ejs',{list : result})
    });
    
});



    router.post('/search',function(req,res){
        var key = req.body.search;
        db.searchoperations(key,function(err,result){
            console.log(result);
            
            res.render('d_operation.ejs',{list : result});
        });
    });

