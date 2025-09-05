const mongoose = require("mongoose");
const { listingSchema } = require("../schema");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");

let ListingSchema = new Schema({
    title: {
        type : String,
        required : true
    },
    description : String,
    image: {
        url : String,
        filename : String
    },
 
    price : {
        type : Number,
        default : 0

    },
    location : String,
    geometry : {
        type : {
            type : String,
            enum : ["Point"],
            required : true
        },
        coordinates : {
            type : [Number],
            required : true
        }
    },
    country : String,
    review : [
        {
            type : Schema.Types.ObjectId,
            ref : "Reviews"
        }
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
})


ListingSchema.post("findOneAndDelete" , async (listing) => {
    if(listing) {
        await Review.deleteMany({_id : {$in : listing.review }})
    }
   
})

const Listing = mongoose.model("Listing" , ListingSchema)
module.exports = Listing;