const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const listingRoutes = express.Router();
const PORT = 4000;

let Listing = require('./listing.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/listings', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

listingRoutes.route('/').get(function(req, res) {
    Listing.find(function(err, listings) {
        if (err) {
            console.log(err);
        } else {
            res.json(listing);
        }
    });
});

listingRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Listing.findById(id, function(err, listing) {
        res.json(listing);
    });
});

listingRoutes.route('/add').post(function(req, res) {
    let listing = new listing(req.body);
    listing.save()
        .then(listing => {
            res.status(200).json({'listing': 'listing added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new listing failed');
        });
});

listingRoutes.route('/update/:id').post(function(req, res) {
    listing.findById(req.params.id, function(err, listing) {
        if (!listing)
            res.status(404).send('data is not found');
        else
            listing.listing_description = req.body.lisiting_description;
            listing.listing_location = req.body.listing_location;
            listing.listing_link = req.body.listing_link;

            listing.save().then(listing => {
                res.json('Listing updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

app.use('/Listings', todoRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
