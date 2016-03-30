var enableDragAndDrop = function() {
  $('.draggable-piece').draggable({
    revert: 'invalid',
    disabled: true,

    start: function(event, ui) {
      $('#chessboard').children('.droppable-square').each(function() {
        disableDroppable($(this));
      });
      //
      cached_Flag || cacheMoves();
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
      var pieceIndex = $piece.parent().index();
      //
      gameEventArgs.reset();
      //
      makeEnPassantCapture(squareIndex);
      updateJustMovesPawn(pieceIndex, squareIndex);
      //
      move($piece, $square, pieceIndex, squareIndex);
      //
      gameEventArgs.from = pieceIndex;
      gameEventArgs.to = squareIndex;
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

var move = function($piece, $square, pieceIndex, squareIndex) {
  $square.children('.draggable-piece').first().detach();
  $piece.detach().appendTo($square);
  $piece.offset({ top: $square.position().top, left: $square.position().left });
  //
  chessboard[squareIndex] = chessboard[pieceIndex];
  chessboard[squareIndex].initial = false;
  chessboard[pieceIndex] = undefined;
};

var initGameEndPopup = function(buttons) {
  //$('#popup-inner').fadeOut();
  $('#popup-inner').empty();
  //
  buttons.forEach(function(item, index, array) {
    $('#popup-inner').append('<div class="game-end-popup-button">' + item + '</div>');
  });
	//
	$('.game-end-popup-button').click(function() {
		location.reload(true);
	});
	//
	$('#popup').fadeIn();
}
