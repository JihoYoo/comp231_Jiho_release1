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
    tasks.getTasksByAssigner(req.user.userId, function(err, results) {
        if (err) {
            console.log(err.toString());
            next(err);
        } else if (results.length > 0) {
            // results.forEach(function(result) {
            //     // taskNameList = taskNameList + '<option value="' + result.assigneeId + '">' + result.taskName + '</option>';
            // });
            console.log("Tasks returned.");
            // console.log(results.taskId);
            
        }

    res.render('manageTask', {
            title: 'Manage Task',
            user:req.user,   //pass the user  object
            tasks: results
        });
      
    });
}

// give gredit to assignee
/*exports.getcredit = function(req, res, next) {
   
    var tasks = require('../models/tasks.model');
 
    tasks.getCredit(function(err, results) {
        if (err) {
            console.log(err.toString());
            next(err);
        } else {
                
                    tasks.getCredit = tasks.getCredit+1;
            }
        });
    
};*/



exports.completeTask = function(req, res, next) {
    var db = require('../models/db.model')();
    var tasks = require('../models/tasks.model');
    var message = '';

    tasks.awardCredits(req.body.task, req.user, function(err, data) {
        if (err) {
            console.log(err.toString());
            res.redirect('/manageTask');
        } else {
            res.redirect('/manageTask');
        //    message = '<h1>complete Task!</h1><br><table><tr><td>Task Name:</td><td>' + data.getName +
                   
                  //  '</td></tr></table>';
                    
                    // res.send(message);
        }     
    

    });
}