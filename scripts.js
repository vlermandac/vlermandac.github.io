// Create Title
function createTitle(text) {
  var title = document.createElement("h1");
  title.classList.add("text-2xl");
  title.innerText = text;
  title.addEventListener('dblclick', editText);
  return title;
}

// Title Change
function editText() {
  const currentText = this.innerText;
  
  // Create an input element
  const input = document.createElement('input');
  input.value = currentText;
  
  this.parentNode.insertBefore(input, this);
  this.style.display = 'none';
  
  // Save changes when the input element loses focus
  input.addEventListener('blur', saveChanges);
}

function saveChanges() {
  const newText = this.value;
  parentt = this.parentNode; 
  parentt.removeChild(this);
  parentt.appendChild(createTitle(newText));
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

  // button to add li

  // insert new box
  const boxes = document.getElementById("boxes");
  boxes.insertBefore(newBox, button);

  num++;
});


