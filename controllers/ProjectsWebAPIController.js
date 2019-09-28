/**
 * HTTP Request Methods.
 */
var path = require('path');
var projects = require(path.resolve("./apis/Projects.js")).api;
var moment = require('moment');
/* Variable 'projectsWebAPIController' is a function that is being exported when
   another file is attempting to imported it. Refer to the last line to
   have the evidence that the variable 'projectsWebAPIController' is being exported.
*/

var projectsWebAPIController = function(app) {
    app.get('/api/projects', function(req, res) {

        var projectList = [];
        Promise.resolve(projects.getAllProjects()).then(function(data) {
          console.log('-------------------------------------------');
          console.log('running the response logic : ' + data);
         // res.setHeader('Content-Type', 'application/json');
            res.status(200).json(data);
        });
    });
    app.get('/api/projects/:id', function(req, res) {
        var projectKey = req.params.id;
        Promise.resolve(projects.getOneProject(projectKey)).then(function(data) {
            console.log('-------------------------------------------');
            console.log('running the response logic : ' + data);
            // res.setHeader('Content-Type', 'application/json');
            res.status(200).json(data);
        });
    });
    app.post("/api/projects", function(req, res) {
        // POST request
        // ...
        try {

            var oneProject = {
                ['projectTitle']: req.body.projectTitle,
                ['projectStartDate']: req.body.projectStartDate,
                ['projectEndDate']: req.body.projectEndDate,
            }

            console.log(oneProject);
            projects.addOneProject(oneProject)
                .then(function(result) {res.status(200).json({ message : 'Added Project' , project : result})
            });

        } catch (err) {
            res.send(err.message);
        }
    });

    app.put("/api/projects/:id", function(req, res) {
        // Duly note that variable 'updates' is an object
          // var updates = {};
          // variable 'updates' sample -> { '/projects/-KV2qedFylLZf74tM6bz/id': '-KV2qedFylLZf74tM6bz' }
          // updates['/projects/' + key + '/id'] = key;
        var projectKey = req.params.id;
        //Do not put  ['projectId'] inside the oneProject object.
        //Definitely mess up the structure in firebase and Xamarin client will hang
        //The reason is, the projectId is not part of the project object structure
        var oneProject = {
            ['projectTitle']: req.body.projectTitle,
            ['projectStartDate']: req.body.projectStartDate,
            ['projectEndDate']: req.body.projectEndDate,

        }

        projects.updateOneProject(oneProject, projectKey)
           // .then(function(result) {res.send('Response ' + '"' + String(req.protocol + '://' + req.get('host') + req.originalUrl) + '" Result of post request: > ' + result);
            .then(function(result) {res.status(200).json({ message : 'Updated Project', project : result}),function(result){res.status(400).json({message: result})};
    });

    });
    //delete Project
    app.route('/api/projects/:id')
        .delete(function (req, res){
            var projectKey = req.params.id;
            //console.log(key);
            projects.deleteOneProject(projectKey).then(function(result){
                console.log('running');
                res.send(result);
            });
        });
    /*
    app.delete('/api/projects/:project_id', function(req, res) {
        //Play cheat with try catch. The code works in localhost but died in cloud
        try {
            var projectKey = req.params.project_id;
            console.log(projectKey);
            projects.deleteOneProject(projectKey)
            //   .then(function(result) {res.send('Response ' + '"' + String(req.protocol + '://' + req.get('host') + req.originalUrl) + '" Result of post request: > ' + result);
                .then(function (result) {
                    res.status(200).json({message: 'Deleted Project', project: result});
                });
        }catch(err){
            res.status(200).json({message: 'Deleted Project'});
        }

    });*/
}
// Exporting variable 'taskController' when external file is importing ProjectsWebAPIController.js
module.exports = projectsWebAPIController;
