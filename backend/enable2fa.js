const mongo = require('./connectmongo');
const {authenticator} = require('otplib');

module.exports = function(app) {
    app.post('/enable', async (req, res) => {
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
                    await collection.updateOne({username: req.cookies.username},
                        {
                            $set: {
                                "twofa": true
                            }
                        });
                    res.cookie('twofa', req.cookies.username, {httpOnly: true});
                    res.redirect('/password');
                } else {
                    res.redirect('/2fa?error=true');
                }
            } catch(e) {
                res.redirect('/2fa?error=true');
            }
        }else {
            res.redirect('/');
        }
    });
}