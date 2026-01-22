let cart = [];
let couponDiscount = 0;

// Add product
function addToCart() {
    const productData = document.getElementById("productSelect").value;
    const qty = parseInt(document.getElementById("quantity").value);

    if (!productData || qty <= 0) return;

    const [name, category, price] = productData.split("|");

    cart.push({
        name,
        category,
        price: Number(price),
        quantity: qty
    });

    updateCart();
}

// Remove item
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// Apply coupon using string methods
function applyCoupon() {
    const code = document.getElementById("coupon").value.trim().toUpperCase();

    if (code.startsWith("SAVE")) couponDiscount = 10;
    else if (code.includes("WELCOME")) couponDiscount = 5;
    else couponDiscount = 0;

    updateCart();
}

// Calculate total with rules
function calculateTotal() {
    let total = 0;
    let discountMsg = [];

    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;

        // Bulk discount
        if (item.quantity >= 5) {
            itemTotal *= 0.9;
            discountMsg.push("Bulk Discount Applied");
        }

        // Category discount
        if (item.category === "Electronics") {
            itemTotal *= 0.85;
            discountMsg.push("Electronics Discount");
        } else if (item.category === "Books") {
            itemTotal *= 0.95;
            discountMsg.push("Books Discount");
        }

        total += itemTotal;
    });

    // Time-based discount
    const hour = new Date().getHours();
    if (hour >= 18 && hour <= 21) {
        total *= 0.95;
        discountMsg.push("Evening Discount");
    }

    // Coupon discount
    if (couponDiscount > 0) {
        total *= (1 - couponDiscount / 100);
        discountMsg.push(`Coupon ${couponDiscount}% Applied`);
    }

    document.getElementById("discountInfo").innerText =
        discountMsg.join(", ");

    return Math.round(total);
}

// Update UI dynamically
function updateCart() {
    const body = document.getElementById("cartBody");
    body.innerHTML = "";

    cart.forEach((item, index) => {
        body.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price * item.quantity}</td>
                <td><button onclick="removeItem(${index})">X</button></td>
            </tr>
        `;
    });

    document.getElementById("total").innerText = calculateTotal();
}
