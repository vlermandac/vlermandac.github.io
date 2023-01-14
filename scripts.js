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
      var tmp = new Title(input.value, this.parentBoxID);
      this.title.parentNode.title = tmp;
      p.insertBefore(tmp, p.firstChild);
      p.removeChild(input);
      localStorage.setItem(this.parentBoxID, this.title.parentNode.outerHTML);
    });
  }
}

class Box {
  constructor(id, title, elements){
    this.box = document.createElement("div");
    this.box.id = id;
    this.box.classList.add("element");
    if(title == undefined) var title = "New title";
    this.title = new Title(title, id);
    this.box.appendChild(this.title);
    if(elements == undefined)
      this.ul = new ItemList(id);
    else
      this.ul = new ItemList(id, elements);
    this.box.appendChild(this.ul.ul);
  }
}

class ItemList {
  constructor(parentBoxID, elements){
    this.id = parentBoxID;
    this.ul = document.createElement("ul");
    this.liFirst = document.createElement("li");
    this.addItemButton = this.addButton(); 
    this.liFirst.appendChild(this.addItemButton);
    this.ul.appendChild(this.liFirst);
    if(elements != undefined)
      elements.forEach((element) => 
        this.ul.insertBefore(this.addItem(element), this.liFirst));
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
      item.parentNode.removeChild(item);
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
  let h1 = newBox.box.querySelector('h1').innerText;
  let ul = newBox.box.querySelector('ul');
  ul.removeChild(ul.lastChild);
  let list = Array.from(ul.children, li => li.innerText);
  console.log(ul);
  console.log(list);
  console.log("***\n");
  var retrievedBox = new Box(i, h1, list);
  boxes.insertBefore(retrievedBox.box, button);
}

// add listener to add-box button (defined in HTML)
button.addEventListener('click', () => {
  var newBox = new Box(id);
  boxes.insertBefore(newBox.box, button); // guarda la caja vacia con new title
  localStorage.setItem(id, newBox.box.outerHTML);
  id++;
  localStorage.setItem('counter', id);
});


