const   http    = require('http'),
        url     = require('url'),
        fs      = require('fs')

const   port    = 8000,
        root    = 'public',
        index   = 'index.html'

http.createServer(function (request, response) {
    let path = url.parse(request.url).pathname
    if (path === '/') {
        path += index
    }

    fs.readFile(root + path, function (err, data) {
        const log = '[' + (new Date()).toISOString() + ' GET] ' + path

        if (err) {
            console.error(log)
            response.writeHead(404)
        } else {
            console.info(log)
            response.writeHead(200).write(data)
        }

        response.end()
    })
}).listen(port)