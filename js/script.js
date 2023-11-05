document.addEventListener("DOMContentLoaded", function () {
    const bookList = document.getElementById("book-list");
    const addBookForm = document.getElementById("add-book-form");
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const searchResults = document.getElementById("search-results");
    const errorMessage = document.getElementById("error-message");

    const books = [
        {title: "To Kill a Mockingbird", author: "Harper Lee",isbn: "789-345235"},
        { title: "The Great Gatsby", author: "F. Scott Fitzgerald",isbn: "789-352543"},
        { title: "Moby-Dick", author: "Herman Melville", isbn: "678-234565"}
    ];

    renderBookList();

    addBookForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const isbn = document.getElementById("isbn").value;

        if (isDuplicate(isbn)) {
            errorMessage.classList.remove("hidden");
            return;
        }

        const newBook = { title, author, isbn };
        books.push(newBook);

        errorMessage.classList.add("hidden");

        renderBookList();
        clearAddBookForm();
    });

    searchButton.addEventListener("click", function () {
        searchBooks();
    });

    function isDuplicate(isbn) {
        return books.some((book) => book.isbn === isbn);
    }

    function renderBookList() {
        bookList.innerHTML = books.map((book) => `<li>${book.title} - ${book.author}</li>`).join("");
    }

    function clearAddBookForm() {
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("isbn").value = "";
    }

    function searchBooks() {
        const searchTerm = searchInput.value.toLowerCase();

        const results = books.filter((book) =>
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            book.isbn.toLowerCase().includes(searchTerm)
        );

        renderSearchResults(results);
    }


    function renderSearchResults(results) {
        searchResults.innerHTML = results.map((book) => `<li>${book.title} - ${book.author}</li>`).join("");
    }
});
