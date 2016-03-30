var convertFromCoordinate = function(file, rank) {
  var _file = file.charCodeAt(0) - 'A'.charCodeAt(0);
  var index = (ranks.length - rank) * files.length + _file;
  return reversedBoard ? 63 - index : index;
};

var convertFromIndex = function(index) {
  var coordinate = new Coordinates(index);
  return { x: files[coordinate.column], y: ranks[coordinate.row] };
};

var convertFromUnicode = function(unicode) {
  switch (unicode) {
    case '♜': case '♖':
      return 'rook';
    case '♞': case '♘':
      return 'knight';
    case '♝': case '♗':
      return 'bishop';
    case '♛': case '♕':
      return 'queen';
  }
};

var convertFromString = function(colour, piece) {
  switch (piece) {
    case 'rook':
      return (colour == 'white') ? '♖' : '♜';
    case 'knight':
      return (colour == 'white') ? '♘' : '♞';
    case 'bishop':
      return (colour == 'white') ? '♗' : '♝';
    case 'queen':
      return (colour == 'white') ? '♕' : '♛';
  }
};

var convertMessage = function(winner, message) {
  switch (message) {
    case 'mate':
      return ['☠ ' + ((winner == 'white') ? '♚' : '♔') + ' ☠'];
    case 'draw':
      return ['♔ ' + '🙏' + ' ♚'];
    case 'invalid turn':
      return ['🙅 🙅 🙅'];
    case 'leave':
      return [(reversedBoard ? '♔' : '♚') + '⎆  🚪'];
  }
};
