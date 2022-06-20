// Express to set up routing
const express = require("express");
// Mongoose to communicate with MongoDB database
const mongoose = require("mongoose");
const { allowedNodeEnvironmentFlags } = require("process");

// CORS
const cors = require("cors");

// DOTENV to hold port information and MongoDB URI
require("dotenv").config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// define express server
const app = express();
// allows us to POST/PUT data on our server 
app.use(express.urlencoded({ extended: true }))
// set up body parser for JSON
app.use(express.json());
// use CORS
app.use(cors());

// HOME
app.get("/", (req, res) => {
    res.send("Hello World!")
})

// CONTROLLERS
// booksController does routing for /books
const booksController = require("./controllers/books-controller")
app.use("/books", booksController)


// start up server
app.listen(PORT, () => {
    console.log("Nomming at port: ", PORT);
})