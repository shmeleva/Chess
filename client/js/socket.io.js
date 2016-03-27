var socket = null;

var initSocket = function() {
  socket = io('http://localhost:3056');
  window.socket = socket;
};

var bindSocketEvents = function() {
  //socket.on('roomsList', onRoomListReceived );
  socket.on('game_found', onNewGameCreated );
  socket.on('player_move', onPlayerMove );
  socket.on('player_castling', onPlayerCastling );
  socket.on('player_promotion', onPlayerPromotion);
  socket.on('player_mate', onPlayerCheckmate );
  socket.on('player_draw', onPlayerStalemate);
  socket.on('game_end', onEndOfGame);
};

// Raising events...

/*

var subscribe = function() {
  socket.emit('roomsList_subscribe', {});
}

var unsubscribe = function() {
  socket.emit('roomsList_unsubscribe', {});
}

var enterRoom = function(roomId) {
  socket.emit('room_enter', {
    roomID: roomId
  });
};

*/

var leaveRoom = function(roomId) {
  socket.emit('room_leave', {});
};

var startNewGame = function() {
  socket.emit('game_find', {});
};

var quitQuery = function() {
  socket.emit('game_stopFinding', {});
}

var endGame = function() {
  if (isMate()) {
    gameEventArgs.event = isCheck() ? 'turn_mate' : 'turn_draw';
    gameEventArgs.emit();
    //
    return true;
  }
  return false;
};

var gameEventArgs = {
  event: 'turn_move',
  from: 0,
  to: 0,
  promotion: '',
  //
  emit: function() {
    console.log('emit: ' + this.event);
    socket.emit(this.event, this.toJson());
    this.reset();
  },
  //
  toJson: function() {
    switch (this.event) {
      case 'turn_move':
        return {
          from: convertFromIndex(this.from),
          to: convertFromIndex(this.to),
        };
      case 'turn_castling':
        return {
          from: convertFromIndex(this.from),
        };
      case 'turn_promotion':
        return {
          from: convertFromIndex(this.from),
          to: convertFromIndex(this.to),
          newPiece: convertFromUnicode(this.promotion),
        };
      case 'turn_mate':
      case 'turn_draw':
        return {};
    }
  },
  //
  reset: function() {
    this.event = 'turn_move';
    this.from = this.to = 0;
    this.promotion = '';
  }
};

// Handling events...

/*
var onRoomListReceived = function(data) {
  console.log('onRoomListReceived: ' + data);
};
*/

var onNewGameCreated = function(data) {
  var reversed = (data.color == 'black');
  //
  initializeChessboard(reversed);
  enableDragAndDrop();
  //
  if (!reversed) {
    enablePlayer();
    playerMove_Flag = true;
  }
  else {
    switchPlayer();
    playerMove_Flag = false;
  }
};

var onPlayerMove = function(data) {
  if (!playerMove_Flag && (data.playerColor + '-piece') == ally) {
    cached_Flag || cacheMoves();
    //
    var from = convertFromCoordinate(data.from.x, data.from.y);
    var to = convertFromCoordinate(data.to.x, data.to.y);
    //
    if (chessboard[from] == undefined || chessboard[from].moves.indexOf(to) == -1) {
      socket.emit('turnValidation_invalid', {});
      return;
    }
    //
    makeEnPassantCapture(to);
    updateJustMovesPawn(from, to);
    move(getPiece(from), getSquare(to), from, to);
    //
    clearCache();
    switchPlayer();
  }
};

var onPlayerCastling = function(data) {
  var colour = data.playerColor + '-piece';
  //
  if (!playerMove_Flag && colour == ally) {
    cached_Flag || cacheMoves();
    //
    var king = find(colour, 'king');
    var rook = convertFromCoordinate(data.from.x, data.from.y);
    //
    castlingIndex = castling_rooks.indexOf(rook);
    //
    if (castlingIndex == -1) {
      socket.emit('turnValidation_invalid', {});
      return;
    }
    //
    var castlingMove = castling_kingMoves[castlingIndex];
    //
    updateJustMovesPawn(king, castlingMove);
    move(getPiece(king), getSquare(castlingMove), king, castlingMove);
    castle(castlingMove);
    //
    clearCache();
    switchPlayer();
   }
};

var onPlayerPromotion = function(data) {
  if (!playerMove_Flag  && (data.playerColor + '-piece') == ally) {
    cached_Flag || cacheMoves();
    //
    var from = convertFromCoordinate(data.from.x, data.from.y);
    var to = convertFromCoordinate(data.to.x, data.to.y);
    var promotion = convertFromString(data.playerColor, data.newPiece);
    //
    if (chessboard[from] == undefined ||
        chessboard[from].moves.indexOf(to) == -1 ||
        promotion == undefined) {
      socket.emit('turnValidation_invalid', {});
      return;
    }
    //
    updateJustMovesPawn(from, to);
    move(getPiece(from), getSquare(to), from, to);
    promoteOpponent(to, promotion); // еще проверка! Вернуть return value.
    //
    clearCache();
    switchPlayer();
  }
};

var onPlayerCheckmate = function() {
  if (!playerMove_Flag) {
    cached_Flag || cacheMoves();
    //
    var answer = isCheckmate() ? 'turnValidation_mate' : 'turnValidation_invalid';
    socket.emit(answer, {});
    //
    clearCache();
  }
};

var onPlayerStalemate = function() {
  if (!playerMove_Flag) {
    cached_Flag || cacheMoves();
    //
    var answer = isStalemate() ? 'turnValidation_draw' : 'turnValidation_invalid';
    socket.emit(answer, {});
    //
    clearCache();
  }
};

var onEndOfGame = function(data) {
  initGameEndPopup(convertMessage(data.winnerColor, data.msg));
};
