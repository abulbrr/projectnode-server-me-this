const http      = require('http');
const fs        = require('fs');

const Request   = require('./unirequest');
const Response  = require('./uniresponse');

var uniserver = function() {
    this.endpointCollection = {
        '404': function(req,resp) {
            resp.html('page not found');
        }
    };
};

uniserver.prototype.get = function (path, callback) {
    this.endpointCollection[path] = callback;
};

uniserver.prototype.run = function (port, callback) {

    this.serverInstance = http.createServer((request, response) => {
        var path        = request.url;
        var collection  = path.split('/');
        collection.shift();

        var basePath = collection.join('/');

        console.log(basePath);

        var dotoffset = request.url.lastIndexOf('.');
        if( dotoffset != -1 ) {
            fs.readFile('./www' + request.url, function(err, data) {
                if (!err) {
                    var mimetype = getMimeType(request)[ request.url.substr(dotoffset) ];
                    response.setHeader('Content-type' , mimetype);
                    response.end(data);
                    console.log( request.url, mimetype );
            } else {
                    console.log ('file not found: ' + request.url);
                    response.writeHead(404, "Not Found");
                    response.end();
            }
            });
            return;
        }

        var requestReference    = new Request(request);
        var responseReference   = new Response(response);

        if( this.endpointCollection[basePath] != undefined ) {
            this.endpointCollection[basePath](requestReference, responseReference);
        } else {
            this.endpointCollection['404'](requestReference, responseReference);
        }
    })
    this.serverInstance.listen(port);
    callback();
};

function getMimeType(request) {
    var dotoffset = request.url.lastIndexOf('.');
    var mimetype = dotoffset == -1
                    ? 'text/plain'
                    : {
                        '.html' : 'text/html',
                        '.ico' : 'image/x-icon',
                        '.jpg' : 'image/jpeg',
                        '.png' : 'image/png',
                        '.gif' : 'image/gif',
                        '.css' : 'text/css',
                        '.js' : 'text/javascript'
                        };

    return mimetype;
}

module.exports = uniserver;