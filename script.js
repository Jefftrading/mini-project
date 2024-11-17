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

// Toggle between the Signup and Login forms
function toggleForm(formType) {
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');
  
  if (formType === 'signup') {
      signupForm.style.display = 'block';
      loginForm.style.display = 'none';
  } else {
      signupForm.style.display = 'none';
      loginForm.style.display = 'block';
  }
}

// Handle Signup Form
function handleSignup(event) {
  event.preventDefault();
  
  const fullName = document.getElementById('signupFullName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('signupConfirmPassword').value;

  // Simple validation
  if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return false;
  }

  if (fullName === '' || email === '' || password === '') {
      alert('Please fill in all fields');
      return false;
  }

  // If validation passes, show success message
  alert('Account created successfully!');
  
  // Clear form fields
  document.getElementById('signup').reset();

  // Switch to Login Form
  toggleForm('login');
}

// Handle Login Form
function handleLogin(event) {
  event.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  // Simple validation
  if (email === '' || password === '') {
      alert('Please enter both email and password');
      return false;
  }

  // Normally, here you would verify credentials via an API or backend
  alert('Logged in successfully!');
  
  // Clear form fields
  document.getElementById('login').reset();

  // Redirect to the main page (or dashboard)
  window.location.href = 'dashboard.html'; // Change this to your dashboard page URL
}