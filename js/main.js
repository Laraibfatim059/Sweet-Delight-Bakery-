/* ===================================================================
   SWEET DELIGHT BAKERY - MAIN APPLICATION JAVASCRIPT
   Features:
     - Sticky & Responsive Navigation with scrollspy
     - High-Performance 3D Card Tilt with Dynamic Golden Glare
     - Functional Shopping Cart Drawer with PKR currency & LocalStorage
     - Product Filtering & Quick View Modal
     - Contact Form Validation & Toast Notification System
     - Scroll Reveal Animations
   =================================================================== */

(function () {
  'use strict';

  // -----------------------------------------------------------------
  // PRODUCT CATALOG DATA
  // -----------------------------------------------------------------
  const PRODUCTS = [
    {
      id: 'prod-1',
      name: 'Chocolate Cake',
      category: 'cakes',
      tag: 'Bestseller',
      price: 3850,
      rating: '4.9 (128)',
      portion: 'Serves 8-10',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
      fallbackSvg: 'cake-choc',
      desc: 'Decadent 3-layer Belgian chocolate sponge layered with rich dark ganache and dusted with edible 24K gold flakes.',
      details: 'Crafted with imported 70% Callebaut chocolate, organic cream, and slow-whipped cocoa ganache. Each tier is infused with a light vanilla bean syrup to guarantee unforgettable moisture.',
      features: ['Belgian Callebaut 70%', '24K Edible Gold Dust', 'Moist Triple Sponge', 'Zero Preservatives']
    },
    {
      id: 'prod-2',
      name: 'Strawberry Cake',
      category: 'cakes',
      tag: 'Chef Signature',
      price: 4200,
      rating: '4.9 (94)',
      portion: 'Serves 8-10',
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
      fallbackSvg: 'cake-berry',
      desc: 'Light vanilla chiffon layered with fresh alpine strawberry compote and silky whipped chantilly cream.',
      details: 'Hand-picked ruby strawberries folded into light-as-air chiffon cake with delicate layers of house-made strawberry reduction and fresh Madagascar chantilly cream.',
      features: ['Farm Fresh Strawberries', 'Madagascar Chantilly', 'Cloud-light Chiffon', 'Artisanal Glaze']
    },
    {
      id: 'prod-3',
      name: 'Vanilla Cupcakes',
      category: 'cupcakes-donuts',
      tag: 'Box of 6',
      price: 1450,
      rating: '4.8 (86)',
      portion: 'Box of 6 Pieces',
      image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=800&q=80',
      fallbackSvg: 'cupcake-vanilla',
      desc: 'Fluffy Madagascar Bourbon vanilla cupcakes topped with silky golden buttercream swirls and sugar pearls.',
      details: 'Baked fresh every sunrise using genuine Bourbon vanilla beans, cultured golden butter, and delicate royal sugar pearls. Perfectly balanced sweetness in every bite.',
      features: ['Bourbon Vanilla Bean', 'Pure Cultured Butter', 'Soft Velvety Crumb', 'Signature Swirl']
    },
    {
      id: 'prod-4',
      name: 'Chocolate Donuts',
      category: 'cupcakes-donuts',
      tag: 'Box of 4',
      price: 950,
      rating: '4.9 (112)',
      portion: 'Box of 4 Pieces',
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
      fallbackSvg: 'donut-choc',
      desc: 'Artisanal brioche donuts glazed with glossy 70% dark cocoa glaze and sprinkled with roasted hazelnut praline.',
      details: '24-hour slow fermented brioche dough fried to golden airy perfection, hand-dipped into molten dark chocolate mirror glaze and crowned with caramelized hazelnut crunch.',
      features: ['24h Slow Brioche', 'Dark Mirror Glaze', 'Roasted Hazelnut', 'Featherlight Texture']
    },
    {
      id: 'prod-5',
      name: 'Fresh Croissants',
      category: 'pastries-cookies',
      tag: 'Trio Pack',
      price: 850,
      rating: '5.0 (145)',
      portion: '3 Golden Pieces',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
      fallbackSvg: 'croissant',
      desc: 'Classic French golden butter croissants with 81 flaky, melt-in-the-mouth layers and a honeycomb crumb.',
      details: 'Crafted according to classical Parisian viennoiserie methods with Normandy-style butter. Golden, crispy, whisper-thin crust giving way to an aromatic buttery honeycomb inside.',
      features: ['81 Flaky Butter Layers', 'Authentic French Method', 'Crispy Golden Shell', 'Baked Every 3 Hours']
    },
    {
      id: 'prod-6',
      name: 'Chocolate Cookies',
      category: 'pastries-cookies',
      tag: 'Box of 8',
      price: 1100,
      rating: '4.9 (130)',
      portion: '8 Gourmet Cookies',
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80',
      fallbackSvg: 'cookie-choc',
      desc: 'Gourmet chewy double chocolate chunk cookies baked with melted dark pockets and French sea salt crystals.',
      details: 'Crisp on the outer perimeter with an ultra-fudgy, gooey center packed with chunks of dark and semi-sweet Belgian chocolate, balanced with hand-harvested sea salt flakes.',
      features: ['Gooey Molten Center', 'Belgian Chocolate Chunks', 'Maldon Sea Salt Flakes', 'Fresh Daily Bake']
    }
  ];

  // -----------------------------------------------------------------
  // STATE MANAGEMENT
  // -----------------------------------------------------------------
  let cart = [];
  try {
    const saved = localStorage.getItem('sweet_delight_cart');
    if (saved) cart = JSON.parse(saved);
  } catch (e) {
    cart = [];
  }

  // -----------------------------------------------------------------
  // DOM ELEMENTS
  // -----------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const productsGrid = document.getElementById('products-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  // Cart Elements
  const cartButtons = document.querySelectorAll('.cart-toggle-btn');
  const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
  const cartDrawer = document.getElementById('cart-drawer');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartTotalEl = document.getElementById('cart-total');
  const cartBadges = document.querySelectorAll('.cart-badge');
  const floatingCartCount = document.getElementById('floating-cart-count');
  const checkoutBtn = document.getElementById('checkout-btn');

  // Quick View Modal
  const modalOverlay = document.getElementById('quickview-modal-overlay');
  const modalCloseBtn = document.getElementById('quickview-close-btn');
  const modalImg = document.getElementById('modal-img');
  const modalTag = document.getElementById('modal-tag');
  const modalTitle = document.getElementById('modal-title');
  const modalPrice = document.getElementById('modal-price');
  const modalDesc = document.getElementById('modal-desc');
  const modalFeatures = document.getElementById('modal-features');
  const modalAddToCartBtn = document.getElementById('modal-add-cart-btn');

  // Contact Form
  const contactForm = document.getElementById('contact-form');

  // -----------------------------------------------------------------
  // FORMAT CURRENCY HELPER
  // -----------------------------------------------------------------
  function formatPKR(amount) {
    return 'PKR ' + amount.toLocaleString('en-PK');
  }

  // -----------------------------------------------------------------
  // NAVBAR SCROLL & ACTIVE LINK LOGIC
  // -----------------------------------------------------------------
  function handleNavbarScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy active link update
    const scrollPosition = window.scrollY + 120;
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll();

  // Mobile menu toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });
  }

  // -----------------------------------------------------------------
  // RENDER PRODUCTS
  // -----------------------------------------------------------------
  function renderProducts(filter = 'all') {
    if (!productsGrid) return;

    const filtered = filter === 'all' 
      ? PRODUCTS 
      : PRODUCTS.filter(p => p.category === filter);

    productsGrid.innerHTML = '';

    filtered.forEach((product, idx) => {
      const cardWrap = document.createElement('div');
      cardWrap.className = `product-card-wrap reveal-fade-up stagger-${(idx % 4) + 1} active`;

      cardWrap.innerHTML = `
        <div class="product-card" data-id="${product.id}">
          <div class="card-glare"></div>
          
          <div class="product-img-box">
            <span class="product-badge">${product.tag}</span>
            <button class="quick-view-btn" data-id="${product.id}" title="Quick View" aria-label="Quick View">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
            <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80';">
          </div>

          <div class="product-body">
            <div class="product-meta">
              <div class="product-rating">
                <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <span>${product.rating}</span>
              </div>
              <span class="product-portion">${product.portion}</span>
            </div>

            <h3 class="product-title">${product.name}</h3>
            <p class="product-desc">${product.desc}</p>

            <div class="product-footer">
              <div class="product-price-box">
                <span class="price-currency">Price</span>
                <span class="product-price">${formatPKR(product.price)}</span>
              </div>
              <button class="add-cart-btn" data-id="${product.id}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                  <path d="M3 6h18"></path>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      `;

      productsGrid.appendChild(cardWrap);
    });

    init3DTilt();
    attachProductEvents();
  }

  // -----------------------------------------------------------------
  // 3D PRODUCT CARD TILT WITH DYNAMIC SPECULAR GLARE
  // -----------------------------------------------------------------
  function init3DTilt() {
    const cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
      const glare = card.querySelector('.card-glare');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale3d(1.02, 1.02, 1.02)`;

        if (glare) {
          const glareX = (x / rect.width) * 100;
          const glareY = (y / rect.height) * 100;
          glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(214, 164, 91, 0.28) 0%, rgba(214, 164, 91, 0.05) 50%, transparent 80%)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)';
        if (glare) {
          glare.style.background = 'transparent';
        }
      });
    });
  }

  // Filter Buttons Handler
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.getAttribute('data-filter');
      renderProducts(filter);
    });
  });

  // -----------------------------------------------------------------
  // CART ACTIONS & STATE
  // -----------------------------------------------------------------
  function saveCart() {
    try {
      localStorage.setItem('sweet_delight_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage not available');
    }
    updateCartUI();
  }

  function addToCart(productId, qty = 1) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = cart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
      cart[existingIndex].qty += qty;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: qty
      });
    }

    saveCart();
    showToast(`Added "${product.name}" to your cart!`, 'gold', 'cart');

    // Subtle button feedback if clicked on card
    const btn = document.querySelector(`.add-cart-btn[data-id="${productId}"]`);
    if (btn) {
      const originalText = btn.innerHTML;
      btn.classList.add('added');
      btn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>Added!</span>
      `;
      setTimeout(() => {
        btn.classList.remove('added');
        btn.innerHTML = originalText;
      }, 1500);
    }
  }

  function updateQuantity(productId, delta) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex === -1) return;

    cart[itemIndex].qty += delta;
    if (cart[itemIndex].qty <= 0) {
      cart.splice(itemIndex, 1);
    }
    saveCart();
  }

  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    showToast('Item removed from cart', 'neutral');
  }

  function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    // Update badges
    cartBadges.forEach(badge => {
      badge.textContent = totalCount;
      badge.classList.add('bump');
      setTimeout(() => badge.classList.remove('bump'), 300);
    });

    if (floatingCartCount) {
      floatingCartCount.textContent = totalCount;
    }

    // Render Drawer items
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="empty-cart-view">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
            <path d="M3 6h18"></path>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <h4 style="color: var(--text-cream); font-family: var(--font-heading); font-size: 1.15rem;">Your Cart is Empty</h4>
          <p style="font-size: 0.88rem; max-width: 240px;">Explore our handcrafted cakes and pastries to add fresh happiness to your box!</p>
        </div>
      `;
      if (cartSubtotalEl) cartSubtotalEl.textContent = formatPKR(0);
      if (cartTotalEl) cartTotalEl.textContent = formatPKR(0);
      if (checkoutBtn) checkoutBtn.disabled = true;
      return;
    }

    if (checkoutBtn) checkoutBtn.disabled = false;
    if (cartSubtotalEl) cartSubtotalEl.textContent = formatPKR(subtotal);
    if (cartTotalEl) cartTotalEl.textContent = formatPKR(subtotal);

    cartItemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <h4 class="cart-item-title">${item.name}</h4>
          <span class="cart-item-price">${formatPKR(item.price)}</span>
          <div class="cart-item-controls">
            <button class="qty-btn" data-action="decrease" data-id="${item.id}">−</button>
            <span class="qty-display">${item.qty}</span>
            <button class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
          </div>
        </div>
        <button class="remove-item-btn" data-id="${item.id}" title="Remove item" aria-label="Remove item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    `).join('');

    // Attach drawer button events
    cartItemsContainer.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const action = btn.getAttribute('data-action');
        updateQuantity(id, action === 'increase' ? 1 : -1);
      });
    });

    cartItemsContainer.querySelectorAll('.remove-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        removeFromCart(id);
      });
    });
  }

  // Toggle Cart Drawer
  function openCart() {
    if (cartDrawer && cartDrawerOverlay) {
      cartDrawer.classList.add('active');
      cartDrawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCart() {
    if (cartDrawer && cartDrawerOverlay) {
      cartDrawer.classList.remove('active');
      cartDrawerOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  cartButtons.forEach(btn => btn.addEventListener('click', openCart));
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (cartDrawerOverlay) cartDrawerOverlay.addEventListener('click', closeCart);

  // Checkout Button Interaction
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) return;
      const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
      
      checkoutBtn.disabled = true;
      checkoutBtn.innerHTML = `<span>Processing Order...</span>`;

      setTimeout(() => {
        cart = [];
        saveCart();
        closeCart();
        checkoutBtn.disabled = false;
        checkoutBtn.innerHTML = `<span>Proceed to Checkout</span>`;

        showToast(`🎉 Order Placed! Total: ${formatPKR(totalAmount)}. Our bakery will prepare your fresh treats with love!`, 'success', 'check', 6000);
      }, 1000);
    });
  }

  // -----------------------------------------------------------------
  // QUICK VIEW MODAL
  // -----------------------------------------------------------------
  let currentQuickViewId = null;

  function openQuickView(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product || !modalOverlay) return;

    currentQuickViewId = productId;
    modalImg.src = product.image;
    modalImg.alt = product.name;
    modalTag.textContent = product.tag;
    modalTitle.textContent = product.name;
    modalPrice.textContent = formatPKR(product.price);
    modalDesc.textContent = product.details || product.desc;

    if (modalFeatures) {
      modalFeatures.innerHTML = product.features.map(f => `
        <span class="feature-pill">✦ ${f}</span>
      `).join('');
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeQuickView() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeQuickView);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeQuickView();
    });
  }

  if (modalAddToCartBtn) {
    modalAddToCartBtn.addEventListener('click', () => {
      if (currentQuickViewId) {
        addToCart(currentQuickViewId);
        closeQuickView();
      }
    });
  }

  // -----------------------------------------------------------------
  // ATTACH CARD EVENTS
  // -----------------------------------------------------------------
  function attachProductEvents() {
    document.querySelectorAll('.add-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        addToCart(id);
      });
    });

    document.querySelectorAll('.quick-view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        openQuickView(id);
      });
    });
  }

  // -----------------------------------------------------------------
  // CONTACT FORM VALIDATION
  // -----------------------------------------------------------------
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      let isValid = true;
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');
      const submitBtn = contactForm.querySelector('.submit-btn');

      // Helper validation
      function validateField(input, condition, errorMsg) {
        const group = input.closest('.form-group');
        let errorEl = group.querySelector('.form-error');
        if (!condition) {
          isValid = false;
          group.classList.add('has-error');
          if (errorEl) errorEl.textContent = errorMsg;
        } else {
          group.classList.remove('has-error');
        }
      }

      // 1. Name validation
      validateField(nameInput, nameInput.value.trim().length >= 2, 'Please enter your full name (at least 2 letters)');

      // 2. Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      validateField(emailInput, emailPattern.test(emailInput.value.trim()), 'Please enter a valid email address');

      // 3. Subject validation
      validateField(subjectInput, subjectInput.value.trim().length >= 3, 'Please enter a subject (at least 3 characters)');

      // 4. Message validation
      validateField(messageInput, messageInput.value.trim().length >= 10, 'Please write a message with at least 10 characters');

      if (!isValid) return;

      // Submit State
      const originalContent = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spin-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg>
        <span>Sending Message...</span>
      `;

      setTimeout(() => {
        const userName = nameInput.value.trim();
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;

        showToast(`✨ Thank you, ${userName}! Your message was sent successfully. Our head baker will reply within 24 hours.`, 'success', 'check', 6000);
      }, 1200);
    });

    // Real-time error clearance on input
    contactForm.querySelectorAll('.form-input, .form-textarea').forEach(input => {
      input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        if (group.classList.contains('has-error')) {
          group.classList.remove('has-error');
        }
      });
    });
  }

  // -----------------------------------------------------------------
  // TOAST NOTIFICATION ENGINE
  // -----------------------------------------------------------------
  function showToast(message, type = 'gold', iconType = 'info', duration = 3800) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconSvg = '';
    if (iconType === 'cart') {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`;
    } else if (iconType === 'check') {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    } else {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    }

    toast.innerHTML = `
      ${iconSvg}
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastSlideOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // -----------------------------------------------------------------
  // SCROLL REVEAL OBSERVER
  // -----------------------------------------------------------------
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-fade-up');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

  // Newsletter subscription
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      if (input && input.value) {
        showToast(`💌 You're subscribed! Enjoy 10% off your first cake order.`, 'gold', 'check');
        input.value = '';
      }
    });
  }

  // -----------------------------------------------------------------
  // INITIALIZATION
  // -----------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    renderProducts('all');
    updateCartUI();
    initScrollReveal();
  });

  // Global helper for toast
  window.SweetDelight = {
    addToCart,
    openCart,
    showToast
  };

})();
