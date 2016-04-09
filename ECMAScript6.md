#ECMAScript 6

> :green_apple: stands for 'Supported'

> :tangerine: stands for 'Partially Supported'

> :strawberry: stands for 'Not Supported'

##Constants
ECMAScript 6

    const PI = 3.141593;

ECMAScript 5

    Object.defineProperty(typeof global === "object" ? global : window, "PI", {
        value:        3.141593,
        enumerable:   true,
        writable:     false,
        configurable: false
    });

Browser Compatibility

IE 11 | Edge 14 | Mozilla Firefox 48 | Google Chrome 52 | Opera 38 | Safari 9.1
:----:|:-------:|:------------------:|:----------------:|:--------:|:---------:
:tangerine: | :green_apple: | :tangerine: | :green_apple: | :green_apple: | :strawberry:

##Block-scoped variables

ECMAScript 6

    var ecmaScriptVersion = 5;
    if (true) {
    	let ecmaScriptVersion = 6;
    	console.log(ecmaScriptVersion ); // 6
    }
    console.log(ecmaScriptVersion ); // 5

ECMAScript 5

    var ecmaScriptVersion = 5;
    if (true) {
    	var ecmaScriptVersion = 6;
    	console.log(ecmaScriptVersion ); // 6
    }
    console.log(ecmaScriptVersion ); // 6

Browser Compatibility

IE 11 | Edge 14 | Mozilla Firefox 48 | Google Chrome 52 | Opera 38 | Safari 9.1
:----:|:-------:|:------------------:|:----------------:|:--------:|:---------:
:tangerine: | :green_apple: | :tangerine: | :green_apple: | :green_apple: | :strawberry:

##Arrow Functions
####Expression Bodies
ECMAScript 6

    var song = songs.find((s) => s.Title === 'Song To Say Goodbye');

ECMAScript 5

    var song = songs.find(function (s) { return s.Title === 'Song To Say Goodbye'; });

Browser Compatibility

IE 11 | Edge 14 | Mozilla Firefox 48 | Google Chrome 52 | Opera 38 | Safari 9.1
:----:|:-------:|:------------------:|:----------------:|:--------:|:---------:
:green_apple: | :green_apple: | :green_apple: | :green_apple: | :green_apple: | :strawberry:

----------

####Statement Bodies
ECMAScript 6

    songs.forEach(s => {
       if (s.Artist === 'Hurts')
           hurts.push(s)
    })

ECMAScript 5

    songs.forEach(function (s) {
       if (s.Artist === 'Hurts')
           hurts.push(s);
    });

Browser Compatibility

IE 11 | Edge 14 | Mozilla Firefox 48 | Google Chrome 52 | Opera 38 | Safari 9.1
:----:|:-------:|:------------------:|:----------------:|:--------:|:---------:
:green_apple: | :green_apple: | :green_apple: | :green_apple: | :green_apple: | :strawberry:

----------

####Lexical `this`
ECMAScript 6

    this.songs.forEach((v) => {
        if (s.Artist === 'Hurts')
            this.hurts.push(s)
    })

ECMAScript 5

    var self = this;
    this.songs.forEach(function (s) {
        if (s.Artist === 'Hurts')
            self.hurts.push(s);
    });

Browser Compatibility

IE 11 | Edge 14 | Mozilla Firefox 48 | Google Chrome 52 | Opera 38 | Safari 9.1
:----:|:-------:|:------------------:|:----------------:|:--------:|:---------:
:green_apple: | :green_apple: | :green_apple: | :green_apple: | :green_apple: | :strawberry:

##Function Parameters
####Default Parameter Values
ECMAScript 6

    function djangoDjango(x, y = 1, z= 2) {
        return x + y + z;
    }

ECMAScript 5

    function djangoDjango(x, y, z) {
        if (y === undefined)
            y = 1;
        if (z === undefined)
            z = 2;
        return x + y + z;
    };

Browser Compatibility

IE 11 | Edge 14 | Mozilla Firefox 48 | Google Chrome 52 | Opera 38 | Safari 9.1
:----:|:-------:|:------------------:|:----------------:|:--------:|:---------:
:strawberry: | :strawberry: | :tangerine: | :green_apple: | :green_apple: | :strawberry:

----------

####Rest Parameter
ECMAScript 6

    function restInPeace(a, b, ...rest) {
        return a + b + rest.length;
    }

ECMAScript 5

    function argsInPeace(a, b) {
        var args = Array.prototype.slice.call(arguments, 2);
        return a + b + rest.length;
    };

Browser Compatibility

IE 11 | Edge 14 | Mozilla Firefox 48 | Google Chrome 52 | Opera 38 | Safari 9.1
:----:|:-------:|:------------------:|:----------------:|:--------:|:---------:
:strawberry: | :green_apple: | :green_apple: | :green_apple: | :green_apple: | :strawberry:

----------

####Spread Operator
ECMAScript 6

    let values = [25, 50, 75, 100]
    console.log(Math.max(...values)); 

ECMAScript 5

    let values = [25, 50, 75, 100]
    console.log(Math.max.apply(Math, values));

Browser Compatibility

IE 11 | Edge 14 | Mozilla Firefox 48 | Google Chrome 52 | Opera 38 | Safari 9.1
:----:|:-------:|:------------------:|:----------------:|:--------:|:---------:
:strawberry: | :green_apple: | :green_apple: | :green_apple: | :green_apple: | :tangerine:

##Destructuring

ECMAScript 6

    let song = {
            artist: "Awolnation",
            title: "Sail"
        };
    
    let { artist, title } = song;

ECMAScript 5

    var artist = song.artist;
    var title = song.title;

Browser Compatibility

IE 11 | Edge 14 | Mozilla Firefox 48 | Google Chrome 52 | Opera 38 | Safari 9.1
:----:|:-------:|:------------------:|:----------------:|:--------:|:---------:
:strawberry: | :tangerine: | :tangerine: | :tangerine: | :tangerine: | :tangerine:

##Template Literals
ECMAScript 6

    var hello = `Hello ${user.name}, you are the world to me`

ECMAScript 5

    var hello = "Hello " + user.name + ", you are the world to me";

Browser Compatibility

IE 11 | Edge 14 | Mozilla Firefox 48 | Google Chrome 52 | Opera 38 | Safari 9.1
:----:|:-------:|:------------------:|:----------------:|:--------:|:---------:
:strawberry: | :green_apple: | :green_apple: | :green_apple: | :green_apple: | :green_apple:

##Object Literal Extensions
####Property Shorthand
ECMAScript 6

    var kitsune = { age, numberOfTails };

ECMAScript 5

    var kitsune= { age: age, numberOfTails: numberOfTails };

Browser Compatibility

IE 11 | Edge 14 | Mozilla Firefox 48 | Google Chrome 52 | Opera 38 | Safari 9.1
:----:|:-------:|:------------------:|:----------------:|:--------:|:---------:
:strawberry: | :green_apple: | :green_apple: | :green_apple: | :green_apple: | :green_apple:

----------
####Computed Property Names
ECMAScript 6

    let king = {
        name: "Arthur",
        [ "owns" + getShape() + "Table" ]: true
    };

ECMAScript 5

    var king = {
        name: "Arthur"
    };
    king[ "owns" + getShape() + "Table" ] = true;

Browser Compatibility

IE 11 | Edge 14 | Mozilla Firefox 48 | Google Chrome 52 | Opera 38 | Safari 9.1
:----:|:-------:|:------------------:|:----------------:|:--------:|:---------:
:strawberry: | :green_apple: | :green_apple: | :green_apple: | :green_apple: | :green_apple:

----------
##Binary & Octal Literals
ECMAScript 6

    0b10000000000 === 1024;
    0o2000 === 1024;

ECMAScript 5

    parseInt("0b10000000000", 2) === 1024;
    parseInt("0o2000", 8) === 1024;

Browser Compatibility

IE 11 | Edge 14 | Mozilla Firefox 48 | Google Chrome 52 | Opera 38 | Safari 9.1
:----:|:-------:|:------------------:|:----------------:|:--------:|:---------:
:strawberry: | :green_apple: | :green_apple: | :green_apple: | :green_apple: | :green_apple:

##Typed Arrays
ECMAScript 6

    let buffer = new ArrayBuffer(2),
        view = new DataView(buffer);
    
    view.setInt8(0, 5);
    view.setInt8(1, -1);
    
    console.log(view.getInt16(0));      // 1535
    console.log(view.getInt8(0));       // 5
    console.log(view.getInt8(1));       // -1

Browser Compatibility

IE 11 | Edge 14 | Mozilla Firefox 48 | Google Chrome 52 | Opera 38 | Safari 9.1
:----:|:-------:|:------------------:|:----------------:|:--------:|:---------:
:strawberry: | :green_apple: | :green_apple: | :green_apple: | :green_apple: | :tangerine:

##Classes
####Class Definition
ECMAScript 6

    class Knight {
        constructor(colour, file, rank) {
            this.colour = colour;
            this.move(file, rank);
        }
        move(file, rank) {
            this.file = file;
            this.rank = rank;
        }
    }

ECMAScript 5

    var Knight = function(colour, file, rank) {
            this.colour = colour;
            this.move(file, rank);
    };
    Knight.prototype.move = function(file, rank) {
            this.file = file;
            this.rank = rank;
    };

Browser Compatibility

IE 11 | Edge 14 | Mozilla Firefox 48 | Google Chrome 52 | Opera 38 | Safari 9.1
:----:|:-------:|:------------------:|:----------------:|:--------:|:---------:
:strawberry: | :green_apple: | :green_apple: | :green_apple: | :green_apple: | :green_apple:

----------
####Class Inheritance
ECMAScript 6

    class Finland extends Country {
        constructor (capital, president) {
            super(capital);
            this.president = president;
        }
    }
    class Sweden extends Country {
        constructor (capital, king) {
            super(capital);
            this.king = king;
        }
    }

ECMAScript 5

    var Finland = function(capital, president) {
        Country.call(this, capital);
        this.president = president;
    };
    Finland.prototype = Object.create(Country.prototype);
    Finland.prototype.constructor = Finland ;

Browser Compatibility

IE 11 | Edge 14 | Mozilla Firefox 48 | Google Chrome 52 | Opera 38 | Safari 9.1
:----:|:-------:|:------------------:|:----------------:|:--------:|:---------:
:strawberry: | :green_apple: | :green_apple: | :green_apple: | :green_apple: | :green_apple:

----------
####Base Class Access
ECMAScript 6

    class Country {
        …
        toString() {
            return " is a sovereign state";
        }
    }
    class Finland extends Country {
        …
        toString () {
            return "Finland" + super.toString();
        }
    }

Browser Compatibility

IE 11 | Edge 14 | Mozilla Firefox 48 | Google Chrome 52 | Opera 38 | Safari 9.1
:----:|:-------:|:------------------:|:----------------:|:--------:|:---------:
:strawberry: | :green_apple: | :green_apple: | :green_apple: | :green_apple: | :tangerine:

----------
####Static Members
ECMAScript 6

    class Country {
        constructor(name) {
            this.name = name;
        }
    
       static create(name) {
            return new Country(name);
        }
    }
    
    let finland = Country.create("Finland");

Browser Compatibility

IE 11 | Edge 14 | Mozilla Firefox 48 | Google Chrome 52 | Opera 38 | Safari 9.1
:----:|:-------:|:------------------:|:----------------:|:--------:|:---------:
:strawberry: | :green_apple: | :green_apple: | :green_apple: | :green_apple: | :green_apple:

----------
####Getter/Setter
ECMAScript 6

    class Finland {
        constructor (capital, president) {
            this._capital = capital;
            this._president = president;
        }
        set president(president)  { this._president = president; }
        get president()       { return this._president; }
    };
    
    var finland = new Finland('Helsinki', 'Sauli Niinistö');
    finland.president === "...";

Browser Compatibility

IE 11 | Edge 14 | Mozilla Firefox 48 | Google Chrome 52 | Opera 38 | Safari 9.1
:----:|:-------:|:------------------:|:----------------:|:--------:|:---------:
:strawberry: | :green_apple: | :green_apple: | :green_apple: | :green_apple: | :green_apple:

##Symbols 
####Symbol Type

`Symbol` является новым примитивным типом данных и служит для создания уникальных идентификаторов.

    var symbol = Symbol("primitive");
    console.log(typeof symbol);  // "symbol"

ECMAScript 6

    let unicorn = {
          numberOfCorns: 1,
          [Symbol.for("isMagical")]: true
        };
        
      console.log( Object.keys(unicorn) ); // numberOfCorns
      console.log( unicorn[Symbol.for("isMagical")] ); // true

----------
####Global Symbols

Существует «глобальный реестр» символов, который позволяет иметь общие «глобальные» символы, которые можно получить из реестра по имени.

ECMAScript 6

    let global= Symbol.for("global");
    console.log(Symbol.for("global") == global); // true

Browser Compatibility

IE 11 | Edge 14 | Mozilla Firefox 48 | Google Chrome 52 | Opera 38 | Safari 9.1
:----:|:-------:|:------------------:|:----------------:|:--------:|:---------:
:strawberry: | :tangerine: | :tangerine: | :green_apple: | :green_apple: | :strawberry:

##Iterators
ECMAScript 6

    let songs  = ["Lights ", "Some Kind of Heaven", "Rolling Stone"];
    
    for (let song of songs ) {
      console.log(song);
    }

----------

     let fibonacciSequence = {
            [Symbol.iterator]() {
                let previous = 0, current = 1;
                return {
                   next () {
                       [ previous , current ] = [ current, previous + current ];
                       return { done: false, value: current };
                   }
                };
            }
        }
        
        for (let number of fibonacciSequence ) {
            if (number > 1000) {
                break;
            }
            console.log(n);
        }

Browser Compatibility

IE 11 | Edge 14 | Mozilla Firefox 48 | Google Chrome 52 | Opera 38 | Safari 9.1
:----:|:-------:|:------------------:|:----------------:|:--------:|:---------:
:strawberry: | :green_apple: | :green_apple: | :green_apple: | :green_apple: | :green_apple:

##Generators
ECMAScript 6

    let generateFibonacciSequence = {
        *[Symbol.iterator]() {
            let previous = 0, current = 1;
            for (;;) {
                [ previous, current ] = [ current, previous + current];
                yield current;
            }
        }
    }
	
	let generator = generateFibonacciSequence();

Browser Compatibility

IE 11 | Edge 14 | Mozilla Firefox 48 | Google Chrome 52 | Opera 38 | Safari 9.1
:----:|:-------:|:------------------:|:----------------:|:--------:|:---------:
:strawberry: | :green_apple: | :green_apple: | :green_apple: | :green_apple: | :strawberry:

##Sets & Maps
####Set Data-Structure
Set является коллекцией для хранения множества значений, причём каждое значение может встречаться лишь один раз.

ECMAScript 6

    let set = new Set(["A Part of You", "Unfettered", "Distant"]);
    set.add("Victims").add("Breaking the Stones");
    set.has("A Part of You") === true;
    for (let s of set.values())
        console.log(s);

Browser Compatibility

IE 11 | Edge 14 | Mozilla Firefox 48 | Google Chrome 52 | Opera 38 | Safari 9.1
:----:|:-------:|:------------------:|:----------------:|:--------:|:---------:
:tangerine: | :green_apple: | :green_apple: | :green_apple: | :green_apple: | :green_apple:

----------
####Map Data-Structure

Map – это коллекция для хранения записей вида `ключ : значение`.
ECMAScript 6

      let map = new Map([
          ["don't",  "let"],
          ["go",    "never"],
          ["give", "up"]
        ]);
      map
        .set("it's", "such")
        .set("a", "wonderful")
        .set("life", true);

Browser Compatibility

IE 11 | Edge 14 | Mozilla Firefox 48 | Google Chrome 52 | Opera 38 | Safari 9.1
:----:|:-------:|:------------------:|:----------------:|:--------:|:---------:
:tangerine: | :green_apple: | :green_apple: | :green_apple: | :green_apple: | :green_apple:

##Promises

Promise является специальным объектом, который содержит своё состояние. Вначале pending («ожидание»), затем – одно либо fulfilled («выполнено успешно»), либо rejected («выполнено с ошибкой»).
В соответствии с этим на promise можно навешивать коллбэки двух типов:

 - onFulfilled;
 - onRejected.

Код, которому надо сделать что-то асинхронно, создаёт объект promise и возвращает его. Внешний код, получив promise, навешивает на него обработчики. По завершении процесса асинхронный код переводит promise в состояние fulfilled (с результатом) или rejected (с ошибкой). При этом автоматически вызываются соответствующие обработчики во внешнем коде.

ECMAScript 6

    var promise = new Promise(function(resolve, reject) { /* ... */ });
    promise.then(FulfilledHandler, RejectedHandler);

Browser Compatibility

IE 11 | Edge 14 | Mozilla Firefox 48 | Google Chrome 52 | Opera 38 | Safari 9.1
:----:|:-------:|:------------------:|:----------------:|:--------:|:---------:
:strawberry: | :green_apple: | :green_apple: | :green_apple: | :green_apple: | :tangerine:

##Proxies
Proxy – это объект, перехватывающий и, при необходимости, модифицирующий обращения к другому объекту.

ECMAScript 6

    let facts = {
      'шмель':  'мохнатый',
      'хмель':  'душистый'
    };
    
    let factsProxy = new Proxy(facts, {
      get(target, word) {
        return (word in target) ? target[word] : word;
      }
    })
    
    console.log( factsProxy["шмель"] ); // "мохнатый"
    console.log( factsProxy["сон"]); // "сон"

Browser Compatibility

IE 11 | Edge 14 | Mozilla Firefox 48 | Google Chrome 52 | Opera 38 | Safari 9.1
:----:|:-------:|:------------------:|:----------------:|:--------:|:---------:
:tangerine: | :tangerine: | :tangerine: | :tangerine: | :tangerine: | :tangerine:
