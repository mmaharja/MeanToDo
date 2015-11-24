var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/MyToDos', function(req, res){
  var todos = [{isCompleted:true, taskDescription:"First Task", dueDate: "11/25/2015"},
    {isCompleted:false, taskDescription:"Second Task", dueDate: "11/26/2015"}];
  res.json(todos);
})
module.exports = router;
