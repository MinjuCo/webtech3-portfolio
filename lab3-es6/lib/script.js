"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Note = /*#__PURE__*/function () {
  function Note(title) {
    _classCallCheck(this, Note);

    this.title = title;
    this.element = this.createElement(title);
  }

  _createClass(Note, [{
    key: "createElement",
    value: function createElement(title) {
      var newNote = document.createElement('div'); //<div> element is being created

      newNote.setAttribute("class", "card"); //set the class attribute of the div to card

      var newP = document.createElement('p'); //create a <p> element

      newP.innerHTML = title;
      var newA = document.createElement('a');
      newA.innerHTML = "Remove";
      newA.setAttribute("href", "#");
      newA.setAttribute("class", "card-remove");
      newNote.appendChild(newP);
      newNote.appendChild(newA);
      newA.addEventListener('click', this.remove.bind(newNote));
      return newNote;
    }
  }, {
    key: "add",
    value: function add() {
      // HINT🤩
      // this function should append the note to the screen somehow
      document.querySelector(".notes").appendChild(this.element);
      this.element.classList.add("animated");
      this.element.classList.add("fadeInDown");
    }
  }, {
    key: "saveToStorage",
    value: function saveToStorage() {
      // HINT🤩
      // localStorage only supports strings, not arrays
      // if you want to store arrays, look at JSON.parse and JSON.stringify
      var getStorage = JSON.parse(localStorage.getItem('savedNotes')); //Shorthand if structure

      var savedNotes = getStorage != null ? getStorage : [];
      savedNotes.push(this.title);
      console.log("This is the array were notes are saved: ".concat(savedNotes));
      localStorage.setItem('savedNotes', JSON.stringify(savedNotes));
      console.log("This is the current local storage: ".concat(localStorage));
    }
  }, {
    key: "remove",
    value: function remove() {
      var _this = this;

      // HINT🤩 the meaning of 'this' was set by bind() in the createElement function
      // in this function, 'this' will refer to the current note element
      var noteTitle = this.querySelector('p').innerHTML;
      console.log(noteTitle);
      var savedNotes = JSON.parse(localStorage.getItem('savedNotes'));
      savedNotes.splice(savedNotes.indexOf(noteTitle), 1);
      localStorage.setItem('savedNotes', JSON.stringify(savedNotes));
      console.log(localStorage);
      this.classList.add("animated");
      this.classList.add("fadeOutUp");
      setTimeout(function () {
        _this.remove();
      }, 1000);
    }
  }]);

  return Note;
}();

var App = /*#__PURE__*/function () {
  function App() {
    var _this2 = this;

    _classCallCheck(this, App);

    console.log("👊🏼 The Constructor!"); // HINT🤩
    // clicking the button should work
    // pressing the enter key should also work
    // this.btnAdd = ???

    this.btnAdd = document.querySelector("#btnAddNote");
    this.btnAdd.addEventListener("click", this.createNote.bind(this));
    this.loadNotesFromStorage();
    this.txtAddNote = document.querySelector("#txtAddNote"); //https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp

    this.txtAddNote.onkeypress = function (e) {
      if (e.keyCode == 13 || e.which == 13) {
        e.preventDefault();

        _this2.btnAdd.click();
      }
    };
  }

  _createClass(App, [{
    key: "loadNotesFromStorage",
    value: function loadNotesFromStorage() {
      // HINT🤩
      // load all notes from storage here and add them to the screen
      // something like note.add() in a loop would be nice
      var savedNotes = JSON.parse(localStorage.getItem('savedNotes'));

      if (savedNotes != null) {
        savedNotes.forEach(function (title) {
          var note = new Note(title);
          note.add();
        });
      }
    }
  }, {
    key: "createNote",
    value: function createNote(e) {
      // this function should create a new note by using the Note() class
      var text = document.querySelector("#txtAddNote").value;
      console.log(text);
      var note = new Note(text); // HINT🤩

      note.add();
      note.saveToStorage();
      this.reset();
    }
  }, {
    key: "reset",
    value: function reset() {
      // this function should reset the form and give focus to the input field
      var inputField = document.querySelector("#txtAddNote");
      inputField.value = "";
      inputField.focus();
    }
  }]);

  return App;
}();

var app = new App();