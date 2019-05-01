const uniserver = require('./uniserver');
const fs        = require('fs');
const PORT      = 3000;

var server = new uniserver();

server.get ('menu', function(req, res) {
    let file = fs.readFileSync('./www/menu.html');
    res.html(file);
})

server.get('home', function(req, res) {
    res.html('This is home page');
})


server.get('sell', function(req,res) {
    res.html("Sell me some tickets babe");

});

server.run(PORT, function() {
    console.log(`Server already started on port ${PORT}`)
})