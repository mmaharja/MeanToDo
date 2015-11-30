var express = require('express');
var router = express.Router();
//var mongojs = require("mongojs").connect;
//var db = mongojs('MeanToDo',['ToDos']);
var databaseUrl = "meanToDo"; // "username:password@example.com/mydb"
var collections = ["toDos"]
var db = require("mongojs")
    .connect(databaseUrl, collections);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/MyToDos', function(req, res){
    db.ToDos.find(function (err, todos) {
        res.json(todos);
    });
    //var todos = [{isCompleted:true, taskDescription:"First Task", dueDate: "11/25/2015"},
    //  {isCompleted:false, taskDescription:"Second Task", dueDate: "11/26/2015"}];

})

router.post('/MyToDos/AddNewTask', function (req, res) {
    console.log(req.body);
    db.ToDos.insert(req.body, function (err, docs) {
        res.json(docs);
    });
})
module.exports = router;
