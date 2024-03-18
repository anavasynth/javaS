const products = new Map();
const productHistory = new WeakMap();

let productIdCounter = 1;
let orderIdCounter = 1;
const orders = new Set();


const productForm = document.getElementById("productForm");
productForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const productName = document.getElementById("productName").value;
    const productPrice = parseFloat(document.getElementById("productPrice").value);
    const productQuantity = parseInt(document.getElementById("productQuantity").value);
    addProduct(productIdCounter++, productName, productPrice, productQuantity);
    productForm.reset();
});

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function() {
    renderProductTable();
});

function renderProductTable() {
    const productTableBody = document.getElementById("productTableBody");
    productTableBody.innerHTML = "";
    const searchValue = searchInput.value.toLowerCase();
    products.forEach((product, productId) => {
        if (product.name.toLowerCase().includes(searchValue)) {
            const history = productHistory.get(product);
            const row = document.createElement("tr");
            row.innerHTML = `
                    <td>${productId}</td>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td>${product.quantity}</td>
                    <td>
                        <button onclick="removeProduct(${productId})">Remove</button>
                        <button onclick="updateProduct(${productId})">Update</button>
                    </td>
                `;
            productTableBody.append(row);

            const historyRow = document.createElement("tr");
            const historyCell = document.createElement("td");
            historyCell.colSpan = "5";
            historyCell.innerHTML = "<strong>Історія:</strong><br>";
            history.forEach((change, index) => {
                historyCell.innerHTML += `<span>${index + 1}. Назва: ${change.name}, Ціна: ${change.price}, Кількість: ${change.quantity}</span><br>`;
            });
            historyRow.appendChild(historyCell);
            productTableBody.appendChild(historyRow);

            console.log(products);
            console.log(productHistory);
        }
    });
}

function addProduct(productId, name, price, quantity) {
    products.set(productId, { name, price, quantity });
    productHistory.set(products.get(productId), []);
    renderProductTable();
}

function removeProduct(productId) {
    const product = products.get(productId);
    const history = productHistory.get(product);
    if (product && history) {
        products.delete(productId);
        productHistory.delete(product);
        renderProductTable();
    }
}

function updateProduct(productId) {
    const product = products.get(productId);
    const history = productHistory.get(product);
    if (product && history) {
        const newName = prompt("Enter new name:", product.name);
        const newPrice = parseFloat(prompt("Enter new price:", product.price));
        const newQuantity = parseInt(prompt("Enter new quantity:", product.quantity));
        if (newName && !isNaN(newPrice) && !isNaN(newQuantity)) {
            const changes = { name: product.name, price: product.price, quantity: product.quantity };
            history.push(changes);
            product.name = newName;
            product.price = newPrice;
            product.quantity = newQuantity;
            renderProductTable();
        }
    }
}

const orderForm = document.getElementById("orderForm");
orderForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const productId = parseInt(document.getElementById("orderProductId").value);
    const quantity = parseInt(document.getElementById("orderQuantity").value);
    placeOrder(productId, quantity);
    orderForm.reset();
});

function placeOrder(productId, quantity) {
    const product = products.get(productId);
    if (product && product.quantity >= quantity) {
        product.quantity -= quantity;
        orders.add({ orderId: orderIdCounter++, productId, quantity });
        renderProductTable();
        renderOrderTable();
    } else {
        alert("Немає стільки товарів");
    }
}

function renderOrderTable() {
    const orderTableBody = document.getElementById("orderTableBody");
    orderTableBody.innerHTML = "";
    orders.forEach((order) => {
        const product = products.get(order.productId);
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${order.orderId}</td>
            <td>${product.name}</td>
            <td>${order.quantity}</td>
            <td>${product.price * order.quantity}</td>
        `;
        orderTableBody.append(row);
    });
}
