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
    Book.create(req.body)
        .then(newBook => {
            res.redirect("/books")
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        })
})



module.exports = router;