// cart.js

// Initialize cartItems at the top
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Import the updateCartCount function
import { updateCartCount } from './script.js';

function removeItem(productName) {
    const itemIndex = cartItems.findIndex(item => item.name === productName);
    if (itemIndex > -1) {
        if (cartItems[itemIndex].quantity > 1) {
            // If more than one item exists, decrease the quantity by 1
            cartItems[itemIndex].quantity--;
        } else {
            // If quantity is 1, remove the item from the cart
            cartItems.splice(itemIndex, 1);
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        displayCartItems();
        calculateTotals();
        updateCartCount();
    }
}

function calculateTotals() {
    const totalPriceElement = document.getElementById('total-price');
    const taxesElement = document.getElementById('taxes');
    const grandTotalElement = document.getElementById('grand-total');

    // Check if elements are available
    if (!totalPriceElement || !taxesElement || !grandTotalElement) {
        console.error('One or more total elements not found in the DOM.');
        return;
    }

    let total = 0;

    cartItems.forEach(item => {
        total += item.price * item.quantity;
    });

    const taxes = total * 0.0885;
    const grandTotal = total + taxes;

    totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
    taxesElement.textContent = `Taxes (8.85%): $${taxes.toFixed(2)}`;
    grandTotalElement.textContent = `Grand Total: $${grandTotal.toFixed(2)}`;
}

function displayCartItems() {
    const cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = ''; // Clear the list first

    cartItems.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity} <button class="remove">Remove</button>`;
        cartItemsList.appendChild(cartItem);
    });

    // Remove previous event listeners to prevent multiple triggers
    cartItemsList.removeEventListener('click', handleRemove);
    cartItemsList.addEventListener('click', handleRemove);
}

function handleRemove(event) {
    if (event.target.classList.contains('remove')) {
        const productName = event.target.parentElement.firstChild.nodeValue.split(' - ')[0].trim();
        removeItem(productName);
    }
}

// On page load, display cart items and calculate totals
window.onload = function() {
    displayCartItems();
    calculateTotals();
};

// Alternatively, use DOMContentLoaded to ensure everything is loaded
document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();
    calculateTotals();
});