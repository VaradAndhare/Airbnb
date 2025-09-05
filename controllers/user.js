const User = require("../models/user.js");

module.exports.SignUpPage = (req , res ) => {
    res.render("./user/signup.ejs")
}

module.exports.SignUp = async (req , res) => {
    try{
    let {username , email , password} = req.body;
    let newUser = new User ({username, email})   
    const registeredUser = await User.register(newUser , password)
    req.login(registeredUser , (err) => {
        if (err) {
            return next(err)
        }
        req.flash("success" , "Welcome to Wonderlust")
        res.redirect("/listings")
    })
    }catch (e){
        req.flash("error" , e.message)
        res.redirect("/signup")
    }
    
}


module.exports.logIn = async (req , res) => {
    req.flash("success" , "Welcome Back to Wonderlust!")
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl)
}

module.exports.logOut = (req ,res ,next) => {
    req.logOut((err) => {
        if(err) {
            return next(err)
        }
        req.flash("success" , "You are logged Out!");
        res.redirect("/listings")
    })
}