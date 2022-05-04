const express = require('express');
const router = express.Router();
const passport = require('passport');

const mongoose = require('mongoose');
const userModel = mongoose.model('user');

router.route('/login').post((req, res, next) => {
    if (req.user.username, req.body.password) {
        passport.authenticate('local', function(error, user) {
            if (error) return res.status(500).send(error);
            req.logIn(user, function(error) {
                if (error) return res.status(500).send(error);
                return res.status(200).send('Logged in successfully');
            });
        })(req, res);
    } else {
        return res.status(400).send('Not all required parameters are passed');
    }
});

router.route('/logout').post((req, res, next) => {
    if (req.isAuthenticated()) {
        req.logout();
        res.status(200).send('Logged out successfully');
    } else {
        return res.status(400).send('User was not logged in');
    }
});

router.route('/status').get((req, res, next) => {
    if (req.isAuthenticated()) {
        return req.status(200).send(req.session.passport);
    } else {
        return req.status(403).send('User was not logged in');
    }
})

router.route('/user').get((req, res, next) => {
    userModel.find({}, (err, users) => {
        if (err) return res.status(500).send('Error in DB');
        res.status(200).send(users);
    });
}).post((req, res, next) => {
    if (req.body.username && req.body.email && req.body.password) {
        userModel.findOne({ username: req.body.username }, (err, user) => {
            if (err) return res.status(500).send('Error in DB');
            if (user) {
                return res.status(400).send('User already exists');
            }
            const usr = new userModel({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            });
            usr.save((error) => {
                if (error) return res.status(500).send('Error while saving to DB');
                return res.status(200).send('Successfully added a new user to DB');
            });
        });
    } else {
        return res.status(400).send('Not all required parameters are passed');
    }
});
