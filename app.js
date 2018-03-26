var express = require("express");
var app = express();
var todoController = require("./controllers/todoController");

//Template Engine EJS Setup
app.set("view engine", "ejs");

//Express Static Middlewware for static files
app.use(express.static("./public"));

//Fire Controllers
todoController(app);

//listen to port
app.listen(3000);
console.log("You are listening to port 3000");