var express = require('express');
var router = express.Router();
//var mongojs = require("mongojs").connect;
//var db = mongojs('MeanToDo',['ToDos']);
var databaseUrl = "meanToDo"; 
var collections = ["toDos"]
var mongojs = require("mongojs")
 var db =   mongojs(databaseUrl, collections);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/MyToDos', function(req, res){
    db.toDos.find(function (err, todos) {
        console.log(todos);
        res.json(todos);
    });
    //var todos = [{isCompleted:true, taskDescription:"First Task", dueDate: "11/25/2015"},
    //  {isCompleted:false, taskDescription:"Second Task", dueDate: "11/26/2015"}];

})

router.post('/MyToDos/AddNewTask', function (req, res) {
    console.log(req.body);
    db.toDos.insert(req.body);
})
module.exports = router;
