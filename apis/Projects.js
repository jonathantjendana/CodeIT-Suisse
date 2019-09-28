'use strict'
var fbFnc = module.exports = {};
var path = require('path');
var credentials = require(path.resolve('./config.js')).credentials;
var firebase = require('firebase');
//var FCM = require('fcm-push');
// Initialize the app with a service account, granting admin privileges
console.log(credentials);
firebase.initializeApp(
    credentials
    /*I leave this statement here to remind myself that I need to generate the json file in firebase*/
    //serviceAccount: require(path.resolve('./NotyMe-c749063915e6.json'))
);
// Initialize firebase database instance
var db = firebase.database();
// Server logging purpose
var dbAppRef = db.ref('app/');

// Variable to store FCM credentials
//var serverKey = config.realtime_database_cloud_messaging_key;
// Initialize of firebase cloud messaging
//var fcm = new FCM(serverKey);

fbFnc.api = {
    getAllProjects: function() {
        return new Promise((resolve, reject) => {
            var projectsRef = db.ref('/app/projects');
            var result = [];
            projectsRef.on('value', (snap) => {
                console.log(snap.val());
                snap.forEach((child) => {
                    var projectItem ={};
                    projectItem.projectId = child.getKey().toString();
                    projectItem.projectTitle = child.val().projectTitle;
                    projectItem.projectStartDate = child.val().projectStartDate;
                    projectItem.projectEndDate = child.val().projectEndDate;
                    result.push(projectItem);
            });
           });
           resolve(result);
        });
    },
    getOneProject : function(inProjectId) {
        return new Promise((resolve, reject) => {
            var projectsRef = db.ref('/app/projects/' + inProjectId);
            var result = [];


            projectsRef.on('value', (snap) => {
                //console.log(snap.key);
                var projectItem = {
                        ['projectId']:snap.key,
                        ['projectTitle']:snap.val().projectTitle,
                        ['projectStartDate']: snap.val().projectStartDate,
                    ['projectEndDate']: snap.val().projectEndDate
            };
                resolve(projectItem);
            });
        });
    },
    // Firebase Functions.
    /*
    getTask: function(user) {
        // return db.ref('/tasks/' + idtask).once('value').then(function(snapshot) {
        //     var task_title = snapshot.val().task_title;
        //     console.log(task_title);
        // });
        var result = [];
        var taskRef = db.ref('user/' + user);
        taskRef.orderByValue().on("value", function(snapshot) {
            snapshot.forEach(function(data) {
                result.push(data);
                console.log("The " + data.key + " task's id is added");
            });
        });
        return result;
    },
    */
    addOneProject: function(inProject) {
        //https://howtofirebase.com/save-and-query-firebase-data-ed73fb8c6e3a#.f54iuarzg
        return new Promise((resolve, reject) => {
            var projectRef = db.ref('/app/projects').push(inProject);
                    console.log('running1');


            projectRef.once('value').then(function(snapshot) {
                //Used the following code to see if the project node can be found.
                console.log(snapshot.val().projectTitle);
                //I made a blunder using the code snapshot.remove(....
                //I also made a blunder using the command snapshot.ref().remove
                //It should be snapshot.ref.remove
                var projectItem = {};

                projectItem.projectId = snapshot.key;
                projectItem.projectTitle = snapshot.val().projectTitle;
                projectItem.projectStartDate = snapshot.val().projectStartDate;
                projectItem.projectEndDate = snapshot.val().projectEndDate;
                console.log(projectItem);
                resolve(projectItem);
            }, function(error) {
                // Something went wrong.
                reject.error();
            });

        });
    },

    updateOneProject: function(inProject,inProjectKey) {
    //Reference: http://stackoverflow.com/questions/38923644/firebase-update-vs-set
    return new Promise((resolve, reject) => {
      var projectRef = db.ref('/app/projects/'+inProjectKey);
        projectRef.set(inProject);
        projectRef.on('value',function(snapshot){
                var projectItem = {};
                projectItem.projectId = snapshot.key;
                projectItem.projectTitle = snapshot.val().projectTitle;
                projectItem.projectStartDate = snapshot.val().projectStartDate;
                projectItem.projectEndDate = snapshot.val().projectEndDate;
                resolve(projectItem);
            });






    });
    },
    deleteOneProject: function(inKey) {
        //Reference: https://firebase.googleblog.com/2016/01/keeping-our-promises-and-callbacks_76.html
        //The following code pattern inside the Promise is all based on the above URL site
        return new Promise((resolve, reject) => {
            //var projectRef = db.ref("/app/projects").child(inKey);
            var projectRef = db.ref('/app/projects/' + inKey);
            projectRef.once('value').then(function(snapshot) {
                //Used the following code to see if the project node can be found.
                //console.log(snapshot.val().projectTitle);
                //I made a blunder using the code snapshot.remove(....
                //I also made a blunder using the command snapshot.ref().remove
                //It should be snapshot.ref.remove
                snapshot.ref.remove(function (error) {
                    if (!error) {
                        resolve('Removed project');
                    }else{
                        reject('Failed to remove project');
                    }
                });
            }, function(error) {
                // Something went wrong.
                reject.error('Unable to find the project');
            });
        });
    },
    sendNotification: function(toKey, title, description) {
      var message = {
        to: toKey, // required fill with device token or topics
        data: {
            title: title,
            body: description
        }
      };

      //promise style
     /* fcm.send(message)
          .then(function(response){
              console.log("Successfully sent with response: ", response);
          })
          .catch(function(err){
              console.log("Something has gone wrong!");
              console.error(err);
          }); */
    }
}
