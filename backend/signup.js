const mongo = require('./connectmongo');
const { exec } = require('child_process');
const {authenticator} = require('otplib');

module.exports = function(app) {
    app.post('/signup', async (req, res) => {
        if(req.cookies.username) {
            res.redirect('/2fa');
        } else {
            try {
                await mongo.client.connect();
                var secret = authenticator.generateSecret();
                const db = mongo.client.db('zanonious');
                var collection = db.collection('usernames');
                collection.insertOne({"username": req.body.username, "secret": secret, "twofa": false});
                exec("mkdir uploads/" + req.body.username);
                res.cookie('username', req.body.username, {httpOnly: true});
                res.redirect('/2fa');
            } catch(e) {
                console.error(e);
            }
        }
    });
}