let products = [];

// Load JSON data
async function loadProducts() {
    try {
        const response = await fetch("inventory.json");

        if (!response.ok) {
            throw new Error("Failed to load JSON file");
        }

        products = await response.json();
        displayProducts(products);

    } catch (error) {
        alert("Error loading data: " + error.message);
    }
}

// Display products
function displayProducts(data) {
    const tbody = document.querySelector("#inventoryTable tbody");
    tbody.innerHTML = "";

    let totalInventoryValue = 0;

    data.forEach(product => {
        const totalValue = product.price * product.stock;
        totalInventoryValue += totalValue;

        const row = document.createElement("tr");

        if (product.stock <= 3) {
            row.classList.add("low-stock");
        }

        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>₹${product.price}</td>
            <td>${product.stock}</td>
            <td>₹${totalValue}</td>
            <td>
                <button class="delete-btn" onclick="deleteProduct(${product.id})">
                    Delete
                </button>
            </td>
        `;

        tbody.appendChild(row);
    });

    document.getElementById("totalValueDisplay").innerText =
        "Total Inventory Value: ₹" + totalInventoryValue;
}

// Validation
function validateInputs(id, name, category, price, stock) {
    if (!id || !name || !category || !price || !stock) {
        alert("All fields are required!");
        return false;
    }

    if (price <= 0 || stock < 0) {
        alert("Invalid price or stock value!");
        return false;
    }

    return true;
}

// Add product
function addProduct() {
    const id = parseInt(document.getElementById("id").value);
    const name = document.getElementById("name").value.trim();
    const category = document.getElementById("category").value.trim();
    const price = parseFloat(document.getElementById("price").value);
    const stock = parseInt(document.getElementById("stock").value);

    if (!validateInputs(id, name, category, price, stock)) return;

    if (products.find(p => p.id === id)) {
        alert("Product ID already exists!");
        return;
    }

    products.push({ id, name, category, price, stock });
    displayProducts(products);
    clearFields();
}

// Update product
function updateProduct() {
    const id = parseInt(document.getElementById("id").value);
    const price = parseFloat(document.getElementById("price").value);
    const stock = parseInt(document.getElementById("stock").value);

    const product = products.find(p => p.id === id);

    if (!product) {
        alert("Product not found!");
        return;
    }

    if (price) product.price = price;
    if (stock >= 0) product.stock = stock;

    displayProducts(products);
    clearFields();
}

// Delete product
function deleteProduct(id) {
    products = products.filter(p => p.id !== id);
    displayProducts(products);
}

// Search by category
function searchProduct() {
    const category = document.getElementById("searchCategory").value.trim().toLowerCase();

    const filtered = products.filter(p =>
        p.category.toLowerCase() === category
    );

    displayProducts(filtered);
}

// Reset search
function resetSearch() {
    displayProducts(products);
    document.getElementById("searchCategory").value = "";
}

// Clear fields
function clearFields() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("category").value = "";
    document.getElementById("price").value = "";
    document.getElementById("stock").value = "";
}

window.onload = loadProducts;
