function checkCurrentUser(req, res, next) {
    if (req.isAuthenticated()) {
        // If there is already a logged-in user, prevent new login
        return res.status(400).json({ error: 'A user is already logged in from this browser.' });
    }
    next();
}


module.exports = checkCurrentUser
