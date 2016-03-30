var io = require('socket.io').listen(3056);

var queue = [];
var rooms = [];
var gameCounter = 1;

var clientTurnEvents = ['turn_move', 'turn_promotion', 'turn_castling', 'turn_mate', 'turn_draw'];
var serverTurnEvents = ['player_move', 'player_promotion', 'player_castling', 'player_mate', 'player_draw'];

var clientGameEndEvents = ['turnValidation_invalid', 'turnValidation_mate', 'turnValidation_draw', 'room_leave', 'disconnect'];
var serverGameEndMessages = ['invalid turn', 'mate', 'draw', 'leave', 'leave'];

var clientDisconnectEvents = ['room_leave', 'disconnect'];

console.log('Server is running...');

Array.observe(queue, function(changes) {
  if (changes[0].addedCount == 0) {
    return;
  }

  console.log('User ' + queue[changes[0].index].id + ' has been added to the queue...');
  console.log(queue.length + ' user(s) waiting...');

  if (queue.length >= 2) {
    var roomId = 'roomN' + gameCounter++;
    var whiteIndex = Math.floor(Math.random());

    // Размещение игроков в комнате и подписка на события.
    queue.splice(0,2).forEach(function(player, index) {
      var playerColour = (index == whiteIndex) ? 'white' : 'black';
      //
      player.join(roomId);
      player.emit('game_found', {
        roomID: roomId,
        color: playerColour
      });

      clientTurnEvents.forEach(function(clientEvent, eventIndex) {
        player.on(clientEvent, function(eventArgs) {
          rooms[roomId] = (clientEvent == 'turn_mate');
          eventArgs = eventArgs || {};
          eventArgs.playerColor = playerColour;
          io.sockets.in(roomId).emit(serverTurnEvents[eventIndex], eventArgs);
        });
      });

      clientGameEndEvents.forEach(function(clientEvent, eventIndex) {
        player.on(clientEvent, function(eventArgs) {
          var message = serverGameEndMessages[eventIndex];
          var winner = (message == 'mate') ? playerColour : null;

          if (winner && !rooms[roomId]) {
            message = 'invalid turn';
            winnerColor = null;
          }

          io.sockets.in(roomId).emit('game_end', {
            msg: message,
            winnerColor: winner
          });

          Object.keys(io.sockets.in(roomId).sockets).forEach(function (socketId) {
            io.sockets.connected[socketId].leave[roomId];
          });

        });
      });
    });
    //
    console.log(queue.length + ' user(s) waiting...');
  }
});

io.sockets.on('connection', function(socket) {
  console.log(socket.id + ' connected...');

  socket.on('game_find', function() {
    queue.push(socket);
    socket.removeAllListeners('game_find');

    ['game_stopFinding', 'disconnect'].forEach(function(event) {
      socket.on(event, function() {
        var queueIndex = queue.indexOf(socket);
        if (queueIndex != -1) {
          console.log('Socket' + socket + ' #' + queueIndex + ' disconnected...');
          queue.splice(queue.indexOf(socket), 1);
          console.log(queue.length + ' user(s) waiting...');
        }
      });
    });
  });

  /*
  // Отправка списка комнат.
  socket.on('roomsList_get', function() {
    socket.emit('roomsList', getRoomsList().map( function(roomId) {
      return {
        roomID: roomId,
        length: io.sockets.adapter.rooms[roomId].length
      };
    }));
  });

  // Просмотр игры.
  socket.on('room_enter', function(roomId) {
    if (getRoomsList().find(function(room) { return room == roomId; })) {
      socket.join(roomId);
      socket.on('room_leave', function() {
        socket.leave(roomId);
        socket.removeAllListeners('room_leave');
      });
    }
  });
  */
});

/*
function getRoomsList() {
  return Object.keys(io.sockets.adapter.rooms).filter( (roomId) => /^game.+/.test(roomId) );
}
*/
