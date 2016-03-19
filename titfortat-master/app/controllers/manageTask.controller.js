/*function status()
{
    var statusList = document.getElementById("statusList");
    document.getElementById("statusList").value=statusList.options(statusList.selectedIndex).text;
};*/

/*exports.manageTask = function(req, res) {
    var message = '';
    var tasks = require('../models/tasks.model');
    tasks.assignToMember(function(err, data) {
        if (err) {
            console.log(err.toString());
        } else if (data.length > 0) {
            message = '<table><tr><td>Task Name:</td><td>Task Description:</td><td>Status:</td><td>Assigned By:</td><td>Assigned To:</td></tr>';
            data.forEach(function(manageTask) {
                message = message + '<tr><td>' + manageTask.taskName + '</td><td>' + manageTask.taskDescription + '</td><td>' + manageTask.taskStatus + '</td><td><a href="/tasks/' + manageTask.taskmasterId + '">' + manageTask.assigner + '</a></td><td><a href="/tasks/' + manageTask.assigneeId + '">' + manageTask.assignee + '</td></tr>';
            });
            message += "</table>";
        } else {
            message = 'No tasks yet. Why not <a href="/manageTask">create</a> one?';
            res.send(message);
        }
    });
};*/


exports.getNames = function(req, res, next) {
    var taskNameList = '';

    //var db = require('../models/db.model')();
    var tasks = require('../models/tasks.model');
    

    // get list of task names
    /*db.query({
        sql: 'select * from tasks where taskName <> ?;',
        values: req.user.taskName
    },*/
    tasks.getName(function(err, results) {
        if (err) {
            console.log(err.toString());
            next(err);
        } else if (results.length > 0) {
            results.forEach(function(result) {
                taskNameList = taskNameList + '<option value="' + result.taskName + '">' + result.taskName + '</option>';
            });
        }

    res.render('manageTask', {
            title: 'Manage Task',
            
            taskNameList: taskNameList
        });
      
    });
}

exports.completeTask = function(req, res, next) {
    var tasks = require('../models/tasks.model');
    var message = '';
    if (req.user.userCredits >= 1) {
        tasks.createTask(req.body, function(err, data) {
            if (err) {
                console.log(err.toString());
                res.redirect('/getName');
            } else {
                message = '<h1>completeTask!</h1><br><table><tr><td>Task Name:</td><td>' + req.body.getName +
                   
                    '</td></tr></table>';

                tasks.useCredits(req.user, function(err, data) {
                    if (err) {
                        console.log(err.toString());
                    } else {
                        res.send(message);
                    }
                });
            }
        });
    } else {
        message = '<h1>Need at least one credit!</h1>';
        res.send(message);
    }
};