const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner} = require("../middleware.js");
const {validateListing} = require("../middleware.js")
const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage })

const listingController = require("../controllers/listing.js")

router.route("/")
   .get(wrapAsync(listingController.index))
   .post( upload.single("listing[image]") , validateListing , wrapAsync(listingController.addNewListing));
   

router.route("/new")
   .get(isLoggedIn , listingController.newListingForm);


router.route("/:id")
   .get(wrapAsync(listingController.DetailedListing))
   .put(isLoggedIn, isOwner , upload.single("listing[image]") ,validateListing ,wrapAsync(listingController.UpdatedListing))
   .delete(isLoggedIn, isOwner, wrapAsync(listingController.DestroyListing))


router.route("/:id/edit")
   .get(isLoggedIn, isOwner , wrapAsync(listingController.editListingForm))


module.exports = router ;