let d = new Date();
document.body.innerHTML = "<h1>Today's date is " + d + "</h1>";

document.getElementById('add-box').addEventListener('click', function(){
  document.getElementById('boxes').classList.add('element');
});



