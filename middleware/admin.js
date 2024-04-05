module.exports = function(req,res,next){
    //401 for authorized
    // forbidden
    if(!req.user.isAdmin) return res.status(403).send('access denied');
    next();
}