const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");


const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust'

main().then((res) => {
    console.log("Database connected")
}).catch((err) => {
    console.log(err)
});

async function main() {
    await mongoose.connect(MONGO_URL) 
}

let initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj , owner : "68b83d2690d5cf8a0f3f29f2"}))
    await Listing.insertMany(initData.data);
    console.log("database initialized")
};

initDB();

