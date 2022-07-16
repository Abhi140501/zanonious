const multer = require('multer');
const mongo = require('./connectmongo');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/" + req.cookies.username);
    },
    filename: async function(req, file, cb) {
        var filename = file.fieldname + "-" + Date.now();
        var origin = file.originalname;
        cb(null, filename);
        await mongo.client.connect();
        const db = mongo.client.db('zanonious');
        var collection = db.collection('files');
        collection.insertOne({"username": req.cookies.username, "file": filename, "origin": origin});
    }
});

var upload = multer({
    storage: storage
}).single("file");

module.exports = function(app) {
    app.post('/upload', (req, res) => {
        if(req.cookies.username) {
            upload(req, res, function(err) {
                if(err) {
                    console.error(err);
                } else {
                    res.redirect('/dashboard');
                }
            });
        } else {
            res.redirect('/');
        }
    });
}