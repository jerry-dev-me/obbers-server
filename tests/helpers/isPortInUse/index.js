var net = require('net')

const defaultPort = 5000
const defaultHost = '127.0.0.1'

var portInUse = function(port, callback) {
  var server = net.createServer(function(socket) {
    socket.write('Echo server\r\n')
    socket.pipe(socket)
  })

  server.listen(port, defaultHost)
  server.on('error', function(e) {
    callback(true)
  })

  server.on('listening', function(e) {
    // server.close();
    callback(false)
  })
}

module.exports = port => {
  if (port === null || port === undefined) {
    port = defaultPort
  }

  return portInUse(port, function(results) {
    console.log('\nIs port in use? ' + results)
    return results
  })
}
