// PORT & EXPRESS & BODY-PARSER CONNECTIONS......
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const { json } = require("express");
const port = process.env.PORT || 3000;



// MongoDB DATABASE CONNECTIONS...............
const mongoose = require('mongoose');
const mongodb = require("mongodb");
const url = "mongodb+srv://Maharshi:maharshi1712@cluster0.qiicn.mongodb.net/Users?retryWrites=true&w=majority";
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb+srv://Maharshi:maharshi1712@cluster0.qiicn.mongodb.net/Users?retryWrites=true&w=majority');
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback) {
    console.log("Database connection succeeded");
});


// OTHER SETTINGS...................
app.use(bodyParser.json());
app.use(express.static("/FORM/views"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "hbs");


// Route connections of every file......
app.get("/", (req, res) => {
    res.render("index");
});
app.get("/form.hbs", (req, res) => {
    res.render("form");
});


// Submitting data into Database................
app.post("/form.hbs", function(req, res) {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var dob = req.body.dob;
    var bio = req.body.bio;

    var data = {
        "firstname": firstname,
        "lastname": lastname,
        "email": email,
        "dob": dob,
        "bio": bio
    }

    db.collection('User').insertOne(data, function(err, collection) {
        if (err) throw err;
        console.log("Record inserted Successfully");
    });
    res.redirect("/form.hbs");

});


// Showing all userdata into table.....................
app.get("/views/view.js", function(req, res) {
    res.sendFile(path.join(__dirname + "/views/view.js"));
});
app.get("/views.ejs", (req, res) => {
    mongoose.connect(url, function(err, db) {
        db.collection("User").find({}).toArray(function(err, details) {
            if (err) {
                throw err;
            } else {
                res.render("views.ejs", { records: details });
            }
        })
    })
});


// EDIT AND DELETE DATABASE DOCUMENTS.....................
app.get("/edit.ejs/:id", function(req, res) {
    res.render("edit.ejs", { id: req.params.id });
});
// EDIT
app.post("/edit.ejs/:id", function(req, res) {

        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var email = req.body.email;
        var dob = req.body.dob;
        var bio = req.body.bio;

        var data = {
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "dob": dob,
            "bio": bio
        }

        db.collection('User').updateOne({ "_id": req.params.id }, { $set: data }, { upsert: true })

        res.redirect("/views.ejs");

    })
    // DELETE
app.get("/views.ejs/delete/:id", function(req, res) {
    db.collection('User').deleteOne({ _id: new mongodb.ObjectID(req.params.id) }, function(err, result) {
        if (err) {
            console.log("failed");
            throw err;
        } else {
            db.close();
            res.redirect("/views.ejs");
        }
    })
});



app.listen(port, () => {
    console.log('HEYY');
});