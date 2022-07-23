const { exec } = require('child_process');
const mongo = require('./connectmongo');

module.exports = function(app) {
    app.post('/delete', async (req, res) => {
        await mongo.client.connect();
        const db = mongo.client.db('zanonious');
        var collection = db.collection('files');
        await collection.deleteOne({"file": req.body.filename});
        collection = db.collection('shared');
        await collection.deleteOne({"file": req.body.filename});
        exec("shred -u uploads/" + req.cookies.username + '/' + req.body.filename);
        res.json([{
            "deleted": true
        }]);
    });
}