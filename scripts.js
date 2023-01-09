// Create Title
function createTitle(text) {
  var title = document.createElement("h1");
  title.classList.add("text-2xl");
  title.innerText = text;
  title.addEventListener('dblclick', editTitleText);
  return title;
}

// Title Change
function editTitleText() {
  const currentText = this.innerText;
  
  // Create an input element
  const input = document.createElement('input');
  input.value = currentText;
  
  this.parentNode.insertBefore(input, this);
  this.style.display = 'none';
  
  // Save changes when the input element loses focus
  input.addEventListener('blur', saveTitleChanges);
}

function saveTitleChanges() {
  const newText = this.value;
  parentt = this.parentNode; 
  parentt.removeChild(this);
  parentt.insertBefore(createTitle(newText), parentt.firstChild);
}

// Create li
function createLi(text) {
  var title = document.createElement("li");
  title.innerText = text;
  title.addEventListener('dblclick', editLiText);
  return title;
}

// Li Change
function editLiText() {
  const currentText = this.innerText;
  
  // Create an input element
  const input = document.createElement('input');
  input.value = currentText;
  
  this.parentNode.insertBefore(input, this);
  this.style.display = 'none';
  
  // Save changes when the input element loses focus
  input.addEventListener('blur', saveLiChanges);
}

function saveLiChanges() {
  const newText = this.value;
  nextLi = this.nextSibling;
  parentt = this.parentNode; 
  parentt.removeChild(this);
  parentt.insertBefore(createLi(newText), nextLi);
}


// Button Box
const button = document.getElementById("add-box-button");
var num = 1;

button.addEventListener('click', () => {
  // create and define new box/container
  var newBox = document.createElement("div");
  newBox.classList.add("element");
  newBox.id = num;

  // adding title
  var title = createTitle("New title");
  newBox.appendChild(title);

  // adding unordered list
  var ul = document.createElement("ul");
  var liFirst = document.createElement("li");
  var liButton = document.createElement('button'); //ADD TEXT
  liButton.classList.add('text-2xl');
  liButton.textContent = "+";
  liButton.addEventListener('click', () => {
    var newLi = createLi("New item");
    ul.insertBefore(newLi, liFirst);
  });
  liFirst.appendChild(liButton);

  // button to add li
  ul.appendChild(liFirst);
  newBox.appendChild(ul);

  // insert new box
  const boxes = document.getElementById("boxes");
  boxes.insertBefore(newBox, button);

  num++;
});


