class BoxManager {
  constructor() {
    this.storageKey = "boxes";
    this.boxesContainer = $("#boxes");
    this.addBoxButton = $("#add-box-button");

    this.addBoxButton.on("click", () => {
      this.createBox("New box");
      this.saveBoxes();
    });

    this.loadBoxes();
  }

  loadBoxes() {
    const savedBoxes = JSON.parse(localStorage.getItem(this.storageKey)) || [];
    savedBoxes.forEach((box) => {
      this.createBox(box.title, box.items);
    });
  }

  saveBoxes() {
    const boxesData = this.boxesContainer
      .children()
      .map(function () {
        const box = $(this);
        const title = box.find(".box-title").text();
        const items = box
          .find("ul")
          .children()
          .map(function () {
            return $(this).text();
          })
          .get();
        return { title, items };
      })
      .get();
    localStorage.setItem(this.storageKey, JSON.stringify(boxesData));
  }

  createBox(title, items = []) {
    const box = $(`
      <div class="box p-4 border border-gray-300 rounded bg-orange-500">
        <h2 class="box-title text-xl mb-4" contenteditable="true">${title}</h2>
        <ul class="list-disc list-inside mb-4"></ul>
        <input class="new-item-input hidden" type="text" placeholder="Enter a new item...">
        <button class="add-item-button text-lg px-2 py-1 bg-blue-500 text-white rounded">
          <i class="fas fa-plus"></i>
        </button>
      </div>
    `);

    const list = box.find("ul");
    items.forEach((item) => {
      list.append(`<li>${item}</li>`);
    });

    box.on("dblclick", ".box-title", function () {
      this.contentEditable = "true";
    });

    box.on("blur", ".box-title", () => {
      this.contentEditable = "false";
      this.saveBoxes();
    });

    box.on("click", ".add-item-button", () => {
      const input = box.find(".new-item-input");
      input.toggleClass("hidden");
      input.focus();
    });

    box.on("keypress", ".new-item-input", (e) => {
      if (e.key === "Enter") {
        const item = $(e.target).val().trim();
        if (item) {
          list.append(`<li>${item}</li>`);
          this.saveBoxes();
        }
        $(e.target).val("");
        $(e.target).addClass("hidden");
      }
    });

    this.boxesContainer.append(box);
  }
}

$(document).ready(function () {
  new BoxManager();
});



