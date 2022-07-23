const { exec } = require('child_process');
const { resourceLimits } = require('worker_threads');
const mongo = require('./connectmongo');

module.exports = function(app) {
    app.post('/delete', async (req, res) => {
        await mongo.client.connect();
        const db = mongo.client.db('zanonious');
        var collection = db.collection('files');
        await collection.deleteOne({"file": req.body.filename});
        collection = db.collection('shared');
        await collection.deleteOne({"file": req.body.filename});
        collection = db.collection('linked');
        await collection.deleteOne({"file": req.body.filename});
        exec("shred -u uploads/" + req.cookies.username + '/' + req.body.filename);
        res.json([{
            "deleted": true
        }]);
    });

    app.post('/stopshare', async (req, res) => {
        await mongo.client.connect();
        const db = mongo.client.db('zanonious');
        var collection = db.collection('shared');
        await collection.find({"shareduser": req.cookies.username}).toArray().then(result => {
            result.forEach(file => {
                exec("shred -u shared/" + file.username + '/' + req.body.filename + '.encr');
            })
        });
        await collection.deleteMany({"file": req.body.filename});
        res.json([{
            "deleted": true
        }]);
    });

    app.post('/deletelink', async (req, res) => {
        await mongo.client.connect();
        const db = mongo.client.db('zanonious');
        var collection = db.collection('linked');
        collection.deleteOne({"link": req.body.link});
        res.json([{
            "deleted": true
        }]);
    });
}