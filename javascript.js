const tableBody = document.querySelector("#book-table tbody");
        const form = document.getElementById("book-form");

        function loadBooks() {
            fetch("http://localhost:3000/books")
                .then(res => res.json())
                .then(data => {
                    tableBody.innerHTML = "";
                    data.forEach(book => {
                        const row = document.createElement("tr");
                        row.innerHTML = `
                            <td>${book.id}</td>
                            <td>${book.title}</td>
                            <td>${book.author}</td>
                            <td>
                                <button class="update-btn" onclick="updateBook(${book.id})">Update</button>
                                <button class="delete-btn" onclick="deleteBook(${book.id})">Delete</button>
                            </td>
                        `;
                        tableBody.appendChild(row);
                    });
                })
                .catch(err => console.error(err));
        }

        loadBooks();

        form.addEventListener("submit", e => {
            e.preventDefault();
            const title = document.getElementById("title").value;
            const author = document.getElementById("author").value;

            fetch("http://localhost:3000/books", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, author })
            })
                .then(res => res.json())
                .then(() => {
                    form.reset();
                    loadBooks();
                });
        });

        function deleteBook(id) {
            fetch(`http://localhost:3000/books/${id}`, { method: "DELETE" })
                .then(res => res.json())
                .then(() => loadBooks());
        }

        function updateBook(id) {
            const newTitle = prompt("Enter new title:");
            const newAuthor = prompt("Enter new author:");
            if (!newTitle || !newAuthor) return;

            fetch(`http://localhost:3000/books/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: newTitle, author: newAuthor })
            })
                .then(res => res.json())
                .then(() => loadBooks());
        }