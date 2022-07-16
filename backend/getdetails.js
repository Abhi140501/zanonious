const mongo = require('./connectmongo');

module.exports = function(app) {
    app.get('/username', async (req, res) => {
        if(req.cookies.username) {
            await mongo.client.connect();
            const db = mongo.client.db('zanonious');
            var collection = db.collection('usernames');
            var secret = null;
            var twofa = false;
            var verify = req.cookies.twofa;
            await collection.findOne({"username": req.cookies.username}).then(result => {
                secret = result.secret;
                twofa = result.twofa;
            });
            res.json([{
                "username": req.cookies.username,
                "secret": secret,
                "twofa": twofa,
                "verify": verify
            }]);
        } else {
            res.json([{
                "username": null
            }]);
        }
    });
    
    app.get('/password', (req, res) => {
        if(req.session.password) {
            res.json([{
                "password": req.session.password
            }]);
        } else {
            res.json([{
                "password": null
            }]);
        }
    });

    app.get('/files', async (req, res) => {
        if(req.cookies.username) {
            await mongo.client.connect();
            const db = mongo.client.db('zanonious');
            var collection = db.collection('files');
            var files = null;
            var array = [];
            await collection.find({"username": req.cookies.username}).toArray().then(result => {
                files = result;
                files.forEach(file => {
                    array.push(file);
                })
            });
            res.json(array);
        } else { 
            res.json([{
                "files": null
            }]);
        }
    });
}