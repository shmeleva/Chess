var castling_kingMoves = [];
var castling_rooks = [];
var castling_rookMoves = [];

var addCastlingMove = function(kingPosition, moves, filter) {
  if (!filter || isCheck()) {
    return;
  }
  //
  castling_kingMoves = [];
  castling_rooks = [];
  castling_rookMoves = [];
  //
  var king = chessboard[kingPosition.index];
  if (king.initial == false) {
    return;
  }
  //
  find(ally, 'rook', true).forEach(function(rook, index, array) {
    var rookPosinion = new Coordinates(rook);
    var start = kingPosition.row * 8 + Math.min(rookPosinion.column, kingPosition.column) + 1;
    var end = kingPosition.row * 8 + Math.max(rookPosinion.column, kingPosition.column);
    //
    for (var i = start; i < end; i++) {
      if (chessboard[i]) {
        return;
      }
    }
    //
    var direction = Math.sign(rookPosinion.column - kingPosition.column);
    //
    if (moves.indexOf(kingPosition.index + direction) == -1) {
      return;
    }
    //
    var kingMove = kingPosition.index + 2 * direction;
    var rookMove = kingMove - direction;
    //
    if (checkCastlingMove) {
      moves.push(kingMove);
      castling_kingMoves.push(kingMove);
      castling_rooks.push(rook);
      castling_rookMoves.push(rookMove);
    }
  });
};

var checkCastlingMove = function(kingIndex, kingMove, rookIndex, rookMove) {
  chessboard[rookMove] = chessboard[rookIndex];
  chessboard[rookIndex] = undefined;
  chessboard[kingMove] = chessboard[kingIndex];
  chessboard[kingIndex] = undefined;
  //
  var valid = !isCheck();
  //
  chessboard[rookIndex] = chessboard[rookMove];
  chessboard[rookMove] = undefined;
  chessboard[kingIndex] = chessboard[kingMove];
  chessboard[kingMove] = undefined;
  //
  return valid;
};

var castle = function(to) {
  if (!castling_kingMoves) {
    return;
  }
  //
  var index = castling_kingMoves.indexOf(to);
  if (index != -1) {
    move(getPiece(castling_rooks[index]), $('#chessboard').children('.droppable-square').eq(castling_rookMoves[index]));
  }
  //
  castling_kingMoves = [];
  castling_rooks = [];
  castling_rookMoves = [];
};
