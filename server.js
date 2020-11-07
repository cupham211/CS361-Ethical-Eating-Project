// Authors: Adam Kerr


var path = require('path');
var express = require('express');
var exp_handle = require("express-handlebars");
var mealData = require('./mealData');
var ingredientData = require('./ingredientData');
var userData = require('./userData')
var fs = require('fs');
var helper = require('./modules/helper.js');

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exp_handle({ defualtLayout: "main"}));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static('public'));


app.get('/', function(req, res, next) {
  console.log("Serving the Home Page");
  res.status(200);
  res.render("indexPage", {

  });
});

//These build routes are for testing, use Christines
app.get('/build', function(req, res, next) {
  console.log("Serving the Build Recipe Page");
  helper.editMeal(req, res, next, ingredientData, mealData);  
});

app.get('/buildEdit/:id', function(req, res, next){
  console.log("Serving edit recipe page");
  console.log(req.body);
  res.status(200);
  res.render("buildPage", {

  });
});
//End build routes


app.get('/saved', function(req, res, next) {
  console.log("Serving the Saved Recipes Page");
  res.status(200);
  res.render("savedPage", {

  });
});

app.get('/search', function(req, res, next) {
  console.log("serving search results");
  helper.search(req, res, next, ingredientData, mealData);
});

app.get('/browse', function(req, res, next) {
  console.log("Serving the Browse Page");
  var context = {};
  context.ingredients= ingredientData;
  context.meals = mealData;
  res.status(200);
  res.render("browsePage", context);
});

app.get('/meal', function(req, res, next){
  console.log("serving meal page");
  context = {};
  helper.mealPage(req, res, next, ingredientData, mealData);  
});

app.get('/login', function(req, res, next) {
  console.log("Serving the Login Page");
  res.status(200);
  res.render("loginPage", {

  });
});

app.get('/signup', function(req, res, next) {
  console.log("Serving the Sign Up Page");
  res.status(200);
  res.render("signupPage", {

  });
});

app.get('*', function(req, res){
  console.log("Serving the 404 Page");
  res.status(404);
  res.render('404Page', {
  });
});

app.listen(port, function(){
  console.log("Server is listening on this port: ", port);
})
