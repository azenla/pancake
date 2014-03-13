var express = require("express");
var fs = require("fs");

var app = express();

function customizer(options) {
    var object = options.object ? options.object : null;
    var filename = options.filename ? options.filename : "src/pancake.js";
    var content = fs.readFileSync(filename).toString();
    var jquery = options.jquery == "true" ? true : false;
    
    if (object !== null) {
        content = content.replace('})(window, "pancake");', '})(window, "' + object + '");');
    }
    
    if (jquery) {
        content = fs.readFileSync("src/loadjquery.js").toString() + "\n\n" + content;
    }
    
    return content;
}

app.use("/pancake.js", function (req, res) {
    res.end(customizer(req.query));
});

app.use(express.query());

app.listen(8080);