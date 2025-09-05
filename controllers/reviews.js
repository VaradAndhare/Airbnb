const Listing = require("../models/listing.js");
const Reviews = require("../models/reviews.js");

//To Create Review
module.exports.CreateReview = async (req ,res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Reviews(req.body.review) ;
    newReview.author = req.user._id
    listing.review.push(newReview);

    await newReview.save()
    await listing.save()
    req.flash("success" , "New review is added!");
    res.redirect(`/listings/${listing.id}`);
}

//To Delete Review
module.exports.DeleteReview = async (req ,res) => {
    let {id , reviewId} = req.params;
    await Listing.findByIdAndUpdate(id , {$pull : {review : reviewId }})
    await Reviews.findByIdAndDelete(reviewId)
    req.flash("success" , "Review is Deleted!");
    res.redirect(`/listings/${id}`)
}