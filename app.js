const express = require("express");
const exprsHndlbrs = require("express-handlebars");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path"),
methodOverride = require("method-override");

const indexRouter = require("./controller/index");
const galleryRouter = require("./controller/gallery");
const emailRouter = require("./controller/mailer");
const todoRouter = require("./controller/todo");
const addressRouter = require("./controller/addressBook");

const app = express();

const mongoURI = "mongodb://localhost:27017/housekeeper";

app.use(bodyParser.json());

app.use(methodOverride("_method"));

app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", exprsHndlbrs({defaultLayout: "layout"}));
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: false}));

app.use("/", indexRouter);
app.use("/gallery", galleryRouter);
app.use("/email", emailRouter);
app.use("/todo", todoRouter);
app.use("/address", addressRouter);

app.use((req, res) => {
    res.status(404);
    res.render("errorPages/404", {layout: ""});
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    res.render("errorPages/500", {layout: ""});
});

app.set("port", (process.env.PORT || 3000));

app.listen(app.get("port"), (err) => {
    if(err) throw err;
    else console.log("App Started At Port " + app.get("port"));
});