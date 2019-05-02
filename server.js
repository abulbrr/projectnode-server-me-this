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


server.get('orders', function(req,res) {
    let file = fs.readFileSync('./www/orders.html');
    res.html(file);

});

server.run(PORT, function() {
    console.log(`Server already started on port ${PORT}`)
})