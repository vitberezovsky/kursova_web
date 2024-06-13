let products = [];

function openModal(action, index = null) {
    document.getElementById('productModal').style.display = 'flex';
    document.getElementById('modalTitle').innerText = action === 'add' ? 'Add Product' : 'Edit Product';
    if (action === 'edit' && index !== null) {
        const product = products[index];
        document.getElementById('productId').value = index;
        document.getElementById('productName').value = product.name;
        document.getElementById('productManufacturer').value = product.manufacturer;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productSize').value = product.size;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productMaterials').value = product.materials;
    } else {
        document.getElementById('productId').value = '';
        document.getElementById('productName').value = '';
        document.getElementById('productManufacturer').value = '';
        document.getElementById('productCategory').value = 'mini ITX';
        document.getElementById('productSize').value = 'small';
        document.getElementById('productPrice').value = '';
        document.getElementById('productMaterials').value = 'метал';
    }
}

function closeModal() {
    document.getElementById('productModal').style.display = 'none';
}

function saveProduct() {
    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value;
    const manufacturer = document.getElementById('productManufacturer').value;
    const category = document.getElementById('productCategory').value;
    const size = document.getElementById('productSize').value;
    const price = document.getElementById('productPrice').value;
    const materials = document.getElementById('productMaterials').value;
    const image = document.getElementById('productImage').files[0];

    let isValid = true;

    if (name.trim() === '') {
        document.getElementById('productNameError').innerText = 'Name is required';
        isValid = false;
    } else {
        document.getElementById('productNameError').innerText = '';
    }

    if (manufacturer.trim() === '') {
        document.getElementById('productManufacturerError').innerText = 'Manufacturer is required';
        isValid = false;
    } else {
        document.getElementById('productManufacturerError').innerText = '';
    }

    if (category.trim() === '') {
        document.getElementById('productCategoryError').innerText = 'Category is required';
        isValid = false;
    } else {
        document.getElementById('productCategoryError').innerText = '';
    }

    if (size.trim() === '') {
        document.getElementById('productSizeError').innerText = 'Size is required';
        isValid = false;
    } else {
        document.getElementById('productSizeError').innerText = '';
    }

    if (price.trim() === '' || isNaN(price) || price <= 0) {
        document.getElementById('productPriceError').innerText = 'Valid price is required';
        isValid = false;
    } else {
        document.getElementById('productPriceError').innerText = '';
    }

    if (materials.trim() === '') {
        document.getElementById('productMaterialsError').innerText = 'Materials are required';
        isValid = false;
    } else {
        document.getElementById('productMaterialsError').innerText = '';
    }

    if (isValid) {
        const product = {
            name,
            manufacturer,
            category,
            size,
            price: parseFloat(price),
            materials,
            image: image ? URL.createObjectURL(image) : ''
        };

        if (id) {
            products[id] = product;
        } else {
            products.push(product);
        }

        closeModal();
        displayProducts();
    }
}

function displayProducts() {
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = '';
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Manufacturer: ${product.manufacturer}</p>
            <p>Category: ${product.category}</p>
            <p>Size: ${product.size}</p>
            <p>Price: $${product.price.toFixed(2)}</p>
            <p>Materials: ${product.materials}</p>
            <button onclick="openModal('edit', ${index})">Edit</button>
            <button onclick="deleteProduct(${index})">Delete</button>
        `;
        productContainer.appendChild(productCard);
    });
}

function deleteProduct(index) {
    products.splice(index, 1);
    displayProducts();
}

function filterProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
    displayFilteredProducts(filteredProducts);
}

function displayFilteredProducts(filteredProducts) {
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = '';
    filteredProducts.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Manufacturer: ${product.manufacturer}</p>
            <p>Category: ${product.category}</p>
            <p>Size: ${product.size}</p>
            <p>Price: $${product.price.toFixed(2)}</p>
            <p>Materials: ${product.materials}</p>
            <button onclick="openModal('edit', ${index})">Edit</button>
            <button onclick="deleteProduct(${index})">Delete</button>
        `;
        productContainer.appendChild(productCard);
    });
}

function sortProducts() {
    const sortBy = document.getElementById('sortSelect').value;
    if (sortBy === 'name-asc') {
        products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
        products.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'price-asc') {
        products.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
        products.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'category') {
        products.sort((a, b) => a.category.localeCompare(b.category));
    }
    displayProducts();
}

function filterByCategory() {
    const selectedCategory = document.getElementById('filterCategory').value;
    if (selectedCategory === '') {
        displayProducts();
    } else {
        const filteredProducts = products.filter(product => product.category === selectedCategory);
        displayFilteredProducts(filteredProducts);
    }
}