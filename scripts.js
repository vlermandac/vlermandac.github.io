class Title{
  constructor(text, parentBoxID) {
    this.title = document.createElement("h1");
    this.title.classList.add("text-2xl");
    this.title.innerText = text;
    this.parentBoxID = parentBoxID;
    this.title.addEventListener('dblclick', (event) => this.editTitleText(event));
    return this.title;
  }

  editTitleText(event) {
    const input = document.createElement('input');
    var item = event.currentTarget;
    input.value = item.innerText;
    item.parentNode.insertBefore(input, item);
    item.style.display = 'none';
    input.addEventListener('blur', () => {
      var p = input.parentNode;
      p.insertBefore(new Title(input.value, this.parentBoxID), p.firstChild);
      p.removeChild(input);
      localStorage.setItem(this.parentBoxID, this.title.parentNode.outerHTML);
    });
  }
}

class Box {
  constructor(id){
    this.box = document.createElement("div");
    this.box.id = id;
    this.box.classList.add("element");
    this.box.appendChild(new Title("New title", id));
    this.ul = new ItemList(id);
    this.box.appendChild(this.ul.ul);
  }
}

class ItemList {
  constructor(parentBoxID){
    this.id = parentBoxID;
    this.ul = document.createElement("ul");
    this.liFirst = document.createElement("li");
    this.addItemButton = this.addButton(); 
    this.liFirst.appendChild(this.addItemButton);
    this.ul.appendChild(this.liFirst);
  }

  addButton(){
    var button = document.createElement('button');
    button.classList.add('text-2xl');
    button.textContent = "+";
    button.addEventListener('click', () => {
      this.ul.insertBefore(this.addItem("New item"), this.liFirst);
    });
    return button;
  }

  addItem(text){
    var item = document.createElement("li");
    item.innerText = text;
    item.addEventListener('dblclick', (event) => this.editItem(event));
    return item;
  }

  editItem(event){
    const input = document.createElement('input');
    var item = event.currentTarget;
    input.value = item.innerText;
    item.parentNode.insertBefore(input, item);
    item.style.display = 'none';
    input.addEventListener('blur', () => {
      var p = input.parentNode;
      p.insertBefore(this.addItem(input.value), input.nextSibling);
      p.removeChild(input);
      localStorage.setItem(this.id, this.ul.parentNode.outerHTML);
    });
  }

  removeItem(){
  }
}

// MAIN

// grid container
const boxes = document.getElementById("boxes"); 
const button = document.getElementById("add-box-button");

var id = parseInt(localStorage.getItem('counter'));
if(!id) id = 1;

// retrieve stored elements
for (let i = 1; i < id; i++) {
  //element different from id
  if(localStorage.length == 0) break;
  var storedBox = localStorage.getItem(i)
  var newBox = new Box(i);
  newBox.box.innerHTML = storedBox;
  boxes.insertBefore(newBox.box, button);
}

// add listener to add-box button (defined in HTML)
button.addEventListener('click', () => {
  var newBox = new Box(id);
  boxes.insertBefore(newBox.box, button); // guarda la caja vacia con new title
  localStorage.setItem(id, newBox.box.outerHTML);
  id++;
  localStorage.setItem('counter', id);
});


