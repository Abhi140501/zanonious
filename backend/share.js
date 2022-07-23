const mongo = require('./connectmongo');

module.exports = function(app) {
    app.post('/share', async (req, res) => {
        await mongo.client.connect();
        const db = mongo.client.db('zanonious');
        var collection = db.collection('shared');
        await collection.insertOne({"username": req.body.username, "file": req.body.filename, "shareduser": req.cookies.username});
        res.json([{
            "shared": true
        }]);
    });
}