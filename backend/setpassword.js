const { exec } = require('child_process');
const folderEncrypt = require('folder-encrypt');
const fs = require('fs');

module.exports = function(app) {
    app.post('/setPassword', (req, res) => {
        if(req.cookies.username) {
            fs.readdir('uploads/' + req.cookies.username, function(err, files) {
                if(err) {
                    console.error(err);
                } else {
                    if(!files.length) {
                        if(fs.existsSync('uploads/' + req.cookies.username + '.encr')) {
                            folderEncrypt.decrypt({
                                password: req.body.password,
                                input: 'uploads/' + req.cookies.username + '.encr',
                                output: 'uploads/' + req.cookies.username
                            }).then(() => {
                                req.session.password = req.body.password;
                                exec("shred -u uploads/" + req.cookies.username + '.encr');
                                res.redirect('/dashboard');
                            }).catch((err) => {
                                res.redirect('/password?error=true');
                            });
                        } else {
                            req.session.password = req.body.password;
                            res.redirect('/dashboard');
                        }
                    } else {
                        req.session.password = req.body.password;
                        res.redirect('/dashboard');
                    }
                }
            });
        } else {
            res.redirect('/');
        }
    });
}