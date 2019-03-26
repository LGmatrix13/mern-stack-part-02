const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Listing = new Schema({
    listing_name: {
        type: String
    }, 
    listing_description: {
        type: String
    },
    listing_location: {
        type: String
    },
    listing_link: {
        type: String
    }
});

module.exports = mongoose.model('Todo', Todo);
