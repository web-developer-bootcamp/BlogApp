var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var express = require("express");
var app = express();

//App config
mongoose.connect('mongodb://localhost:27017/restful_blogApp', { useNewUrlParser: true, useUnifiedTopology: true });
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

// Blog.create({
// title: "Test Blog",
// image: "https://cdn.pixabay.com/photo/2015/03/26/09/54/pug-690566_960_720.jpg",
// body: "Hello dog post!"
// });

//Restful routes
app.get("/blogs", function (req, res) {
    Blog.find({}, function (err, blogs) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", { blogs: blogs });
        }
    });
});

//From page
app.get("/blogs/new", function (req, res) {
    res.render("new");
});

//Create new blog
app.post("/blogs", function (req, res) {
    var blog = req.body.blog;

    Blog.create(blog, function (err, newBlog) {
        if (err) {
            console.log(err)
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
});

//Show
app.get("/blogs/:id", function (req, res) {
    var id = req.params.id;
    Blog.findById(id, function (err, foundBlog) {
        if (err) {
            console.log(err);
            res.redirect("/blogs");
        } else {
            res.render("show", { blog: foundBlog });
        }
    });
});


app.get("/", (req, res) => res.redirect("blogs"));

app.listen(3000, () => console.log("Blog Server is started!"));