const bodyParser    = require("body-parser"),
      express       = require("express"),
      morgan        = require("morgan"),
      path          = require("path"),
      rfs           = require("rotating-file-stream"),
      compression   = require("compression"),
      config        = require("./config"),
      routes        = require("./routes");

let fs      = require('fs'),
    logDir  = path.join(__dirname, config.logDir);

//check for 'logs' directory
fs.access( logDir, (err) => {
    if(err) {
        fs.mkdirSync(logDir);
    }
});

// initialixe express instance and log rotation
let app             = express(),
    accessLogStream = rfs.createStream( 'access.log', {
        'interval'  : '1d',
        'path'      : logDir
    });

// setup views and pathing
app.set( 'view engine', 'html' );
app.set( 'views', path.join(__dirname, 'public') );

// serve static content 
app.use( express.static(path.join(__dirname, 'public')) );
app.use( express.static(path.join(__dirname, 'node_modules')) );

//setup middleware
app.use( morgan('dev', { stream : accessLogStream}) );
app.use( compression() );
app.use( bodyParser.urlencoded({
    'extended' : false,
    'limit'    : '20mb'
}) );
app.use( bodyParser.json( {'limit' : '20mb'} ));

// pass app to routes
routes( app );

app.listen( config.port, () => {
    console.log( 'Now listening on port ', config.port);
});
