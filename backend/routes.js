const express = require('express');
const router = express.Router();
const passport = require('passport');

const mongoose = require('mongoose');
const userModel = mongoose.model('user');
const productModel = mongoose.model('product');

router.route('/login').post((req, res, next) => {
    if (req.body.username, req.body.password) {
        passport.authenticate('local', function(error, user) {
            if (error) return res.status(500).send(error);
            req.login(user, function(error) {
                if (error) return res.status(500).send(error);
                return res.status(200).send(user);
            });
        })(req, res);
    } else {
        return res.status(400).send('Not all required parameters are passed');
    }
});

router.route('/logout').post((req, res, next) => {
    if (req.isAuthenticated()) {
        req.logout();
        console.log('loguot was called successfully')
        return res.status(200).send('Logged out successfully');
    } else {
        console.log('loguot was called failed')
        return res.status(403).send('User was not logged in');
    }
});

router.route('/status').get((req, res, next) => {
    if (req.isAuthenticated()) {
        return res.status(200).send(req.session.passport);
    } else {
        return res.status(403).send('User was not logged in');
    }
});

router.route('/user').get((req, res, next) => {
    userModel.find(req.body.username ? { username: req.body.username } : {}, (err, users) => {
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
                email: req.body.email,
                accessLevel: req.body.accessLevel || 'basic'
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

router.route('/product').get((req, res, next) => {
    if (req.isAuthenticated()) {
        productModel.find({}, (err, products) => {
            if (err) return res.status(500).send('Error in DB');
            res.status(200).send(products);
        });
    } else {
        return res.status(400).send('User is not authenticated');
    }  
}).post((req, res, next) => {
    if (req.isAuthenticated() && req.body.title) {
        productModel.findOne({ title: req.body.title }, (err, product) => {
            if (err) return res.status(500).send('Error in DB');
            if (product) {
                return res.status(400).send('Product already exists');
            }
            const newProduct = new productModel({
                title: req.body.title,
                password: req.body.password, 
                email: req.body.email,
                title: req.body.title,
                price: req.body.price || -1,
                description: req.body.description || '',
                releaseDate: req.body.releaseDate || new Date(),
                image: req.body.image || '',
                developer: req.body.developer || '',
                publisher: req.body.publisher || ''
            });
            newProduct.save((error) => {
                if (error) return res.status(500).send('Error while saving to DB');
                return res.status(200).send('Successfully added a new product to DB');
            });
        });
    } else {
        return res.status(400).send('Title is not passed or user is not authenticated');
    }
}).put((req, res, next) => {
    if (req.isAuthenticated() && req.body.title) {
        productModel.findOne({ title: req.body.title }, (err, product) => {
            if (err) return res.status(500).send('Error in DB');
            if (product) {
                product.value = req.body.value;
                product.save((error) => {
                    if(error) return res.status(500).send('Error while saving to the DB');
                    return res.status(200).send('Successfully modified product in DB');
                });
            } else {
                return res.status(400).send('No such product in DB');
            }
        });
    } else {
        return res.status(400).send('Title is not passed or user is not authenticated');
    }
});

module.exports = router;
