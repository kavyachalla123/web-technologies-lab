const tableBody = document.getElementById("bookTable");
const form = document.getElementById("bookForm");
const message = document.getElementById("message");

let xmlDoc;

// LOAD XML USING AJAX GET
function loadBooks() {

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "books.xml", true);

    xhr.onload = function () {
        if (xhr.status === 200) {

            if (!xhr.responseXML) {
                showMessage("Malformed XML file.", "error");
                return;
            }

            xmlDoc = xhr.responseXML;
            displayBooks();
            showMessage("Books loaded successfully (200 OK)", "success");

        } else {
            showMessage("Error loading XML file.", "error");
        }
    };

    xhr.onerror = function () {
        showMessage("Network error occurred.", "error");
    };

    xhr.send();
}

// DISPLAY BOOKS
function displayBooks() {
    tableBody.innerHTML = "";

    const books = xmlDoc.getElementsByTagName("book");

    for (let i = 0; i < books.length; i++) {

        const id = books[i].getElementsByTagName("id")[0].textContent;
        const title = books[i].getElementsByTagName("title")[0].textContent;
        const author = books[i].getElementsByTagName("author")[0].textContent;
        const status = books[i].getElementsByTagName("status")[0].textContent;

        const statusClass = status === "Available" ? "available" : "issued";

        tableBody.innerHTML += `
            <tr>
                <td>${id}</td>
                <td>${title}</td>
                <td>${author}</td>
                <td class="${statusClass}">${status}</td>
                <td>
                    <button onclick="toggleStatus(${i})">Toggle Status</button>
                    <button onclick="deleteBook(${i})">Delete</button>
                </td>
            </tr>
        `;
    }
}

// ADD BOOK
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("bookId").value.trim();
    const title = document.getElementById("bookTitle").value.trim();
    const author = document.getElementById("bookAuthor").value.trim();
    const status = document.getElementById("bookStatus").value;

    if (!id || !title || !author) {
        showMessage("All fields are required.", "error");
        return;
    }

    const books = xmlDoc.getElementsByTagName("book");

    // Validation: prevent duplicate ID
    for (let i = 0; i < books.length; i++) {
        if (books[i].getElementsByTagName("id")[0].textContent === id) {
            showMessage("Book ID already exists.", "error");
            return;
        }
    }

    const newBook = xmlDoc.createElement("book");

    newBook.innerHTML = `
        <id>${id}</id>
        <title>${title}</title>
        <author>${author}</author>
        <status>${status}</status>
    `;

    xmlDoc.getElementsByTagName("library")[0].appendChild(newBook);

    displayBooks();
    showMessage("Book added successfully.", "success");
    form.reset();
});

// UPDATE STATUS
function toggleStatus(index) {

    const books = xmlDoc.getElementsByTagName("book");
    const statusNode = books[index].getElementsByTagName("status")[0];

    statusNode.textContent =
        statusNode.textContent === "Available" ? "Issued" : "Available";

    displayBooks();
    showMessage("Book status updated.", "success");
}

// DELETE BOOK
function deleteBook(index) {

    const books = xmlDoc.getElementsByTagName("book");
    const book = books[index];

    book.parentNode.removeChild(book);

    displayBooks();
    showMessage("Book deleted successfully.", "success");
}

function showMessage(text, type) {
    message.textContent = text;
    message.className = type;
}

// INITIAL LOAD
loadBooks();
