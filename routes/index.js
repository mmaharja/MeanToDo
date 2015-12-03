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
    db.toDos.insert(req.body, function (err, doc) {
        var result = createResult(err, "ERROR: New Task wasn't added. Please try again!",
            "SUCCESS: New task was added successfully!");
        res.json(result);
    });
});
router.delete('/myTodos/deleteTodo/:id', function (req, res) {
    console.log(req.params._id);
    db.toDos.remove({_id: db.ObjectId(req.params.id)}, function (err, todo) {
    });
});

router.post('/myTodos/updateStatus', function (req, res) {
    var item = req.body;
    db.toDos.findAndModify({
        query: {_id: db.ObjectId(item._id)},
        update: {$set: {isCompleted: item.isCompleted}},
        new: true
    }, function (err, doc, lastErrorObject) {
        // doc.tag === 'maintainer'
    })
    console.log("post called");
    console.log(req.body);
    var item = JSON.parse(req.body);
    db.toDos.update({_id: db.ObjectId(item._id)}, {$set: {isCompleted: item.isCompleted}});
});

function createResult(err, errorMsg, successMsg) {
    var success = false;
    var message = '';
    if (err) {
        message = errorMsg;
    }
    else {
        success = true;
        message = successMsg;
    }
    return {success: success, message: message};
}
module.exports = router;
