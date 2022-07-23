const mongo = require('./connectmongo');
const folderEncrypt = require('folder-encrypt');

module.exports = function(app) {
    app.post('/download', async (req, res) => {
        await mongo.client.connect();
        const db = mongo.client.db('zanonious');
        var collection = db.collection('files');
        await collection.findOne({"file": req.body.filename}).then(result => {
            res.download('uploads/'+req.cookies.username+'/'+req.body.filename, result.origin);
        });
    });

    app.post('/downloadshare', async (req, res) => {
        await mongo.client.connect();
        const db = mongo.client.db('zanonious');
        var collection = db.collection('shared');
        await collection.findOne({"file": req.body.filename, "username": req.cookies.username}).then(result => {
            folderEncrypt.decrypt({
                password: req.body.password,
                input: 'shared/' + req.cookies.username + '/' + req.body.filename +'.encr',
                output: 'shared/' + req.cookies.username + '/downloading/' + req.body.filename
            }).then(() => {
                res.download('shared/'+req.cookies.username+'/downloading/' +req.body.filename, result.origin);
            }).catch((err) => {
                res.redirect('/dashboard?error=true');
            });
        });
    });
}