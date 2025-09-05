const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js");

router.route("/signup")
   .get(userController.SignUpPage)
   .post(wrapAsync(userController.SignUp))


router.route("/login")
   .get((req,res) => {
      res.render("./user/login.ejs")
    })
   .post(saveRedirectUrl , passport.authenticate("local" , {failureRedirect : "/login" , failureFlash : true}) , userController.logIn)


router.route("/logout")
   .get(userController.logOut)


module.exports = router