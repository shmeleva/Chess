var onContinue = function() {
  clearCache();
  switchPlayer();
  //
  gameEventArgs.emit();
};

var promotePlayer = function($piece) {
  if ($piece.hasClass('pawn') && Math.floor($piece.parent().index() / 8) == 0) {
    initPromotionPopup($piece);
  }
  else {
    onContinue();
  }
};

var promoteOpponent = function(index, view) {
  var piece = chessboard[index];
  var row = Math.floor(index / 8);
  if (piece != undefined && piece.type == 'pawn' && row == (length - 1) && getPromotionOptions(piece.colour).indexOf(view) != -1) {
    promotePawn(index, view);
    return true;
  }
  return false;
};

var initPromotionPopup = function($piece) {
  getPromotionOptions(ally).forEach(function(promotion, index, array) {
    $('#popup-inner').append('<div class="popup-button">' + promotion + '</div>');
  });
  //
  $('.popup-button').click(function() {
    $('#popup').fadeOut();
    $('#popup-inner').empty();
    //
    promotePawn($piece.parent().index(), $(this).html());
    //
    gameEventArgs.event = 'turn_promotion';
    gameEventArgs.promotion = $(this).html();
    //
    onContinue();
  });
  //
  $('#popup').fadeIn();
};

var promotePawn = function(index, view) {
  var $piece = getPiece(index);
  $piece.html(view);
  $piece.removeClass('pawn');
  //
  chessboard[index].view = view;
  chessboard[index].type = null;
};

var getPromotionOptions = function(colour) {
  return colour == 'white-piece' ? [ '♖', '♘', '♗', '♕' ] : [ '♜', '♞', '♝', '♛' ];
};
