const mongo = require('./connectmongo');
const folderEncrypt = require('folder-encrypt');
const fs = require('fs');

module.exports = function(app) {
    app.post('/share', async (req, res) => {
        await mongo.client.connect();
        const db = mongo.client.db('zanonious');
        var collection = db.collection('files');
        folderEncrypt.encrypt({
            password: req.body.password,
            input: 'uploads/' + req.cookies.username + '/' + req.body.filename,
            output: 'shared/' + req.body.username + '/' + req.body.filename + '.encr' 
        }).catch((err) => {
            console.error(err);
        });
        await collection.findOne({"file": req.body.filename}).then(result => {
            collection = db.collection('shared');
            collection.insertOne({"username": req.body.username, "file": req.body.filename, "shareduser": req.cookies.username, "origin": result.origin});
        });
        res.json([{
            "shared": true
        }]);
    });
}