const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const sessions = require('express-session');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(sessions({
    secret: "thisisasecretkey12340987",
    saveUninitialized: true,
    resave: false
}));

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

require('./signup.js')(app);
require('./login.js')(app);
require('./enable2fa.js')(app);
require('./verify2fa.js')(app);
require('./setpassword.js')(app);
require('./upload.js')(app);
require('./logout.js')(app);
require('./getdetails.js')(app);
require('./share.js')(app);
require('./download.js')(app);
require('./delete.js')(app);