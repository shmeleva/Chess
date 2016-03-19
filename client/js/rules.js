var cached_Flag = false;

var cacheMoves = function() {
  find(ally).forEach(function(piece, index, allies) {
    if (chessboard[piece]) {
      chessboard[piece].moves = getMoves(piece, true);;
    }
  });
  //
  cached_Flag = true;
};

var clearCache = function() {
  chessboard.forEach(function(piece, index, board) {
    if (piece) {
      piece.moves = [];
    }
  });
  //
  cached_Flag = false;
};

var getMoves = function(index, filter) {
  var position = new Coordinates(index);
  //
  switch (chessboard[index].view) {
    case '♔': case '♚':
      return getKingMoves(position, [], filter);
    case '♕': case '♛':
      return getQueenMoves(position, [], filter);
    case '♖': case '♜':
      return getRookMoves(position, [], filter);
    case '♗': case '♝':
      return getBishopMoves(position, [], filter);
    case '♘': case '♞':
      return getKnightMoves(position, [], filter);
    case '♙': case '♟':
      return getPawnMoves(position, chessboard[index].colour == player ? -1 : 1, [], filter);
  }
};

var getEnemyMoves = function(index) {
  toggleColors();
  var enemyMoves = getMoves(index, false);
  toggleColors();
  //
  return enemyMoves;
}

var getKingMoves = function(position, moves, filter) {
  var shifts = [
    { row: -1, column: -1 },
    { row: -1, column: 0 },
    { row: -1, column: 1 },
    { row: 0, column: -1 },
    { row: 0, column: 1 },
    { row: 1, column: -1 },
    { row: 1, column: 0 },
    { row: 1, column: 1 }
  ];
  //
  shifts.forEach(function(shift, index, array) {
    tryPushShift(position, shift.row, shift.column, moves, filter);
  });
  //
  addCastlingMove(position, moves, filter);
  //
  return moves;
};

var getQueenMoves = function(position, moves, filter) {
  getRookMoves(position, moves, filter);
  getBishopMoves(position, moves, filter);
  //
  return moves;
};
//
var getRookMoves = function(position, moves, filter) {
  var shifts = [
    { row: -1, column: 0 },
    { row: 1, column: 0 },
    { row: 0, column: -1 },
    { row: 0, column: 1 }
  ];
  //
  shifts.forEach(function(shift, index, array) {
    for (var i = 1; tryPushShift(position, i * shift.row, i * shift.column, moves, filter); i++);
  });
  //
  return moves;
};

var getBishopMoves = function(position, moves, filter) {
  var shifts = [
    { row: -1, column: -1 },
    { row: -1, column: 1 },
    { row: 1, column: 1 },
    { row: 1, column: -1 }
  ];
  //
  shifts.forEach(function(shift, index, array) {
    for (var i = 1; tryPushShift(position, i * shift.row, i * shift.column, moves, filter); i++);
  });
  //
  return moves;
};

var getKnightMoves = function(position, moves, filter) {
  var shifts = [
    { row: -2, column: -1 },
    { row: -2, column: 1 },
    { row: -1, column: -2 },
    { row: -1, column: 2 },
    { row: 2, column: -1 },
    { row: 2, column: 1 },
    { row: 1, column: -2 },
    { row: 1, column: 2 }
  ];
  //
  shifts.forEach(function(shift, index, array) {
    tryPushShift(position, shift.row, shift.column, moves, filter);
  });
  //
  return moves;
};
//
var getPawnMoves = function(position, direction, moves, filter) {
  var rowShift = direction * length;
  if (chessboard[position.index + rowShift] == undefined) {
    (filter ? checkRegularMove(position.index, position.index + rowShift) : true) && moves.push(position.index + rowShift);
    if (chessboard[position.index].initial && chessboard[position.index + 2 * rowShift] == undefined) {
      (filter ? checkRegularMove(position.index, position.index + 2 * rowShift) : true) && moves.push(position.index + 2 * rowShift);
    }
  }
  //
  if (position.column && chessboard[position.index + rowShift - 1]
    && chessboard[position.index + rowShift - 1].colour == enemy) {
    (filter ? checkRegularMove(position.index, position.index + rowShift - 1) : true) && moves.push(position.index + rowShift - 1);
  }
  if ((position.column != length - 1) && chessboard[position.index + rowShift + 1]
    && chessboard[position.index + rowShift + 1].colour == enemy) {
    (filter ? checkRegularMove(position.index, position.index + rowShift + 1) : true) && moves.push(position.index + rowShift + 1);
  }
  //
  addEnPassantMove(position, direction, moves, filter);
  //
  return moves;
};

var isInRange = function(value) {
  return value >= 0 && value < length;
};

var tryPush = function(from, to, moves, filter) {
  var captured = chessboard[to];
  if (captured == undefined) {
    (filter ? checkRegularMove(from, to) : true) && moves.push(to);
    return true;
  }
  if (captured.colour == enemy) {
    (filter ? checkRegularMove(from, to) : true) && moves.push(to);
    return false;
  }
  return false;
};

var tryPushShift = function(position, rowShift, columnShift, moves, filter) {
  return (isInRange(position.row + rowShift) && isInRange(position.column + columnShift))
    ? tryPush(position.index, position.index + rowShift * length + columnShift, moves, filter)
    : false;
};

var checkRegularMove = function(from, to) {
  var captured = chessboard[to];
  chessboard[to] = chessboard[from];
  chessboard[from] = undefined;
  //
  var valid = !isCheck();
  //
  chessboard[from] = chessboard[to];
  chessboard[to] = captured;
  //
  return valid;
};
