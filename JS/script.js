// Product Data
const products = [
    { id: 1, name: "M416 Rifle", category: "Rifles", price: 1450, image: "./IMAGES/img-weapons-m416.png", description: "A highly customizable and versatile assault rifle perfect for various engagements. Low recoil and high accuracy." },
    { id: 2, name: "AKM Rifle", category: "Rifles", price: 950, image: "./IMAGES/img-weapons-akm.png", description: "Powerful assault rifle utilizing 7.62mm rounds. High damage output but challenging recoil management." },
    { id: 3, name: "G36C Rifle", category: "Rifles", price: 1100, image: "./IMAGES/img-weapons-g36c.png", description: "Reliable 5.56mm assault rifle, excellent for medium-range combat." },
    { id: 4, name: "GROZA Rifle", category: "Rifles", price: 2100, image: "./IMAGES/img-weapons-groza.png", description: "Bullpup assault rifle with an extremely high rate of fire. Devastating up close." },
    { id: 5, name: "K2 Rifle", category: "Rifles", price: 850, image: "./IMAGES/img-weapons-k2.png", description: "Standard issue 5.56mm rifle, offering a solid balance of stability and damage." },
    { id: 6, name: "MUTANT Rifle", category: "Rifles", price: 1050, image: "./IMAGES/img-weapons-mk47_mutant.png", description: "7.62mm assault rifle with burst and single-fire modes. High damage per shot." },
    { id: 7, name: "QBZ95 Rifle", category: "Rifles", price: 1250, image: "./IMAGES/img-weapons-qbz95.png", description: "Bullpup 5.56mm rifle with minimal recoil and reliable auto-fire." },
    { id: 8, name: "SCAR-L Rifle", category: "Rifles", price: 1300, image: "./IMAGES/img-weapons-scar-l.png", description: "Highly stable 5.56mm assault rifle, easy to control during sustained fire." },

    // Shotguns / Other Rifles
    { id: 9, name: "DBS Shotgun", category: "Rifles", price: 2500, image: "./IMAGES/img-weapons-dbs.png", description: "Double-barrel pump-action shotgun. Lethal at extreme close ranges." },
    { id: 10, name: "O12 Shotgun", category: "Rifles", price: 1950, image: "./IMAGES/img-weapons-o12.png", description: "Automatic shotgun utilizing specialized slugs. Incredible stopping power." },
    { id: 11, name: "M16A4 Rifle", category: "Rifles", price: 1150, image: "./IMAGES/img-weapons-m16a4.png", description: "Classic 5.56mm burst-fire rifle. Excellent for medium to long-range tapping." },
    { id: 12, name: "S12K Shotgun", category: "Rifles", price: 1400, image: "./IMAGES/img-weapons-s12k.png", description: "Semi-automatic shotgun capable of accepting assault rifle attachments." },
    { id: 13, name: "S686 Shotgun", category: "Rifles", price: 650, image: "./IMAGES/img-weapons-s686.png", description: "Double-barreled classic shotgun. Can fire two devastating rounds in rapid succession." },
    { id: 14, name: "S1897 Shotgun", category: "Rifles", price: 500, image: "./IMAGES/img-weapons-s1897.png", description: "Reliable pump-action shotgun. High damage but slow fire rate." },
    { id: 15, name: "Sawed_off", category: "Pistols", price: 400, image: "./IMAGES/img-weapons-sawed_off.png", description: "Sawed-off shotgun that fits in a sidearm slot. Major spread, major damage." },
    { id: 16, name: "Vector SMG", category: "Rifles", price: 1650, image: "./IMAGES/img-weapons-vector.png", description: "High fire rate submachine gun. Melts armor at close quarters." },

    // Accessories
    { id: 17, name: "Sniper Tools", category: "Accessories", price: 150, image: "./IMAGES/bullet1.png", description: "Essential maintenance tools for sniper rifles to ensure maximum accuracy." },
    { id: 18, name: "Gun Barrel", category: "Accessories", price: 220, image: "./IMAGES/case2-removebg-preview.png", description: "Replacement gun barrel for increased range and bullet velocity." },
    { id: 19, name: "Tactical Case", category: "Accessories", price: 350, image: "./IMAGES/case1.png", description: "Durable hard case to securely transport your firearms and gear." },
    { id: 20, name: "HandGrip", category: "Accessories", price: 80, image: "./IMAGES/grip2-removebg-preview.png", description: "Reduces vertical recoil, improving weapon control during sustained fire." },
    { id: 21, name: "Clean Liquid", category: "Accessories", price: 25, image: "./IMAGES/liquid1.png", description: "Premium cleaning fluid to keep your firearms functioning smoothly." },
    { id: 22, name: "Magazine", category: "Accessories", price: 65, image: "./IMAGES/magazine1.png", description: "Extended magazine to increase ammo capacity." },
    { id: 23, name: "Stand", category: "Accessories", price: 110, image: "./IMAGES/stand1.png", description: "Sturdy display and maintenance stand for rifles." },
    { id: 24, name: "Thermal scope", category: "Accessories", price: 850, image: "./IMAGES/thermal1-removebg-preview.png", description: "Advanced thermal imaging scope for spotting targets through smoke or foliage." }
];

// Global State
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentUser = JSON.parse(localStorage.getItem('user')) || null;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    updateUserUI();
    updateCartCount();

    // Route initialization based on page elements
    if (document.getElementById('product-grid')) initHomePage();
    if (document.getElementById('cart-items-list')) initCartPage();
    if (document.getElementById('login-form')) initAuthPage();
    if (document.getElementById('checkout-form')) initCheckoutPage();

    // Global Event Listeners
    setupSearch();

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});

// ==== THEME MANAGEMENT ====
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    // Check saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme, themeIcon);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            let currentTheme = document.documentElement.getAttribute('data-theme');
            let newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme, themeIcon);
        });
    }
}

function updateThemeIcon(theme, iconElement) {
    if (!iconElement) return;
    if (theme === 'dark') {
        iconElement.className = 'fa-solid fa-sun'; // Show sun to toggle to light
    } else {
        iconElement.className = 'fa-solid fa-moon'; // Show moon to toggle to dark
    }
}

// ==== USER AUTHENTICATION ====
function updateUserUI() {
    const userText = document.getElementById('user-name-text');
    if (!userText) return;

    if (currentUser) {
        userText.textContent = currentUser.name;
    } else {
        userText.textContent = "Login";
    }
}

function initAuthPage() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const toggleSignup = document.getElementById('toggle-signup');
    const toggleLogin = document.getElementById('toggle-login');
    const authTitle = document.getElementById('auth-title');
    const authError = document.getElementById('auth-error');

    toggleSignup.addEventListener('click', () => {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        authTitle.textContent = "Create Account";
        authError.classList.add('hidden');
    });

    toggleLogin.addEventListener('click', () => {
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        authTitle.textContent = "Welcome Back";
        authError.classList.add('hidden');
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const pass = document.getElementById('password').value;

        // Dummy authentication logic
        if (email && pass.length >= 4) {
            // Fake user data
            const user = { name: email.split('@')[0], email: email };
            localStorage.setItem('user', JSON.stringify(user));
            showToast("Login Successful!");
            setTimeout(() => { window.location.href = 'index.html'; }, 1000);
        } else {
            authError.classList.remove('hidden');
        }
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const pass = document.getElementById('reg-password').value;

        if (name && email && pass.length >= 4) {
            const user = { name: name, email: email };
            localStorage.setItem('user', JSON.stringify(user));
            showToast("Account Created successfully!");
            setTimeout(() => { window.location.href = 'index.html'; }, 1000);
        }
    });
}

// ==== HOME & PRODUCT LOGIC ====
let filteredProducts = [...products];
const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || !window.location.pathname.includes('.html');

function initHomePage() {

    if (isHomePage) {
        // Select 3 Rifles (IDs 1, 2, 3), 2 Shotguns (IDs 9, 10), and 3 Accessories (IDs 17, 18, 19)
        const homePageIds = [1, 2, 3, 9, 10, 17, 18, 19];
        filteredProducts = products.filter(p => homePageIds.includes(p.id));
    }

    renderProducts(filteredProducts);

    // Filters & Sorting event listeners
    const categoryRadios = document.querySelectorAll('input[name="category"]');
    const priceRange = document.getElementById('price-range');
    const sortSelect = document.getElementById('sort-select');

    categoryRadios.forEach(radio => {
        radio.addEventListener('change', applyFilters);
    });

    priceRange.addEventListener('input', (e) => {
        document.getElementById('price-display').textContent = e.target.value;
        applyFilters();
    });

    sortSelect.addEventListener('change', applyFilters);

    // Modal setup
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('product-modal');
        if (e.target === modal) closeModal();
    });
}

function applyFilters() {
    const selectedCategory = document.querySelector('input[name="category"]:checked').value;
    const maxPrice = Number(document.getElementById('price-range').value);
    const sortBy = document.getElementById('sort-select').value;

    let sourceProducts = products;
    if (isHomePage) {
        const homePageIds = [1, 2, 3, 9, 10, 17, 18, 19];
        sourceProducts = products.filter(p => homePageIds.includes(p.id));
    }

    // Filter
    filteredProducts = sourceProducts.filter(p => {
        const matchCategory = selectedCategory === "All" || p.category === selectedCategory;
        const matchPrice = p.price <= maxPrice;
        return matchCategory && matchPrice;
    });

    // Sort
    if (sortBy === 'price-low') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
        filteredProducts.sort((a, b) => b.id - a.id);
    } // default maintains original order of filtered array

    renderProducts(filteredProducts);
}

function renderProducts(items) {
    const grid = document.getElementById('product-grid');
    const noProductMsg = document.getElementById('no-product-message');
    document.getElementById('product-count').textContent = items.length;

    grid.innerHTML = '';

    if (items.length === 0) {
        noProductMsg.classList.remove('hidden');
    } else {
        noProductMsg.classList.add('hidden');
        items.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="product-actions">
                        <button class="btn btn-view" onclick="openModal(${product.id})">Details</button>
                        <button class="btn btn-add" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }
}

// ==== SEARCH FEATURE ====
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const suggestionsBox = document.getElementById('search-suggestions');
    if (!searchInput || !suggestionsBox) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        suggestionsBox.innerHTML = '';

        if (query.length > 0) {
            const matches = products.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));

            if (matches.length > 0) {
                matches.forEach(match => {
                    const div = document.createElement('div');
                    div.className = 'suggestion-item';
                    div.innerHTML = `
                        <img src="${match.image}" alt="">
                        <div>
                            <h4>${match.name}</h4>
                            <span class="text-muted">$${match.price}</span>
                        </div>
                    `;
                    div.addEventListener('click', () => {
                        // Action on click
                        openModal(match.id);
                        searchInput.value = '';
                        suggestionsBox.innerHTML = '';
                    });
                    suggestionsBox.appendChild(div);
                });
            } else {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.innerHTML = `<span>No product found</span>`;
                suggestionsBox.appendChild(div);
            }
        }
    });

    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
            suggestionsBox.innerHTML = '';
        }
    });
}

// ==== MODAL LOGIC ====
function openModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    document.getElementById('modal-img').src = product.image;
    document.getElementById('modal-title').textContent = product.name;
    document.getElementById('modal-category').textContent = product.category;
    document.getElementById('modal-price').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('modal-description').textContent = product.description;

    const addBtn = document.getElementById('modal-add-to-cart');
    addBtn.onclick = () => {
        addToCart(product.id);
        closeModal();
    };

    document.getElementById('product-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('product-modal').classList.remove('active');
}

// ==== CART LOGIC ====
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartCount();
    showToast(`${product.name} added to cart!`);
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        countElement.textContent = totalItems;
    }
}

function initCartPage() {
    renderCart();

    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (cart.length > 0) {
            if (!currentUser) {
                showToast("Please login first to checkout.", true);
                setTimeout(() => { window.location.href = 'login.html'; }, 1500);
            } else {
                window.location.href = 'checkout.html';
            }
        }
    });
}

function renderCart() {
    const list = document.getElementById('cart-items-list');
    const emptyMsg = document.getElementById('empty-cart-message');
    const checkoutBtn = document.getElementById('checkout-btn');

    list.innerHTML = '';

    if (cart.length === 0) {
        emptyMsg.classList.remove('hidden');
        checkoutBtn.classList.add('disabled');
        updateCartTotals(0);
    } else {
        emptyMsg.classList.add('hidden');
        checkoutBtn.classList.remove('disabled');

        let subtotal = 0;

        cart.forEach((item, index) => {
            subtotal += item.price * item.quantity;
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <div class="price">$${item.price.toFixed(2)}</div>
                </div>
                <div class="quantity-control">
                    <button class="qty-btn" onclick="updateQuantity(${index}, -1)">−</button>
                    <span class="item-qty">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
            list.appendChild(div);
        });

        updateCartTotals(subtotal);
    }
}

function updateQuantity(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
    updateCartCount();
    renderCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartCount();
    renderCart();
}

function updateCartTotals(subtotal) {
    const gstRate = 0.18;
    const delivery = subtotal > 0 ? 100 : 0; // ₹100 or $100 delivery

    const gst = subtotal * gstRate;
    const total = subtotal + gst + delivery;

    if (document.getElementById('cart-subtotal')) {
        document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('cart-gst').textContent = `$${gst.toFixed(2)}`;
        document.getElementById('cart-delivery').textContent = `$${delivery.toFixed(2)}`;
        document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
    }
}

// ==== CHECKOUT LOGIC ====
function initCheckoutPage() {
    if (cart.length === 0) {
        window.location.href = 'index.html';
        return;
    }

    // Render mini items representation and totals
    const itemsContainer = document.getElementById('checkout-items');
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        const div = document.createElement('div');
        div.className = 'mini-item';
        div.innerHTML = `<span>${item.quantity}x ${item.name}</span> <span>$${(item.price * item.quantity).toFixed(2)}</span>`;
        itemsContainer.appendChild(div);
    });

    const gst = subtotal * 0.18;
    const delivery = 100;
    const finalTotal = subtotal + gst + delivery;

    document.getElementById('chk-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('chk-gst').textContent = `$${gst.toFixed(2)}`;
    document.getElementById('chk-delivery').textContent = `$${delivery.toFixed(2)}`;
    document.getElementById('chk-total').textContent = `$${finalTotal.toFixed(2)}`;

    // Payment Option Toggle UI
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const cardUI = document.getElementById('card-ui');

    paymentRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'card') {
                cardUI.classList.remove('hidden');
                // Set card inputs to required
                cardUI.querySelectorAll('input').forEach(i => i.required = true);
            } else {
                cardUI.classList.add('hidden');
                cardUI.querySelectorAll('input').forEach(i => i.required = false);
            }
        });
    });

    // Form submission
    document.getElementById('checkout-form').addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate Phone Number
        const phoneInput = document.getElementById('chk-phone').value.trim();
        if (!/^\d{10}$/.test(phoneInput)) {
            showToast("Phone number must be exactly 10 digits.", true);
            return;
        }

        // Validate Card Details if Card is selected
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
        if (paymentMethod === 'card') {
            const cardInputs = document.querySelectorAll('#card-ui input');
            const cardNumber = cardInputs[0].value.replace(/\s+/g, ''); // Remove spaces
            const expiry = cardInputs[1].value.trim();

            if (!/^\d{16}$/.test(cardNumber)) {
                showToast("Card number must be exactly 16 digits.", true);
                return;
            }

            if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
                showToast("Expiry date must be in MM/YY format.", true);
                return;
            }
        }

        // Generate random Order ID
        const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

        // Hide form, show success
        document.getElementById('checkout-form-container').classList.add('hidden');
        const successSection = document.getElementById('order-success');
        successSection.classList.remove('hidden');

        document.getElementById('success-order-id').textContent = orderId;
        document.getElementById('success-total-paid').textContent = `$${finalTotal.toFixed(2)}`;

        // Clear cart
        cart = [];
        saveCart();
        updateCartCount();
    });
}

// ==== TOAST NOTIFICATION ====
function showToast(message, isError = false) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';

    const icon = isError ? '<i class="fa-solid fa-circle-exclamation" style="color:var(--error-color)"></i>' : '<i class="fa-solid fa-circle-check"></i>';

    toast.innerHTML = `${icon} <span>${message}</span>`;

    // override left border color if error
    if (isError) {
        toast.style.borderLeftColor = 'var(--error-color)';
    }

    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}
