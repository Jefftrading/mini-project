let cart = [];

function addToCart(id, name, price) {
  const product = { id, name, price };
  cart.push(product);
  updateCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

function updateCart() {

  document.getElementById('cart-count').textContent = cart.length;

  const cartItemsList = document.getElementById('cart-items');
  cartItemsList.innerHTML = '';

  let total = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.onclick = () => removeFromCart(item.id);
    li.appendChild(removeButton);
    cartItemsList.appendChild(li);

    total += item.price;
  });

  document.getElementById('cart-total').textContent = total.toFixed(2);
}

function toggleCart() {
  const cartOverlay = document.getElementById('cart-overlay');
  cartOverlay.style.display = cartOverlay.style.display === 'flex' ? 'none' : 'flex';
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const address = document.getElementById('address').value;

  if (!name || !email || !address) {
    alert("Please fill in all checkout details.");
    return;
  }

  alert(`Thank you for your purchase, ${name}! Your order will be shipped to ${address}.`);
  cart = [];
  updateCart();
  toggleCart();
  document.getElementById('checkout-form').reset();
}
