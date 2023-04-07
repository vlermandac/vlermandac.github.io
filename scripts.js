$(document).ready(function () {
  const storageKey = "boxes";
  const $boxes = $("#boxes");
  const $addBoxButton = $("#add-box-button");

  function loadBoxes() {
    const savedBoxes = JSON.parse(localStorage.getItem(storageKey)) || [];
    savedBoxes.forEach((box) => {
      createBox(box.title, box.items);
    });
  }

  function saveBoxes() {
    const boxesData = $boxes
      .children()
      .map(function () {
        const $box = $(this);
        const title = $box.find(".box-title").text();
        const items = $box
          .find("ul")
          .children()
          .map(function () {
            return $(this).text();
          })
          .get();
        return { title, items };
      })
      .get();
    localStorage.setItem(storageKey, JSON.stringify(boxesData));
  }

  function createBox(title, items = []) {
    const $box = $(`
      <div class="box p-4 border border-gray-300 rounded">
        <h2 class="box-title text-xl mb-4" contenteditable="true">${title}</h2>
        <ul class="list-disc list-inside mb-4"></ul>
        <button class="add-item-button text-lg px-2 py-1 bg-blue-500 text-white rounded">Add Item</button>
      </div>
    `);

    const $list = $box.find("ul");
    items.forEach((item) => {
      $list.append(`<li>${item}</li>`);
    });

    $box.on("dblclick", ".box-title", function () {
      this.contentEditable = "true";
    });

    $box.on("blur", ".box-title", function () {
      this.contentEditable = "false";
      saveBoxes();
    });

    $box.on("click", ".add-item-button", function () {
      const item = prompt("Enter a new item:");
      if (item) {
        $list.append(`<li>${item}</li>`);
        saveBoxes();
      }
    });

    $boxes.append($box);
  }

  $addBoxButton.on("click", function () {
    createBox("New box");
    saveBoxes();
  });

  loadBoxes();
});



