/**
 * Created by alanterriaga on 27/10/18.
 */
var express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const User 	= require('../model/User');

//ROUTE SEARCH ============================================
router.get('/api/users', (req, res) => {

	User.find(
	    {
            enabled: true
        },
        (err, users) => {
            if( err ){
                res.send(error);
            }

            // Return all clients
            res.json(users);
        }
    )
    .sort( { updatedAt: -1 });
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
router.put('/api/user', function(req, res){

    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateBirth: req.body.dateBirth,
        country: req.body.country,
        enabled: true

    }, (err, users) => {
        if(err){
            res.send(err);
        }
        res.send(users);
    });
});

//ROUTE DELETE ============================================
router.post('/api/deleteUser', function(req, res){
    console.log("POST: " + req.body.userId);

    User.updateMany(
        {_id: { $in: req.body.userId}},
        {
            enabled: false
        },
        function(error, users){
            if( error ){
                res.send(error);
            }
            res.end('success');
        }
    );
});

//ROUTE EDIT ============================================
router.post('/api/updateUser', function(req, res){

    User.updateOne(
        {_id: { $in: req.body._id}},
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dateBirth: req.body.dateBirth,
            country: req.body.country,
            updatedAt: Date.now()
        },
        {upsert: false}
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