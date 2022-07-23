const mongo = require('./connectmongo');
const folderEncrypt = require('folder-encrypt');
const fs = require('fs');

module.exports = function(app) {
    app.post('/share', async (req, res) => {
        await mongo.client.connect();
        const db = mongo.client.db('zanonious');
        var collection = db.collection('files');
        fs.readdir('shared/' + req.body.username, async function(err) {
            if(err) {
                res.json([{
                    "shared": false
                }]);
            } else {
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
            }
        });
    });

    app.post('/genLink', async (req, res) => {
        await mongo.client.connect();
        const db = mongo.client.db('zanonious');
        var collection = db.collection('files');
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let link = '';
        const charactersLength = characters.length;
        for ( let i = 0; i < 1000; i++ ) {
            link += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        folderEncrypt.encrypt({
            password: req.body.password,
            input: 'uploads/' + req.cookies.username + '/' + req.body.filename,
            output: 'linked/' + req.body.filename + '.encr' 
        }).catch((err) => {
            console.error(err);
        });
        await collection.findOne({"file": req.body.filename}).then(result => {
            collection = db.collection('linked');
            collection.insertOne({"username": req.cookies.username, "file": req.body.filename, "origin": result.origin, "link": link});
        });
        res.json([{
            "shared": true
        }]);
    });
}