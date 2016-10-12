var User = require('../models/user');
var Thread = require('../models/thread');
var Message = require('../models/message');
var formidable = require('formidable');
var express = require('express');
var router = express.Router();

module.exports = function() {
    router.get('/new-message', function(req, res){
        res.render('guestbook/new-message');
    });

    router.post('/new-message', function(req, res){
        var newMessage = new Message();
        var newThread = new Thread();

        // Get current user ID
        var user = req.session.passport.user;

        // Create a new message object
        newMessage.content = req.body.message;
        newMessage.thread_id = newThread._id;
        newMessage.save();

        //Create a new thread_id
        var messageContent = { user_id: user, content: req.body.message };
        newThread.messages.push(messageContent);
        newThread.save();

        res.redirect(303, 'new-message');
    });
    
    router.get('/index', function(req, res){
        Thread.find({}, function(err, threads) {
            console.log(threads);
            res.render('guestbook/index', {threads: threads});
        });
    });

    return router;
};
