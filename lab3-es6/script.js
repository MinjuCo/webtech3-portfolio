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
  }
  
  saveToStorage(){
    // HINT🤩
    // localStorage only supports strings, not arrays
    // if you want to store arrays, look at JSON.parse and JSON.stringify
    
    let getStorage = JSON.parse(localStorage.getItem('savedNotes'));
    //Shorthand if structure
    const savedNotes = getStorage != null? getStorage : [];
    savedNotes.push(this.title);

    console.log(savedNotes);
    localStorage.setItem('savedNotes', JSON.stringify(savedNotes));
    console.log(localStorage);
  }
  
  remove(){
    // HINT🤩 the meaning of 'this' was set by bind() in the createElement function
    // in this function, 'this' will refer to the current note element
    let title = this.querySelector('p').innerHTML;
    console.log(title);
    this.removeFromStorage(title);
    this.remove();
  }
  
  removeFromStorage(title){
    const savedNotes = JSON.parse(localStorage.getItem('savedNotes'));
    savedNotes.splice(savedNotes.indexOf(title),1);
    localStorage.setItem('savedNotes', savedNotes);
    console.log(localStorage);
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
  }
  
  loadNotesFromStorage() {
    // HINT🤩
    // load all notes from storage here and add them to the screen
    // something like note.add() in a loop would be nice
    const savedNotes = JSON.parse(localStorage.getItem('savedNotes'));
    for(let title of savedNotes){
      let note = new Note(title);
      note.add();
    }
  }
   
  createNote(e){
    // this function should create a new note by using the Note() class
    let text = document.querySelector("#txtAddNote").value;
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