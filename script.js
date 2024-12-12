// Smooth Scroll Functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Modal Functionality
const modalTriggers = document.querySelectorAll('[data-modal]');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close');

// Open Modal
modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', function () {
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
        }
    });
});

// Close Modal
closeButtons.forEach(button => {
    button.addEventListener('click', function () {
        const modal = this.closest('.modal');
        if (modal) {
            modal.style.display = 'none';
        }
    });
});

// Close modal when clicking outside of it
window.addEventListener('click', function (event) {
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Cart Functionality
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Add to Cart Function
export function addToCart(productName, productPrice) {
    const existingItem = cartItems.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity++; // Increment quantity if item already exists
    } else {
        cartItems.push({ name: productName, price: productPrice, quantity: 1 });
    }

    // Update local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Update the cart button badge
    updateCartCount();

    // Show a notification
    showNotification(`${productName} added to the cart!`);
}

// Update Cart Count Function
export function updateCartCount() {
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) { // Check if cart button exists
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        const cartCount = cartBtn.querySelector('#cart-count');
        if (cartCount) { // Check if cart count element exists
            cartCount.textContent = totalItems;
        }
    } else {
        console.error('Cart button not found in the DOM.');
    }
}

// Show Notification Function
function showNotification(message) {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create a notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: '#008080',
        color: '#fff',
        padding: '1rem',
        borderRadius: '10px',
        zIndex: '100',
        opacity: '0',
        transition: 'opacity 0.5s',
    });

    // Append the notification to the body
    document.body.appendChild(notification);

    // Fade in the notification
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 100);

    // Remove the notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Attach event listeners to "Add to Cart" buttons
document.querySelectorAll('.product-card button').forEach(button => {
    button.addEventListener('click', function () {
        const productName = this.parentElement.querySelector('h3').textContent;
        const productPrice = parseFloat(this.parentElement.querySelector('p').textContent.replace('$', ''));
        addToCart(productName, productPrice);
    });
});

window.onload = function() {
    updateCartCount();
    // displayCartItems();
    // calculateTotals();
};

// Search Functionality
window.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-bar'); // Update to the correct ID
    if (searchInput) {
        searchInput.addEventListener('keyup', function () {
            const query = this.value.toLowerCase().trim();
            const productCards = document.querySelectorAll('.product-card');

            // Filter the products based on the search query
            productCards.forEach(card => {
                const productName = card.querySelector('h3').textContent.toLowerCase();
                // Show or hide card based on search query
                if (productName.includes(query) || query === '') {
                    card.style.display = ''; // Show card if it matches
                } else {
                    card.style.display = 'none'; // Hide card if it doesn't match
                }
            });

            // Display message if no products match the search query
            const searchResultsContainer = document.getElementById('search-results');
            const visibleProducts = Array.from(productCards).filter(card => card.style.display !== 'none');
            if (visibleProducts.length === 0) {
                searchResultsContainer.textContent = 'No products found.';
                searchResultsContainer.style.display = 'block';
            } else {
                searchResultsContainer.textContent = '';
                searchResultsContainer.style.display = 'none';
            }
        });
    } else {
        console.error('Search input element not found in the DOM.');
    }
});