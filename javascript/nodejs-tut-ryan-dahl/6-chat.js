net = require('net');

var sockets = [];

var s = net.createServer(function(socket) {
  sockets.push(socket);

  socket.on('data', function(d) {
    for(var i = 0; i < sockets.length; i++) {
      if(sockets[i] == socket) continue;
      sockets[i].write(d);
    }
  });
  socket.on('end', function() {
    var i = sockets.indexOf(socket);
    sockets.splice(i, 1);
  });
});

s.listen(8000);
