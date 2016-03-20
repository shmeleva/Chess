var isCheck = function() {
  var king = find(ally, 'king').shift();
  var enemies = find(enemy);
  //
  for (var i = 0; i < enemies.length; i++) {
    if (getEnemyMoves(enemies[i]).indexOf(king) != -1) {
      return true;
    }
  }
  //
  return false;
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
