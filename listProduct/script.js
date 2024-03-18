const productList = document.getElementById('productList');
const filterInput = document.getElementById('filterInput');
const totalPriceElement = document.getElementById('totalPrice');
let totalPrice = 0;

function addProduct() {
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const image = document.getElementById('productImage').value;
    if (name && !isNaN(price) && image) {
        const listItem = document.createElement('li');
        listItem.classList.add('product-item', 'fade-in'); // Додати клас для анімації з'явлення
        listItem.innerHTML = `
            <img src="${image}" alt="${name}">
            <span onclick="editProduct(this)" id="itemName">${name}</span>
            <span class="itemPrice">${price} грн</span>
            <button onclick="removeProduct(this)" id="deleteButton">Видалити</button>
        `;
        productList.append(listItem);
        totalPrice += price;
        totalPriceElement.textContent = `Загальна вартість: ${totalPrice} грн`;
        modal.style.display = 'none'; // закриття модального вікна після додавання товару
    } else {
        alert('Некоректні дані, спробуйте ще раз.');
    }
}

function removeProduct(button) {
    const listItem = button.closest('.product-item');
    const price = parseFloat(listItem.querySelector('.itemPrice').textContent);
    listItem.classList.add('fade-out'); // Додати клас для анімації зникнення

    listItem.addEventListener('animationend', function() {
        productList.removeChild(listItem);
        totalPrice -= price;
        totalPriceElement.textContent = `Загальна вартість: ${totalPrice} грн`;
    }, { once: true });
}

function editProduct(span) {
    const listItem = span.parentElement;
    const name = listItem.querySelector('#itemName').textContent;
    const price = parseFloat(listItem.querySelector('.itemPrice').textContent);

    const editProductName = document.getElementById('editProductName');
    const editProductPrice = document.getElementById('editProductPrice');
    editProductName.value = name;
    editProductPrice.value = price;

    const editModal = document.getElementById('editModal');
    editModal.style.display = 'block';

    const saveEditBtn = document.getElementById('saveEditBtn');
    saveEditBtn.onclick = () => {
        const newName = editProductName.value;
        const newPrice = parseFloat(editProductPrice.value);
        if (newName && !isNaN(newPrice)) {
            const oldPrice = parseFloat(listItem.querySelector('.itemPrice').textContent);
            listItem.querySelector('#itemName').textContent = newName;
            listItem.querySelector('.itemPrice').textContent = `${newPrice} грн`;
            totalPrice += newPrice - oldPrice;
            totalPriceElement.textContent = `Загальна вартість: ${totalPrice} грн`;
            editModal.style.display = 'none';
        } else {
            alert('Некоректні дані, спробуйте ще раз.');
        }
    };

    const closeEditBtn = document.getElementById('close');
    closeEditBtn.onclick = () => {
        editModal.style.display = 'none';
    };
}

filterInput.addEventListener('input', function() {
    const filterText = this.value.toLowerCase();
    const items = document.querySelectorAll('.product-item');
    items.forEach(item => {
        const name = item.querySelector('#itemName').textContent.toLowerCase();
        if (name.includes(filterText)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
});

// Відкриття модального вікна при кліку на кнопку
const addProductBtn = document.getElementById('addProductBtn');
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close');
addProductBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Закриття модального вікна при кліку на кнопку "close"
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Закриття модального вікна при кліку за межами вікна
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
