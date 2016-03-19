var justMovedPawnIndex = null;
var enPassant_Move = null;
//
var addEnPassantMove = function(position, direction, moves, filter) {
  //
  if (!filter) {
    return;
  }
  //
  if (justMovedPawnIndex) {
    var row = Math.floor(justMovedPawnIndex / 8);
    var column = justMovedPawnIndex % 8;
    //
    if (position.row == row && Math.abs(position.column - column) == 1) {
      enPassant_Move = (position.row + direction) * 8 + column;
      if (checkRegularMove(position.index, enPassant_Move)) {
        moves.push(enPassant_Move);
      }
    }
  }
};

var checkEnPassantMove = function(from, to) {
  var captured = chessboard[justMovedPawnIndex];
  chessboard[justMovedPawnIndex] = undefined;
  chessboard[to] = chessboard[from];
  chessboard[from] = undefined;
  //
  var valid = !isCheck();
  //
  chessboard[justMovedPawnIndex] = captured;
  chessboard[from] = chessboard[to];
  chessboard[to] = undefined;
  //
  return valid;
};

var makeEnPassantCapture = function(squareIndex) {
  if (enPassant_Move) {
    if (squareIndex == enPassant_Move) {
      getPiece(justMovedPawnIndex).detach();
      chessboard[justMovedPawnIndex] = undefined;
    }
    enPassant_Move = null;
  }
};

var updateJustMovesPawn = function(pieceIndex, squareIndex) {
  justMovedPawnIndex =
    (chessboard[pieceIndex].initial && chessboard[pieceIndex].type == 'pawn' && Math.abs(pieceIndex - squareIndex) == 16)
    ? squareIndex
    : null;
};
