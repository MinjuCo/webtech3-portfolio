class Note {
  constructor(title) {
    this.title = title;
    this.element = this.createElement(title);
  }
  
  createElement(title){
    let newNote = document.createElement('div'); //<div> element is being created
    newNote.setAttribute("class", "card"); //set the class attribute of the div to card
    
    let newP = document.createElement('p'); //create a <p> element
    newP.innerHTML = title;

    let newA = document.createElement('a');
    newA.innerHTML = "Remove";
    newA.setAttribute("href","#");
    newA.setAttribute("class","card-remove");

    newNote.appendChild(newP);
    newNote.appendChild(newA);
    
    newA.addEventListener('click', this.remove.bind(newNote));
    
    return newNote;
  }
  
  add(){
    // HINT🤩
    // this function should append the note to the screen somehow
    document.querySelector(".notes").appendChild(this.element);
    this.element.classList.add("animated");
    this.element.classList.add("fadeInDown");
  }
  
  saveToStorage(){
    // HINT🤩
    // localStorage only supports strings, not arrays
    // if you want to store arrays, look at JSON.parse and JSON.stringify
    
    let getStorage = JSON.parse(localStorage.getItem('savedNotes'));
    //Shorthand if structure
    const savedNotes = getStorage != null? getStorage : [];
    savedNotes.push(this.title);

    console.log(`This is the array were notes are saved: $(savedNotes)`);
    localStorage.setItem('savedNotes', JSON.stringify(savedNotes));
    console.log(`This is the current local storage: $(localStorage)`);
  }
  
  remove(){
    // HINT🤩 the meaning of 'this' was set by bind() in the createElement function
    // in this function, 'this' will refer to the current note element
    let noteTitle = this.querySelector('p').innerHTML;
    console.log(noteTitle);
    const savedNotes = JSON.parse(localStorage.getItem('savedNotes'));
    savedNotes.splice(savedNotes.indexOf(noteTitle),1);
    localStorage.setItem('savedNotes', JSON.stringify(savedNotes));
    console.log(localStorage);
    
    this.classList.add("animated");
    this.classList.add("fadeOutUp");
    setTimeout(() => {this.remove();}, 1000);
  }
  
}

class App {
  constructor() {
    console.log("👊🏼 The Constructor!");
  
    // HINT🤩
    // clicking the button should work
    // pressing the enter key should also work
    // this.btnAdd = ???
    this.btnAdd = document.querySelector("#btnAddNote");
    this.btnAdd.addEventListener("click", this.createNote.bind(this));
    this.loadNotesFromStorage();
    this.txtAddNote = document.querySelector("#txtAddNote");
    
    //https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
    this.txtAddNote.onkeypress = (e) => {
      if(e.keyCode == 13 || e.which == 13){
        e.preventDefault();
        this.btnAdd.click();
      }
    }
  }
  
  loadNotesFromStorage() {
    // HINT🤩
    // load all notes from storage here and add them to the screen
    // something like note.add() in a loop would be nice
    const savedNotes = JSON.parse(localStorage.getItem('savedNotes'));
    if(savedNotes != null){
      savedNotes.forEach(title => {
        let note = new Note(title);
        note.add();
      });
    }
  }
   
  createNote(e){
    // this function should create a new note by using the Note() class
    let text = document.querySelector("#txtAddNote").value;
    console.log(text);
    let note = new Note(text);
    // HINT🤩
    note.add();
    note.saveToStorage();
    this.reset();
  }
  
  reset(){
    // this function should reset the form and give focus to the input field
    let inputField = document.querySelector("#txtAddNote");
    inputField.value = "";
    inputField.focus();
  }
  
}

let app = new App();