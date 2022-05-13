const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

const port = process.env.PORT || 3000;
const dbUrl = '';

mongoose.connect(dbUrl);

const whitelist = [
    'https://<project_id>.web.app', 
    'https://<project_id>.firebaseapp.com', 
    'http://localhost:4200'
];

var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin', 
    'Origin', 'Accept']
  };

app.use(cors(corsOptions));

mongoose.connection.on('connected', () => {
    console.log('Connected to DB successfully!');
});

mongoose.connection.on('error', error => {
    console.log('Error while connecting to DB!');
});

require('./user.model');
require('./product.model');
require('./order.model');
const userModel = mongoose.model('user');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({}));

passport.use('local', new localStrategy(function(username, password, done) {
    userModel.findOne({ username }, function(err, user) {
        if (err) return done('Error during query');
        if (!user) return done('No user found with this name', null);
        user.comparePasswords(password, function(err, isMatch) {
            if (err) return done(error, false);
            return done(null, user.accessLevel);
        })
    })
}));

passport.serializeUser(function(user, done) {
    if (!user) return done('User cannot sign in (serialize)');
    return done(null, user);
});

passport.deserializeUser(function(user, done) {
    if (!user) return done('User cannot sign in (deserialize)');
    return done(null, user);
});

app.use(expressSession({ secret: 'seriouslysecretthing55', resave: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/', require('./routes'));

app.listen(port, () => {
    console.log('The server is running! YAY!');
});