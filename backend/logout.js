const { exec } = require('child_process');
const folderEncrypt = require('folder-encrypt');

module.exports = function(app) {
    app.post('/logout', (req, res) => {
        if(req.cookies.username) {
            if(req.session.password) {
                folderEncrypt.encrypt({
                    password: req.session.password,
                    input: 'uploads/' + req.cookies.username,
                    output: 'uploads/' + req.cookies.username + '.encr'
                }).then(() => {
                    exec('shred -u uploads/' + req.cookies.username + '/*');
                    exec('shred -u shared/' + req.cookies.username + '/downloading/*');
                    res.clearCookie("username");
                    res.clearCookie("twofa");
                    res.redirect('/');
                    req.session.destroy();
                }).catch((err) => {
                    console.error(err);
                });
            } else {
                res.redirect('/password');
            }
        } else {
            res.redirect('/');
        }
    });
}