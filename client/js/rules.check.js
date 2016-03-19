var isCheck = function() {
  var check = false;
  var king = find(ally, 'king').shift();
  //
  find(enemy).forEach(function(item, index, enemies) {
    if (getEnemyMoves(item).indexOf(king) != -1) {
      check = true;
      return false;
    }
  });
  //
  return check;
};

var isMate = function() {
  cached_Flag || cacheMoves();
  //
  for (var i = 0; i < chessboard.length; i++) {
    if (chessboard[i] && chessboard[i].moves.length) {
      return false;
    }
  }
  //
  return true;
};

var isCheckmate = function() {
  return isCheck() && isMate();
};

var isStalemate = function() {
  return !isCheck() && isMate();
};
