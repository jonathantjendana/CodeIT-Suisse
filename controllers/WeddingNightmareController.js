var WeddingNightmareController = function (app) {
    app.post("/wedding-nightmare", function (req, res) {
        // POST request
        // ...
        var json = req.body;
        // console.log(json)
        // console.log("hello")
        try {
            outputArr = []

            for (i = 0; i < json.length; i++) {
                // console.log("here")
                // console.log(json[i])
                var testCase = json[i]
                console.log(i)
                var output = {
                    test_case: testCase.test_case,
                    satisfiable: "",
                    allocation: []
                }

                var satisfiable = false
                var guestNum = testCase.guests
                var tableNum = testCase.tables
                var enemies = testCase.enemies
                var allocation = []
                var guestStack = []
                for (j = guestNum; j > 0; j--) {
                    guestStack.push(j)
                }

                // console.log(guestStack)
                while (guestStack.length != 0) {
                    if (enemies.length == 0) {
                        allocation.push([guestStack.pop(), tableNum - tableNum + 1])
                    } else {
                        guestStack.pop()
                    }
                }

                if (allocation.length == 0) {
                    satisfiable = false
                } else {

                    satisfiable = true
                }
                output["satisfiable"] = satisfiable
                output["allocation"] = allocation
                // console.log(allocation)
                // console.log(output)
                outputArr.push(output)
                // console.log(JSON.stringify(outputArr))
            }
            console.log(outputArr)
            res.status(200).json(
                outputArr
            );

        } catch (err) {
            res.send(err.message);
        }
    });
}
module.exports = WeddingNightmareController;