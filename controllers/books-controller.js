// Define a new router (/books)
const express = require("express");
const router = express.Router();

// Link to the MongoDB collection Book
const Book = require("../models/book");

// Book Index (gets all books)
router.get("/", (req, res) => {
    Book.find()
        .then(foundBooks => {
            res.json(foundBooks)
        })
        .catch(err => {
            console.log("error: ", err);
            res.status(500).send(err);
        })
})

// Update Book
router.put("/:id", (req, res) => {
    Book.findByIdAndUpdate(req.params.id, req.body)
        .then(updatedBook => {
            res.redirect("/books");
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        })
})

router.delete("/:id", (req, res) => {
    Book.findByIdAndDelete(req.params.id)
        .then(foundBook => {
            res.send("book was deleted!");
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        })
})

router.post("/", (req, res) => {
    console.log(req.body);
    Book.create(req.body)
        .then(newBook => {
            console.log(newBook)
            res.send(newBook)
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        })
})

// seed data
router.get('/seed', (req, res) => {
    Book.insertMany([{
        "title": "The Shinobi Initiative",
        "description": "The reality-bending adventures of a clandestine service agency in the year 2166",
        "year": 2014,
        "quantity": 10,
        "imageURL": "https://imgur.com/LEqsHy5.jpeg"
      },
      {
        "title": "Tess the Wonder Dog",
        "description": "The tale of a dog who gets super powers",
        "year": 2007,
        "quantity": 3,
        "imageURL": "https://imgur.com/cEJmGKV.jpg"
      },
      {
        "title": "The Annals of Arathrae",
        "description": "This anthology tells the intertwined narratives of six fairy tales.",
        "year": 2016,
        "quantity": 8,
        "imageURL": "https://imgur.com/VGyUtrr.jpeg"
      },
      {
        "title": "Wâˆ€RP",
        "description": "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
        "year": 2010,
        "quantity": 4,
        "imageURL": "https://imgur.com/qYLKtPH.jpeg"
      }])
        .then(res.status(200).json({
            message: 'Seed successful'
        }))
        .catch(res.status(400).json({
            message: 'Seed unsuccessful'
        }))
})

// Single Book Index (gets one book)
router.get("/:id", (req, res) => {
    Book.findById(req.params.id)
        .then(foundBook => {
            res.json(foundBook)
        })
        .catch(err => {
            res.status(500).send(err);
        })
})



module.exports = router;