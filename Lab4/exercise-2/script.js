const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");
const loader = document.getElementById("loader");

let debounceTimer;

// Debounce function
function debounce(func, delay) {
    return function (...args) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
}

// Fetch products and filter
function searchProducts(query) {

    if (query.trim() === "") {
        resultsDiv.innerHTML = "";
        return;
    }

    loader.classList.remove("hidden");
    resultsDiv.innerHTML = "";

    fetch("products.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            loader.classList.add("hidden");

            const filtered = data.products.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase())
            );

            if (filtered.length === 0) {
                resultsDiv.innerHTML =
                    `<p class="no-results">No results found</p>`;
                return;
            }

            filtered.forEach(product => {
                const productDiv = document.createElement("div");
                productDiv.classList.add("product");

                productDiv.innerHTML = `
                    <h3>${product.name}</h3>
                    <p><strong>Price:</strong> ₹${product.price}</p>
                    <p><strong>Category:</strong> ${product.category}</p>
                `;

                resultsDiv.appendChild(productDiv);
            });
        })
        .catch(error => {
            loader.classList.add("hidden");
            resultsDiv.innerHTML =
                `<p class="no-results">Error loading products. Please try again.</p>`;
        });
}

// Apply debouncing (500ms delay)
searchInput.addEventListener("input",
    debounce(function () {
        searchProducts(this.value);
    }, 500)
);
