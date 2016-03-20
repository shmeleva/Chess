function Coordinates(index) {
  this.index = index;
  this.row = Math.floor(index / 8);
  this.column = index % 8;
};

var chessboard = [];

var playerMove_Flag = true;

var length = 8;
var files = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
var ranks = [8, 7, 6, 5, 4, 3, 2, 1];
var unicodeBoard =
	['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜',
	'♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟',
	null, null, null, null, null, null, null, null,
	null, null, null, null, null, null, null, null,
	null, null, null, null, null, null, null, null,
	null, null, null, null, null, null, null, null,
	'♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙',
	'♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'];

var white = 'white-piece';
var black = 'black-piece';

var ally = white;
var enemy = black;
var player = white;

var initializeChessboard = function(reversed) {
	for (var i = 0; i < ranks.length; i++) {
		for (var j = 0; j < files.length; j++) {
			var count = files.length * i + j;
			//
			var style = (count % files.length) ? '' : 'style="clear: left"';
			var coordinates = '<div class = "coordinate">' + files[j] + ranks[i] + '</div>'
			var squareColour = ( !(i % 2) && (j % 2) || (i % 2) && !(j % 2) ) ? 'black-square' : 'white-square';
			//
			var $currentsquare = $('<div class="droppable-square ' + squareColour + '" ' + style + '">' + coordinates + '</div>');
			//
			if (unicodeBoard[count]) {
				var colour = unicodeBoard[count] < '♚' ? white : black; // -
				var type = getType(unicodeBoard[count]); // -
				var classes = ['draggable-piece', colour, type].join(' '); // -
				var $piece = $('<div class = "' + classes + '">' + unicodeBoard[count] + '</div>');
				$currentsquare.append($piece);
				//
				chessboard[count] = {
          view: unicodeBoard[count],
          colour: colour,
          type: type,
          initial: true,
          moves: [] };
			}
			//
			$("#chessboard").append($currentsquare);
		}
	}
};

var enablePlayer = function() {
	$('#chessboard').find('.draggable-piece.' + ally).each(function() {
			enableDraggable($(this));
	});
};

var disablePlayer = function() {
	$('#chessboard').find('.draggable-piece.' + ally).each(function() {
			disableDraggable($(this));
	});
};

var reverseBoard = function() {
	files.reverse();
	ranks.reverse();
	unicodeBoard.reverse();
	toggleColors();
	player = black;
};

var toggleColors = function() {
	var buffer = ally;
	ally = enemy;
	enemy = buffer;
};

var switchPlayer = function() {
	disablePlayer();
	toggleColors();
	playerMove_Flag = !playerMove_Flag;
	enablePlayer();
};

var getSquare = function(index) {
  return $('#chessboard').children('.droppable-square').eq(index);
};

var getPiece = function(squareIndex) {
  return $('#chessboard').children('.droppable-square').eq(squareIndex).children('.draggable-piece').first();
};

var getType = function(piece) {
	switch (piece) {
		case '♟': case '♙':
			return 'pawn';
		case '♚': case '♔':
			return 'king';
		case '♜': case '♖':
			return 'rook';
		default:
			return '';
	}
};

var find = function(colour, type, initial) {
	var searchResults = [];
	chessboard.forEach(function(p, index, board) {
		if (p && p.colour == (colour || p.colour) && p.type == (type || p.type) && p.initial == (initial || p.initial)) {
				searchResults.push(index);
			}
	});
	return searchResults;
};
