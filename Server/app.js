const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const multer = require('multer');
const path = require('path');

const verify = require("./verifyToken")

// Routes
const AuthRoutes = require("./Routes/AuthRoutes")
const BookRoutes = require("./Routes/BookRoutes")
const UserRoutes = require("./Routes/UserRoutes")

const app = express()
const  MONGO_URL = process.env.MONGO_URL
app.use(express.json())
// use this to read form data
app.use(express.urlencoded({ extended: true }))
app.use("/images", express.static(path.join(__dirname, "/images")));
dotenv.config()
app.use(cors())

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("Database Connected")
    })
    .catch(error => console.log(error))

// Store images in the public folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
});

const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
    res
        .status(200)
        .json("File has been uploaded");
});

app.use("/api", AuthRoutes)
app.use("/api/books", BookRoutes)
app.use("/api/users", UserRoutes)

app.listen(process.env.PORT, () => {
    console.log("Server running on port 5000")
})
