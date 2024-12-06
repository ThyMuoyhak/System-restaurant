// Sample list of products (food items)
const products = [
    { id: 1, name: "សាច់គោទឹកប្រហុក", price: 5.99, image: "https://www.shutterstock.com/image-photo/beef-prohok-sauce-cambodia-food-260nw-2471213891.jpg" },
    { id: 2, name: "សាច់ឆ្អឹងជីនីជ្រូក", price: 9.99, image: "https://nextfoodstop.wordpress.com/wp-content/uploads/2015/06/20150615_120829.jpg?w=584&h=329" },
    { id: 3, name: "បាយឡុកឡាក់", price: 7.49, image: "https://images.deliveryhero.io/image/fd-kh/Products/2075160.jpg?width=%s" },
    { id: 4, name: "បាយឡុកឡាក់", price: 4.49, image: "https://www.fodors.com/ee/images/article/lok_lak.jpg" },
    { id: 5, name: "ឆាក្ដៅសាច់មាន់", price: 4.49, image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiQHyIqx7OVgcU7-f5PTPSm22PaCx8mV7zuxN9wNyYGwW8jTsTr_P0K18Y5YFYQJfLVFVebNxsk00iq7iaoH0cVRhJbDrfJf7nwQUARJXlUYwa8ZvFnZOMCZEJtTu47kXiOXwHc02kUG0Ff/s1600/17523360_715923851901546_2171140692656135111_n.jpg" },
    { id: 6, name: "ឆាក្ដៅទាកាប៉ា", price: 4.49, image: "https://storage.googleapis.com/takeapp/media/clyip3rad00070cjt9q411vrp.jpeg" },
];

let cart = [];

// Function to add item to cart
function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    if (product) {
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateOrderSummary();
        showToast(`${product.name} កម្មង់`);
    }
}

// Function to update the order summary and cart sidebar
function updateOrderSummary() {
    const orderDetails = document.getElementById('orderDetails');
    const cartItemsList = document.getElementById('cartItemsList');
    const cartTotal = document.getElementById('orderTotal');
    
    // Clear current order details
    orderDetails.innerHTML = '';
    cartItemsList.innerHTML = '';

    if (cart.length === 0) {
        orderDetails.innerHTML = '<p class="text-gray-500">មិនមានធាតុបន្ថែមនៅឡើយទេ</p>';
        cartTotal.innerHTML = '<p><strong>Total: $0.00</strong></p>';
    } else {
        let totalAmount = 0;

        cart.forEach(item => {
            totalAmount += item.price * item.quantity;

            const orderItem = document.createElement('div');
            orderItem.classList.add('flex', 'items-center', 'space-x-4', 'mb-4');
            orderItem.innerHTML = `
                <img class="w-16 h-16 object-cover rounded-md" src="${item.image}" alt="${item.name}">
                <div class="flex-1">
                    <span class="text-gray-800 font-semibold">${item.name} x ${item.quantity}</span>
                    <span class="block text-gray-500">$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <button onclick="removeFromOrder(${item.id})" class="text-red-500 ml-4 hover:text-red-700 p-2 rounded-md border border-red-500">លុបចេញ</button>
            `;
            orderDetails.appendChild(orderItem);

            const cartItem = document.createElement('li');
            cartItem.classList.add('flex', 'justify-between');
            cartItem.innerHTML = `
                <span>${item.name} x ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            `;
            cartItemsList.appendChild(cartItem);
        });

        cartTotal.innerHTML = `<p><strong>Total: $${totalAmount.toFixed(2)}</strong></p>`;
    }
}

// Function to remove item from cart
function removeFromOrder(productId) {
    const productIndex = cart.findIndex(item => item.id === productId);
    if (productIndex !== -1) {
        cart[productIndex].quantity -= 1;
        if (cart[productIndex].quantity === 0) {
            cart.splice(productIndex, 1);
        }
        updateOrderSummary();
    }
}

// Function to show toast message
function showToast(message) {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.classList.add('bg-green-500', 'text-white', 'p-4', 'rounded-lg', 'shadow-lg', 'mb-4');
    toast.innerText = message;
    toastContainer.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toastContainer.removeChild(toast);
    }, 3000);
}

// Cart button click event
document.getElementById('cartButton').onclick = function() {
    document.getElementById('cartSidebar').style.right = '0';
};

// Close cart sidebar
function closeCartSidebar() {
    document.getElementById('cartSidebar').style.right = '-400px';
}

// Dynamically generate menu items
const menuItemsContainer = document.getElementById('menuItems');
products.forEach(product => {
    const item = document.createElement('div');
    item.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'p-4');
    item.innerHTML = `
        <img class="w-full h-48 object-cover rounded-md" src="${product.image}" alt="${product.name}">
        <h3 class="text-xl font-semibold mt-4">${product.name}</h3>
        <p class="text-gray-600">$${product.price}</p>
        <button onclick="addToCart(${product.id})" class="bg-pink-600 text-white px-4 py-2 mt-4 rounded-md hover:bg-pink-700">
            កម្មង់មុខម្ហូប
        </button>
    `;
    menuItemsContainer.appendChild(item);
});

document.getElementById('checkoutButton').addEventListener('click', () => {
    showLoading('Processing your order...');
    setTimeout(() => {
        showToast('Your order was successful! Thank you for your purchase.');
        hideLoading();
    }, 2000); // Simulate a 2-second processing delay
});

document.getElementById('checkoutButtonSidebar').addEventListener('click', () => {
    showLoading('Processing your order...');
    setTimeout(() => {
        showToast('Your order was successful! Thank you for your purchase.');
        hideLoading();
    }, 2000);
});

// Show loading spinner
function showLoading(message) {
    const toastContainer = document.getElementById('toastContainer');
    const loadingToast = document.createElement('div');
    loadingToast.id = 'loadingToast';
    loadingToast.classList.add('bg-gray-900', 'text-white', 'p-4', 'rounded-lg', 'shadow-lg', 'flex', 'items-center', 'space-x-2');
    loadingToast.innerHTML = `
        <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
        <span>${message}</span>
    `;
    toastContainer.appendChild(loadingToast);
}

// Hide loading spinner
function hideLoading() {
    const loadingToast = document.getElementById('loadingToast');
    if (loadingToast) {
        loadingToast.remove();
    }
}

// Show toast message
function showToast(message) {
    const toastContainer = document.getElementById('toastContainer');
    const successToast = document.createElement('div');
    successToast.classList.add('bg-green-500', 'text-white', 'p-4', 'rounded-lg', 'shadow-lg', 'mb-4');
    successToast.innerText = message;
    toastContainer.appendChild(successToast);

    // Remove toast after 3 seconds
    setTimeout(() => {
        successToast.remove();
    }, 3000);
}


document.getElementById('checkoutButton').addEventListener('click', () => {
    openModal();
});

document.getElementById('checkoutButtonSidebar').addEventListener('click', () => {
    openModal();
});

// Open modal
function openModal() {
    const modal = document.getElementById('userFormModal');
    modal.classList.remove('hidden');
}

// Close modal
function closeModal() {
    const modal = document.getElementById('userFormModal');
    modal.classList.add('hidden');
}

// Handle form submission
document.getElementById('userForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const phone = document.getElementById('phone').value;
    const table = document.getElementById('table').value;

    // Process the form data (e.g., send it to the server or display it)
    console.log({ name, gender, phone, table });

    // Close the modal after submission
    closeModal();

    // Show a success message
    showToast('Your order has been placed successfully!');
});


// Handle the form submission
document.getElementById('userForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const phone = document.getElementById('phone').value;
    const table = document.getElementById('table').value;

    // Payload for submission
    const payload = {
        name,
        gender,
        phone,
        table,
    };

    // Send data to the backend
    const response = await fetch('/submit_order.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (result.status === 'success') {
        // Redirect to summary page
        window.location.href = 'summary.html';
    } else {
        alert('Error submitting order. Please try again.');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    let cart = [];
    const cartButton = document.getElementById('cartButton');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartItemsList = document.getElementById('cartItemsList');
    const cartTotal = document.getElementById('cartTotal');
    const orderDetails = document.getElementById('orderDetails');
    const orderTotal = document.getElementById('orderTotal');

    // Handle Add to Cart
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));

            // Add item to cart
            const item = { id, name, price };
            cart.push(item);
            updateCart();
            showToast(`Added ${name} to the cart!`);
        });
    });

    // Update cart display
    function updateCart() {
        cartItemsList.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = 'flex justify-between items-center';
            listItem.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
            `;
            cartItemsList.appendChild(listItem);
            total += item.price;
        });

        cartTotal.innerHTML = `<p class="font-semibold text-lg"><strong>Total: $${total.toFixed(2)}</strong></p>`;
        orderTotal.innerHTML = `<p><strong>Total: $${total.toFixed(2)}</strong></p>`;
    }

    // Open the cart sidebar
    cartButton.addEventListener('click', function() {
        cartSidebar.style.right = '0';
    });

    // Close the cart sidebar
    function closeCartSidebar() {
        cartSidebar.style.right = '-400px';
    }

    document.getElementById('checkoutButton').addEventListener('click', function() {
        const userDetails = {
            name: document.getElementById('name').value,
            gender: document.getElementById('gender').value,
            phone: document.getElementById('phone').value,
            table: document.getElementById('table').value
        };
    
        // Store user details and cart data in localStorage
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        localStorage.setItem('orderItems', JSON.stringify(cart)); // Assuming cart holds the items
    
        // Redirect to Order Summary page
        window.location.href = 'order_summary.html';
    });
    

    // Show Toast Notification
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'bg-green-500 text-white p-2 rounded-md mb-2';
        toast.textContent = message;
        document.getElementById('toastContainer').appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    // Close Cart Sidebar
    function closeCartSidebar() {
        cartSidebar.style.right = '-400px';
    }
});



