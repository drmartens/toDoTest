var bodyParser = require('body-parser');
var mongoose = require('mongoose');

/* MONGOOSE DATABASE SETUP ============ */

//Connect to Database
mongoose.connect('mongodb://test:test@ds137149.mlab.com:37149/todo_doc');

//Create Database Object Schema/Blueprint
var todoSchema = new mongoose.Schema({
	item: String
});

//Create at Todo Model based on the Schema stored as collection on MogoDB
var Todo = mongoose.model('Todo', todoSchema);


/* =============================== */


//dummy data 
// var data = [{item: 'Get Milk'}, {item: 'Walk Dog'}, {item: 'Code Shit'}];

//middleware for Post requests
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
	//Set up Request Handlers/Routes

	//View the Web Page
	app.get('/todo', function(req, res){
		//get data from MongoDB and pass to View
		//Specify which Mongo Collection to Get. {} is all objects in collection
		Todo.find({}, function(err, data){
			if(err) throw err;
			res.render('todo', {todos: data});
		});
	});

	//Post an Item
	app.post('/todo', urlencodedParser,  function(req, res){
		//get data from the view and add it to MongoDB
		var newToDo = Todo(req.body).save(function(err, data){
			if (err) throw err;
			res.json(data);
		});
	});

	//Delete an Item
	app.delete('/todo/:item', function(req, res){
		//Delete the requested Item from MongoDB
		//Deletes and passes back updated data
		Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
			if (err) throw err;
			res.json(data);
		});
	});

};