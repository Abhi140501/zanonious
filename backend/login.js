const mongo = require('./connectmongo');

module.exports = function(app) {
    app.post('/login', async (req, res) => {
        if(req.cookies.username) {
            res.redirect('/2fa');
        } else {
            try {
                await mongo.client.connect();
                const db = mongo.client.db('zanonious');
                var collection = db.collection('usernames');
                collection.findOne({"username": req.body.username}).then(result => {
                    if(result) {
                        res.cookie('username', req.body.username, {httpOnly: true});
                        res.redirect('/2fa?verify=true');
                    } else {
                        res.redirect('/home?login=false');
                    }
                });
            } catch(e) {
                console.error(e);
            }
        }
    });
}