//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const { auth } = require('express-openid-connect');
require("dotenv").config()
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SEC,
  baseURL:  process.env.BAS,
  clientID:  process.env.CID,
  issuerBaseURL: process.env.ISSUE
};

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(auth(config));



mongoose.connect('mongodb+srv://Abhiram_royals:jfmamjjasond@cluster0.khkndxp.mongodb.net/reviewDB');

const reviewSchema = new mongoose.Schema({
  subhead: String,
  para: String
});

const Review = mongoose.model("Review",reviewSchema);

const item1 = new Review({
  subhead : "Your favorite anime",
  para:"dbhakjwfahfjghjerghjkahnvnf;jhjhfjkafhujhfkjsdfhuwehfnjhfuiowehfahsdfjehf dfhjadfja fhngvrhuiosdajiosuhdfjghaj vharjhffjk fuohuihvjsd hsduhufhasjdfherfhuiosdhfawehfuhdfuehfsdhfuwefhsdfweuiofhasdhf asufhsjdifheuifhajsdhfuerwhfalksdjfh uhsdfherfheru fudfhafh fgoirjhgodifjaie fhweifhasdof jawofa  a quivj berown foisx jui[ao ove the lazt fox"
});



app.get("/",function(req,res){
 if( req.oidc.isAuthenticated() === true){  
  Review.find({}, function(err,founditems){
if(founditems.length === 0)
{item1.save();
res.redirect("/");}
else{
  
res.render("home",{ejs : homeStartingContent , ejs2:founditems , ejs3: req.oidc.isAuthenticated() });}
  });
} else res.render("hero",{ejs :req.oidc.isAuthenticated() }); 
});

app.get("/about",function(req,res){
  res.render("about",{ejs : aboutContent,ejs3: req.oidc.isAuthenticated()});
});


app.get("/contact",function(req,res){
  res.render("contact",{ejs : contactContent, ejs3: req.oidc.isAuthenticated()});
});

app.get("/compose",function(req,res){
  res.render("compose",{ejs3: req.oidc.isAuthenticated()});
  
});

app.post("/compose",function(req,res){
  
  const info = new Review({
    subhead :req.body.composedtext,
    para:req.body.postInfo 
  });
  info.save();
  res.redirect("/");
});


app.get("/posts/:postName",function(req,res){
  const newUrl = req.params.postName;
  Review.findOne({subhead: newUrl},function(err,foundOne){
    if(err) console.log(err);
    else {
      res.render("post",{ejs : foundOne.subhead, ejs2:foundOne.para});
  
    }
  })
  
  });







app.listen(3000, function() {
  console.log("Server started on port 3000");
});
