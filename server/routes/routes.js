/**
 * Created by alanterriaga on 30/7/18.
 */
var mongoose = require("mongoose");
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");

var User 	= require('../model/User');

//ROUTE SEARCH ============================================
router.get('/api/users', function(req, res){

	User.find({}, function(err, users){

		if( err ){
			res.send(error);
		}

		// Return all clients
		res.json(users);
	});
});

router.post('/api/findUser', function(req, res){

    User.findOne(
        {
            _id: req.query.idChecked

        }, function(err, users){
            if(err){
                res.send(err);
            }

            res.json(users)
        });
});

//ROUTE INSERT ============================================
router.put('api/user', function (req, res){
    User.create({
        name: req.query.name,
        dateBirth: req.query.dateBirth,
        city: req.query.city,
        country: req.query.country

    }, function (err, users) {
        if(err){
            res.send(err);
        }
        res.send(users);
    });
});

//ROUTE DELETE ============================================
router.post('/api/deleteUser', function(req, res){
    // Put in an array in case of removal of one document
    var numbersId = req.query.idChecked.split(',');
    User.remove({
        _id: { $in: numbersId}
    },function(error, users){
        if( error ){
            res.send(error);
        }
        res.end('success');
    });
});

//ROUTE EDIT ============================================
router.post('/api/editUser', function(req, res){
    User.update(
        {_id: req.query.idChecked},
        {
            name: req.query.name,
            dateBirth: req.query.dateBirth,
            city: req.query.city,
            country: req.query.country
        },
        {upsert: true}
        ,function(error, users){
            if( error ){
                res.send(error);
            }
            res.end('success');
        }
    );
});


router.get('/', function(req, res){
    res.render('index')
});
module.exports = router;