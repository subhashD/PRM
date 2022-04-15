const addUserData = (req, res, next) => {
    if (req.user) {
        req.body.userId = req.user._id;
        next();
    } else {
        // return unauthorized
        res.send(401, "Unauthorized");
    }
}

module.exports = addUserData;