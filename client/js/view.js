var enableDragAndDrop = function() {
  $('.draggable-piece').draggable({
    revert: 'invalid',
    disabled: true,

    start: function(event, ui) {
      cached_Flag || cacheMoves();
      //
      $('#chessboard').children('.droppable-square').each(function() {
        disableDroppable($(this));
      });
      //
      chessboard[$(this).parent().index()].moves.forEach(function(move, index, array) {
        enableDroppable(getSquare(move));
      });
    }
  });

  $('.droppable-square').droppable({
    accept: '.draggable-piece',
    hoverClass: 'drop-enabled-hover',
    disabled: true,

    drop: function(event, ui) {
      $('#chessboard').children('.droppable-square').each(function() {
        disableDroppable($(this));
      });
      //
      var $square = $(this);
      var $piece = ui.draggable;
      var squareIndex = $square.index();
      //
      makeEnPassantCapture(squareIndex);
      updateJustMovesPawn($piece.parent().index(), squareIndex);
      //
      clear($square);
      move($piece, $square);
      align($piece, $square);
      //
      castle(squareIndex);
      promotePlayer($piece);
    }
  });
};

var enableDroppable = function($droppableSquare) {
  $droppableSquare.droppable("option", "disabled", false);
};

var disableDroppable = function($droppableSquare) {
  $droppableSquare.droppable("option", "disabled", true);
};

var enableDraggable = function($draggablePiece) {
  $draggablePiece.draggable("option", "disabled", false);
  $draggablePiece.addClass('drag-enabled');
};

var disableDraggable = function($draggablePiece) {
  $draggablePiece.draggable("option", "disabled", true);
  $draggablePiece.removeClass('drag-enabled');
};

var clear = function($square) {
  $square.children('.draggable-piece').first().detach();
  chessboard[$square.index()] = undefined;
};

var move = function($piece, $square) {
  var pieceIndex = $piece.parent().index();
  var squareIndex = $square.index();
  //
  $piece.detach().appendTo($square);
  //
  chessboard[squareIndex] = chessboard[pieceIndex];
  chessboard[pieceIndex] = undefined;
  chessboard[squareIndex].initial = false;
};

var align = function($piece, $square) {
  $piece.offset({ top: $square.position().top, left: $square.position().left });
};

var endGame = function(message) {
	$('#popup-inner').append('<div class="popup-button">' + message + '</div>');
	//
	$('.popup-button').click(function() {
		location.reload(true);
	});
	//
	$('#popup').fadeIn();
}
