const passport = require('passport');
const userModel = require('../models/user');

passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}))

sessionsRouter.post('/login', passport.authenticate('local'), (req, res) => {
    res.redirect('/');
});

sessionsRouter.get('/current', (req, res) => {
   
    res.json(req.user);
});

