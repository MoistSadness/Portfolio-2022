/*  NEED TO INSTALL DOTENV
if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
*/

// Dependencies here
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const portfolioData = require("./Public/Data/portfolioData.json")

//Connect to database
mongoose.connect("mongodb://localhost:27017/YelpCamp", {
    useNewURLParser: true,
    //createUserIndex: true,        // Not supported in mongoose?
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
});

// Initialize application
const app = express();

//Middleware
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Views"));
app.use(express.static(path.join(__dirname, "Public")));


/***************************************************
GET Request for Homepage */
app.get("/", (req, res) => {
    res.render("Portfolio/home", {portfolioData});
})

/***************************************************
GET Request for Resume */
app.get("/resume", (req, res) => {
    res.render("Portfolio/resume", {portfolioData});
})
  
/***************************************************
GET Request for Projects 
* Page shows a list of all projects
*/
app.get("/projects", (req, res) => {
    res.render("Portfolio/projectIndex", {portfolioData});
})
  
/***************************************************
GET Request for individual Project 
* Details page for a specific project
*/
app.get("/project/:id", (req, res) => {
    projectData = portfolioData.portfolio[req.params.id]
    console.log(projectData)
    res.render("Portfolio/project", {projectData});
})
  
/***************************************************
GET Request for About */
app.get("/about", (req, res) => {
    res.render("Portfolio/about", {portfolioData});
})

/***************************************************
Set up app listener*/
const port = 5000
app.listen(port, () => {
    console.log("Listening on port ", port);
})