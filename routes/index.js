var express = require('express');
var router = express.Router();
//var mongojs = require("mongojs").connect;
//var db = mongojs('MeanToDo',['ToDos']);
var databaseUrl = "meanToDo";
var collections = ["toDos"]
var mongojs = require("mongojs")
var db = mongojs(databaseUrl, collections);
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/myTodos', function (req, res) {
    db.toDos.find(function (err, todos) {
        if(err){
            var result = createResult(err,"Couldn't get todo list.", "");
            res.json(result);
        }
        else{
            console.log(todos);
            res.json(todos);
        }

    });
});

router.post('/myTodos/addNewTodo', function (req, res) {
    console.log(req.body);
    db.toDos.insert(req.body, function (err, todo) {
        var result = createResult(err,
            "'"+todo.taskDescription+"' wasn't added. Please try again!",
            "'"+todo.taskDescription+"' was added successfully!", todo);
        res.json(result);
    });
});
router.delete('/myTodos/deleteTodo/:id', function (req, res) {
    db.toDos.remove({_id: db.ObjectId(req.params.id)}, function (err, todo) {
        var result = createResult(err,
            "Unable to delete.",
            "Task was deleted from list", todo);
   res.json(result);
    });
});

router.post('/myTodos/updateStatus', function (req, res) {
    var item = req.body;
    db.toDos.findAndModify({
        query: {_id: db.ObjectId(item._id)},
        update: {$set: {isCompleted: item.isCompleted}},
        new: true
    }, function (err, todo) {
        var taskDesc = todo.taskDescription;
        var result = createResult(err,"failed to update task '" +taskDesc + "'", "'"+ taskDesc +"' updated", null);
        console.log(result);
        res.json(result);
    });
    //console.log(req.body);
    //var item = JSON.parse(req.body);
    //db.toDos.update({_id: db.ObjectId(item._id)}, {$set: {isCompleted: item.isCompleted}});
});

function createResult(err, errorMsg, successMsg, todo) {
    var success = false;
    var message = '';
    var todoOut ={};
    if (err) {
        message = "ERROR!! " + errorMsg;
    }
    else {
        success = true;
        message = "SUCCESS!! " + successMsg;
        if(todo != null){
            todoOut = todo;
        }
    }
    return {success: success, message: message, todo: todoOut};
}
module.exports = router;
