const Listing = require("./models/info");

module.exports.isLoggedIn =(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You need to be logged in first to fill the form!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req,res,next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async(req,res,next) => {
    let {id}= req.params;
    let listing = await Listing.findById(id);
    console.log(listing);
    if(!listing.owner.equals(res.locals.currUser._id)){
        res.flash("error","You are not signed in.");
        return res.redirect(`/listings/${id}`);
    }
    next();
};