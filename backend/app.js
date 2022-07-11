const express = require('express');
const app = express();
const mongo = require('./connectmongo');
const cookieParser = require('cookie-parser');
const {authenticator} = require('otplib');

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.post('/signup', async (req, res) => {
    console.log("Adding New User");
    if(req.cookies.username) {
        res.redirect('/2fa');
    } else {
        try {
            await mongo.client.connect();
            var secret = authenticator.generateSecret();
            const db = mongo.client.db('zanonious');
            var collection = db.collection('usernames');
            collection.insertOne({"username": req.body.username, "secret": secret, "2fa": false});
            console.log("Inserted Successfully!;");
            res.cookie('username', req.body.username, {maxAge: 1800000, httpOnly: true});
            res.redirect('/2fa');
        } catch(e) {
            console.error(e);
        }
    }
});

app.get('/username', async (req, res) => {
    if(req.cookies.username) {
        await mongo.client.connect();
        const db = mongo.client.db('zanonious');
        var collection = db.collection('usernames');
        var secret = null;
        await collection.findOne({"username": req.cookies.username}).then(result => {
            secret = result.secret;
        });
        res.json([{
            "username": req.cookies.username,
            "secret": secret
        }]);
    } else {
        res.json([{
            "username": null
        }]);
    }
});

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
                            "2fa": true
                        }
                    });
                res.redirect('/dashboard');
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

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on port ${PORT}`));