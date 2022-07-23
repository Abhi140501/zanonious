const mongo = require('./connectmongo');

module.exports = function(app) {
    app.post('/download', async (req, res) => {
        await mongo.client.connect();
        const db = mongo.client.db('zanonious');
        var collection = db.collection('files');
        await collection.findOne({"file": req.body.filename}).then(result => {
            res.download('uploads/'+req.cookies.username+'/'+req.body.filename, result.origin);
        });
    });
}