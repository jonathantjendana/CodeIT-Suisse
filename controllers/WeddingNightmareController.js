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
            var count = 0;
            for (var i = 0; i < n; i++) {
                //x is constant
                var x = queen["i"]
                var test = json[x][i]
                if (test == "") {
                    count++;
                }

                if (test == "X") {
                    break;
                }
            }

            for (var i = 0; i < n; i++) {
                //y is constant
                var y = queen["j"]
                var test = json[i][y]
                if (test == "") {
                    count++;
                }

                if (test == "X") {
                    break;
                }
            }

            var x = queen["i"]
            var y = queen["j"]
            for (var i = 0; i < n; i++) {
                var j = x - i;
                var k = y - i;
                try {
                    var test = json[j][k]
                    console.log(test)
                    if (test == "X") {
                        break;
                    } else if (test == "") {
                        console.log(test)
                        count++;
                    }

                } catch (ex) {

                }
            }
            for (var i = 0; i < n; i++) {
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

            for (var i = 0; i < n; i++) {
                var j = x - i;
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

            for (var i = 0; i < n; i++) {
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
