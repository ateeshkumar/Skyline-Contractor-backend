const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");

const multer  = require('multer');
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage});

const {isLoggedIn}=require("./middleware.js");

const listingController = require("../controllers/listings.js");

//index route and create route
router 
.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,
    upload.single('listing[image]'),validateListing,wrapAsync(listingController.createListing));

//new route
router.get("/new",isLoggedIn, listingController.renderNewForm);

//show route 
router.route("/:id")
.get(wrapAsync(listingController.showListing));


module.exports = router;