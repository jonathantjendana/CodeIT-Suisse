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
            console.log(x + ","+y)
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
}
module.exports = WeddingNightmareController;
