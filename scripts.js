const mdFiles = ['file1.md', 'file2.md', 'file3.md']; // Replace with your .md filenames
const boxesContainer = document.getElementById('boxesContainer');

mdFiles.forEach((filename) => {
    fetch(filename)
        .then((response) => response.text())
        .then((markdown) => {
            const box = createBox(filename, markdown);
            boxesContainer.appendChild(box);
        });
});

function createBox(title, markdown) {
    const box = document.createElement('div');
    box.classList.add('bg-white', 'rounded', 'shadow', 'p-4');

    const boxTitle = document.createElement('h2');
    boxTitle.classList.add('text-xl', 'font-bold', 'mb-4');
    boxTitle.textContent = title;
    box.appendChild(boxTitle);

    const markdownHtml = marked(markdown);
    const markdownContent = document.createElement('div');
    markdownContent.innerHTML = markdownHtml;
    box.appendChild(markdownContent);

    return box;
}
