const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js")

const reviewController = require("../controllers/reviews.js")

//Review
//Adding review to listing
router.post("/" , isLoggedIn , validateReview , wrapAsync(reviewController.CreateReview));

//delete review
router.delete("/:reviewId" , isReviewAuthor, wrapAsync(reviewController.DeleteReview))


module.exports = router;