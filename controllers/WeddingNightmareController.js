var WeddingNightmareController = function(app) {
    app.post("/api/wedding-nightmare", function(req, res) {
        // POST request
        // ...
        try {
            res.status(200).json({ message : 'Success'});

        } catch (err) {
            res.send(err.message);
        }
    });
}
module.exports = WeddingNightmareController;
