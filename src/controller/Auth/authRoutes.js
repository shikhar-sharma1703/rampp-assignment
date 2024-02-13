const passport = require('passport');

// Google login handler
exports.googleLogin = passport.authenticate('google', { scope: ['profile', 'email'] });

// Google callback handler
exports.googleCallback = (req, res, next) => {
    passport.authenticate('google', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/auth/google/login');
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/'); 
        });
    })(req, res, next);
};

// Logout handler
exports.logout = (req, res) => {
    req.logout( () => {
        res.redirect('/home'); 
    });
};
