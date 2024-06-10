const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/info.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const Info = require("./models/info.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/Services";

main()
    .then(() => {
        console.log("Connected to DB.");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

// Middleware settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Session configuration
const sessionOptions = {
    secret: "yourSecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// Authentication routes
app.get("/login", (req, res) => {
    res.render("authentication/login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/listings/newRegis",
    if(err){
    // failureFlash: true
    req.flash("Credentials might be wrong or u r not signed up");
    failureRedirect: "/login";}
}));

app.get("/signup", (req, res) => {
    res.render("authentication/signup");
});

app.post("/signup", async (req, res, next) => {
    try {
        const { username, password,email } = req.body;
        const user = new User({ username,email });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash("success", "Welcome to Services");
            res.redirect("/listings/newRegis");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
});

app.get("/logout", (req, res, next) => {
    req.logout(err => {
        if (err) return next(err);
        req.flash("success", "Goodbye!");
        res.redirect("/");
    });
});

app.get("/listings/newRegis", (req, res) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "You need to be logged in to apply for the opportunity.");
        return res.redirect("/login");
    }
    res.render("listings/newRegis");
});

app.post("/listings/front", async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

app.get("/listings", async (req, res) => {
    const listings = await Listing.find({});
    res.render("listings/front", { listings });
});

app.get("/", (req, res) => {
    res.render("home");
});

app.listen(8080, () => {
    console.log("Server is listening on port 8080.");
});
