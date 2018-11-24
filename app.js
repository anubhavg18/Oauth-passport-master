const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
var indexRouter = require('./routes/index');
const keys = require('./config/keys');

const app = express();
var path = require('path');

//serving static files
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());


// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb');
});

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/', indexRouter);




app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});
