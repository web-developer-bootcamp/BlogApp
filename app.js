var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var express = require("express");
var app = express();

//App config
mongoose.connect("mongodb://localhost:27017/restful_blogApp", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//Mongoose model 
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {
        type: Date,
        default: Date.now
    }
});
var Blog = mongoose.model("Blog", blogSchema); 

//Restful routes



app.listen(3000, () => console.log("Blog Server is started!"))