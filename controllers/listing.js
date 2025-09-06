const Listing = require("../models/listing.js");
const axios = require("axios");


module.exports.index =  async (req,res) => {
   const alllistings = await Listing.find({});
   res.render("./listings/Home.ejs" , {alllistings})
};

module.exports.newListingForm = (req,res) => {
   res.render("./listings/new.ejs")
};

module.exports.addNewListing = async (req , res) => { 
   let url = req.file.path;
   let filename = req.file.filename;
   let newListing =  new Listing(req.body.listing);
   newListing.owner = req.user._id;
   if(url && filename){
      newListing.image = {url , filename};
   }
   let location = req.body.listing.location;
   let URL = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
   const response = await axios.get(URL, {
    headers: { "User-Agent": "YourAppName/1.0" }
   });
   
   let lon = 0, lat = 0;
   if (response.data.length > 0) {
    lat = parseFloat(response.data[0].lat);
    lon = parseFloat(response.data[0].lon);
   };

    newListing.geometry = {
      type : "Point",
      coordinates : [lon , lat]
   }
   await newListing.save();
   
   req.flash("success" , "New listing is added!");
   res.redirect("/listings");
};


module.exports.DetailedListing = async (req ,res) => {
   let {id} = req.params;
   const listing = await Listing.findById(id).populate({path : "review" , populate : {path : "author"}}).populate("owner");
   if (!listing){
      req.flash("error" , "Listing Does not Exist");
      return res.redirect("/listings")
   }

    const plainListing = listing.toObject();
   res.render("./listings/detailed.ejs" , {listing : plainListing});
}


module.exports.editListingForm = async (req,res) => {
   let {id} = req.params;
   const listing = await Listing.findById(id);
   if (!listing){
      req.flash("error" , "Listing Does not Exist");
      return res.redirect("/listings")
   }
   
   let OriginalImageUrl = listing.image.url
   OriginalImageUrl = OriginalImageUrl.replace("/upload" , "/upload/w_250")

   res.render("./listings/edit.ejs" , {listing , OriginalImageUrl});
}

module.exports.UpdatedListing = async (req,res) => {
   let {id} = req.params;
   let listing = await Listing.findByIdAndUpdate(id , {...req.body.listing});

   if(typeof req.file !== "undefined") {
   let url = req.file.path
   let filename = req.file.filename
   listing.image = {url , filename}
   await listing.save();
   }

   req.flash("success" , "Listing is Updated!");
   res.redirect(`/listings/${id}`);
}

module.exports.DestroyListing = async (req ,res) => {
   let {id} = req.params;
   await Listing.findByIdAndDelete(id);
   req.flash("success" , "Listing is Deleted!");
   res.redirect("/listings");
}