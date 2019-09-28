var Sentiment = require('sentiment')
var sentiment = new Sentiment();


var WeddingNightmareController = function (app) {
    app.post("/chessgame", function (req, res) {
        // POST request
        // ...
        try {
            var json = req.body;

            var n = json.length;
            var queen = {}

            var obstacles = [];

            for (var i = 0; i < n; i++) {
                for (var j = 0; j < n; j++) {
                    if (json[i][j] == "K") {
                        queen = { i, j }

                    } else if (json[i][j] == "X") {
                        var obs = { i, j };
                        obstacles.push(obs);
                    }
                }
            }
            var x = queen["i"]
            var y = queen["j"]
            
            var count = 0;
            for (var i = 1; i < n; i++) {
                //x is constant
                var j = x;
                var k = y - i;
                try {
                    var test = json[j][k]
                    if (test == "X") {
                        break;
                    } else if (test == "") {
                        count++;
                    }

                } catch (ex) {
                    break;
                }
            }
            console.log("left"+count)

            for (var i = 1; i < n; i++) {
                //x is constant
                var j = x;
                var k = y + i;
                try {
                    var test = json[j][k]

                    if (test == "X") {
                        break;
                    } else if (test == "") {
                        console.log(j +","+ k)
                        count++;
                    }

                } catch (ex) {

                }
            }
            console.log("right" + count)
            for (var i = 1; i < n; i++) {
                //y is constant
                var j = x - i;
                var k = y;
                try {
                    var test = json[j][k]

                    if (test == "X") {
                        break;
                    } else if (test == "") {
                        count++;
                    }

                } catch (ex) {

                }
            }
            console.log("upper" +count)
            for (var i = 1; i < n; i++) {
                //y is constant
                var j = x + i;
                var k = y;
                try {
                    var test = json[j][k]

                    if (test == "X") {
                        break;
                    } else if (test == "") {
                        count++;
                    }

                } catch (ex) {

                }
            }
            console.log("bottom" +count)

            for (var i = 1; i < n; i++) {
                var j = x - i;
                var k = y - i;
                try {
                    var test = json[j][k]

                    if (test == "X") {
                        break;
                    } else if (test == "") {
                        count++;
                    }

                } catch (ex) {

                }
            }
            console.log("top left" +count)
            for (var i = 1; i < n; i++) {
                var j = x + i;
                var k = y + i;
                try {
                    var test = json[j][k]
                    if (test == "X") {
                        break;
                    } else if (test == "") {
                        count++;
                    }
                } catch (ex) {

                }
            }
            console.log("right bottom" +count)
            for (var i = 1; i < n; i++) {
                var j = x - i;
                var k = y + i;
                try {
                    var test = json[j][k]
                    if (test == "X") {
                        break;
                    } else if (test == "") {
                        console.log(j)
                        console.log(k)
                        count++;
                    }
                } catch (ex) {

                }
            }
            console.log("top right" +count)
            for (var i = 1; i < n; i++) {
                var j = x + i;
                var k = y - i;
                try {
                    var test = json[j][k]
                    if (test == "X") {
                        break;
                    } else if (test == "") {
                        
                        count++;
                    }
                } catch (ex) {

                }
            }

            console.log(count);

            res.status(200).json(count);

        } catch (err) {
            res.send(err.message);
        }
    });

    app.post("/sentiment-analysis", function(req, res){
        try {
            var json = req.body;
            var reviews = json["reviews"];
            var n = reviews.length;
            var response = [];

            for(let i = 0; i < n; i++) {
                var sentence = reviews[i];
                var result = sentiment.analyze(sentence)
                // console.log(result);
                if(result.score > 0) {
                    response.push("positive")
                } else {
                    response.push("negative")
                }
            }
            res.status(200).json({
                "response" : response
            });

            // console.log(response);

        } catch(err) {
            res.send(err.message);
        }
    })

    app.post("/generateSequence", function(req, res) {
        try {
            var json = req.body;
            var modules = req.body["modules"];
            var dependencyPairs = req.body["dependencyPairs"];

            x
        } catch(err) {

        }
    })

    app.post("/exponent", function(req, res) {
        var json = req.body;
        var n = json["n"]
        var p = json["p"]

    })
    app.get("/lottery", function(req, res) {
        var lottery = [ 23, 48, 84, 97, 66, 93, 18, 100, 2, 4]
        res.status(200).send(
            lottery);
    })
}
module.exports = WeddingNightmareController;
