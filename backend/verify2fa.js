const mongo = require('./connectmongo');
const {authenticator} = require('otplib');

module.exports = function(app) {
    app.post('/verify', async (req, res) => {
        if(req.cookies.username) {
            await mongo.client.connect();
            const db = mongo.client.db('zanonious');
            var collection = db.collection('usernames');
            var secret = null;
            await collection.findOne({"username": req.cookies.username}).then(result => {
                secret = result.secret;
            });
            try {
                if(authenticator.check(req.body.twofa, secret)) {
                    res.cookie('twofa', req.cookies.username, {httpOnly: true});
                    res.redirect('/password');
                } else {
                    res.redirect('/2fa?verify=true&verifyError=true');
                }
            } catch(e) {
                res.redirect('/2fa?verify=true&verifyError=true');
            }
        } else {
            res.redirect('/');
        }
    });
}