// =====================================================================
// THE SPOOKY CAULDRON & CURSED EMPORIUM - CLIENT APPLICATION
// Complete E-Commerce State, Interactive Wand Spells & Sound Effects
// =====================================================================

(function () {
  'use strict';

  // --- STATE ---
  const state = {
    cart: JSON.parse(localStorage.getItem('spooky_cart') || '[]'),
    wishlist: JSON.parse(localStorage.getItem('spooky_wishlist') || '[]'),
    currency: localStorage.getItem('spooky_currency') || 'galleon',
    activeCategory: 'all',
    searchQuery: '',
    sortMode: 'featured',
    spookFilter: 0,
    shippingMethod: 'owl',
    promo: null, // { code: 'LUMOS', discount: 0.15, freeShipping: false }
    userHouse: localStorage.getItem('spooky_house') || null,
    quizStep: 0,
    quizAnswers: []
  };

  // Shipping Rates (in Galleons)
  const SHIPPING_RATES = {
    owl: { name: '🦉 Barn Owl Express', costGalleons: 2.00, minFree: 15.00 },
    nimbus: { name: '🧹 Nimbus 2000 Rush', costGalleons: 4.50, minFree: 999 },
    floo: { name: '💨 Floo Powder Instant Port', costGalleons: 6.00, minFree: 999 }
  };

  // Currency Conversions relative to Galleons:
  // 1 Galleon = $5.00 USD = 100 Treat Coins (₮)
  const CONVERSIONS = {
    galleon: { symbol: 'ʛ', rate: 1, prefix: false, suffix: ' ʛ' },
    usd: { symbol: '$', rate: 5.0, prefix: '$', suffix: '' },
    coin: { symbol: '₮', rate: 100, prefix: '', suffix: ' ₮' }
  };

  function formatPrice(galleonAmount) {
    const config = CONVERSIONS[state.currency] || CONVERSIONS.galleon;
    const converted = galleonAmount * config.rate;
    if (state.currency === 'coin') {
      return `${Math.round(converted)}${config.suffix}`;
    }
    const fixed = converted.toFixed(2);
    return `${config.prefix}${fixed}${config.suffix}`;
  }

  // --- DOM REFERENCES ---
  const productsGrid = document.getElementById('products-grid');
  const resultsCount = document.getElementById('results-count');
  const searchInput = document.getElementById('search-input');
  const sortSelect = document.getElementById('sort-select');
  const spookSelect = document.getElementById('spook-select');
  const currencySelector = document.getElementById('currency-selector');
  const catTabs = document.querySelectorAll('.cat-tab');
  const btnResetFilters = document.getElementById('btn-reset-filters');

  // Drawers & Modals
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const cartDrawer = document.getElementById('cart-drawer');
  const btnCartOpen = document.getElementById('btn-cart-open');
  const btnCartClose = document.getElementById('btn-cart-close');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartShippingEl = document.getElementById('cart-shipping');
  const cartDiscountRow = document.getElementById('cart-discount-row');
  const cartDiscountEl = document.getElementById('cart-discount');
  const cartTotalEl = document.getElementById('cart-total');
  const cartCountBadges = document.querySelectorAll('.cart-count');
  const wishlistCountBadges = document.querySelectorAll('.wishlist-count');

  // Promo elements
  const promoInput = document.getElementById('promo-input');
  const btnApplyPromo = document.getElementById('btn-apply-promo');
  const promoMessage = document.getElementById('promo-message');

  // Modals
  const quickViewModal = document.getElementById('quick-view-modal');
  const quickViewContent = document.getElementById('quick-view-content');
  const spellModal = document.getElementById('spell-modal');
  const btnSpellOpen = document.getElementById('btn-open-spells');
  const quizModal = document.getElementById('quiz-modal');
  const btnSortingQuiz = document.getElementById('btn-sorting-quiz');
  const checkoutModal = document.getElementById('checkout-modal');
  const btnCheckout = document.getElementById('btn-checkout');
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const boggartModal = document.getElementById('boggart-modal');
  const btnBoggartChallenge = document.getElementById('btn-boggart-challenge');
  const heroBoggartTrigger = document.getElementById('hero-boggart-trigger');

  // Boggart challenge state
  let currentBoggart = null;

  // --- INITIALIZATION ---
  function init() {
    setupAmbientCanvas();
    setupFloatingCandles();
    setupWandCursor();
    setupCountdown();
    setupAutoSuggest();
    setupEventListeners();
    applyStateToUI();
    renderProducts();
    updateCartUI();
    updateWishlistUI();
  }

  // --- AMBIENT CANVAS PARTICLES (Floating Embers & Stardust) ---
  function setupAmbientCanvas() {
    const canvas = document.getElementById('ambient-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 50;
        this.size = Math.random() * 2.5 + 0.8;
        this.speedY = Math.random() * 0.8 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.7 + 0.2;
        this.color = Math.random() > 0.4 ? '255, 117, 24' : '157, 78, 221'; // pumpkin or violet
        this.wobble = Math.random() * Math.PI * 2;
      }
      update() {
        this.y -= this.speedY;
        this.wobble += 0.02;
        this.x += Math.sin(this.wobble) * 0.4 + this.speedX;
        if (this.y < -10) this.reset();
      }
      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgb(${this.color})`;
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < 45; i++) {
      const p = new Particle();
      p.y = Math.random() * height; // initial spread
      particles.push(p);
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }
    animate();
  }

  // --- WAND SPARKLE CURSOR ---
  function setupWandCursor() {
    let lastSparkleTime = 0;
    window.addEventListener('mousemove', (e) => {
      // Update Lumos overlay coordinates
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);

      // Throttle sparkle creation
      const now = Date.now();
      if (now - lastSparkleTime > 40) {
        lastSparkleTime = now;
        createSparkle(e.clientX, e.clientY);
      }
    });
  }

  function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'wand-sparkle';
    sparkle.style.position = 'fixed';
    sparkle.style.left = `${x + (Math.random() * 10 - 5)}px`;
    sparkle.style.top = `${y + (Math.random() * 10 - 5)}px`;
    sparkle.style.width = '6px';
    sparkle.style.height = '6px';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9998';

    const colors = ['#fde047', '#ff7518', '#c084fc', '#34d399'];
    const chosen = colors[Math.floor(Math.random() * colors.length)];
    sparkle.style.backgroundColor = chosen;
    sparkle.style.boxShadow = `0 0 8px ${chosen}`;
    sparkle.style.transition = 'all 0.5s ease-out';

    document.body.appendChild(sparkle);

    requestAnimationFrame(() => {
      sparkle.style.transform = `translate(${(Math.random() - 0.5) * 20}px, ${(Math.random() - 0.5) * 20 + 15}px) scale(0)`;
      sparkle.style.opacity = '0';
    });

    setTimeout(() => sparkle.remove(), 550);
  }

  // --- FLOATING CANDLES GENERATOR ---
  function setupFloatingCandles() {
    const container = document.getElementById('floating-candles');
    if (!container) return;
    container.innerHTML = '';
    const candleConfigs = [
      { left: '10%', top: '22%', delay: '0s', height: '44px' },
      { left: '22%', top: '40%', delay: '1.4s', height: '52px' },
      { left: '34%', top: '18%', delay: '2.8s', height: '46px' },
      { left: '50%', top: '30%', delay: '0.6s', height: '50px' },
      { left: '68%', top: '14%', delay: '3.2s', height: '42px' },
      { left: '80%', top: '36%', delay: '1.8s', height: '54px' },
      { left: '90%', top: '20%', delay: '0.4s', height: '40px' },
      { left: '60%', top: '45%', delay: '2.1s', height: '48px' },
    ];

    candleConfigs.forEach(cfg => {
      const candle = document.createElement('div');
      candle.className = 'floating-candle';
      candle.style.left = cfg.left;
      candle.style.top = cfg.top;
      candle.style.height = cfg.height;
      candle.style.animationDelay = cfg.delay;
      candle.innerHTML = '<div class="candle-flame"></div>';
      container.appendChild(candle);
    });
  }

  // --- SPELL SCROLL AUTO-SUGGEST DROPDOWN ---
  function setupAutoSuggest() {
    const suggestDropdown = document.getElementById('search-suggest-dropdown');
    if (!searchInput || !suggestDropdown) return;

    searchInput.addEventListener('input', (e) => {
      const val = e.target.value.toLowerCase().trim();
      state.searchQuery = val;
      renderProducts();

      if (val.length < 1) {
        suggestDropdown.classList.remove('active');
        suggestDropdown.innerHTML = '';
        return;
      }

      const matches = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(val) || 
        p.category.toLowerCase().includes(val) || 
        p.tag.toLowerCase().includes(val) ||
        p.house.toLowerCase().includes(val)
      ).slice(0, 5);

      if (matches.length === 0) {
        suggestDropdown.innerHTML = `
          <div style="padding: 12px 16px; font-size: 0.85rem; color: var(--text-muted); font-style: italic;">
            No matching relics or brews found in the scroll.
          </div>
        `;
        suggestDropdown.classList.add('active');
        return;
      }

      suggestDropdown.innerHTML = matches.map(p => `
        <div class="suggest-item" data-id="${p.id}">
          <div class="suggest-thumb">${p.svgIcon}</div>
          <div class="suggest-info">
            <div class="suggest-name">${p.name}</div>
            <div class="suggest-meta">★ ${p.starRating || '5.0'} • ${p.category.toUpperCase()}</div>
          </div>
          <div class="suggest-price">${formatPrice(p.priceGalleons)}</div>
        </div>
      `).join('');

      suggestDropdown.querySelectorAll('.suggest-item').forEach(item => {
        item.addEventListener('click', () => {
          const id = item.dataset.id;
          openQuickView(id);
          suggestDropdown.classList.remove('active');
        });
      });

      suggestDropdown.classList.add('active');
    });

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.scroll-search-wrapper')) {
        suggestDropdown.classList.remove('active');
      }
    });
  }

  // --- COUNTDOWN TO HALLOWEEN WITCHING HOUR ---
  function setupCountdown() {
    const daysEl = document.getElementById('count-days');
    const hoursEl = document.getElementById('count-hours');
    const minsEl = document.getElementById('count-mins');
    const secsEl = document.getElementById('count-secs');

    function update() {
      const now = new Date();
      // Target next Halloween midnight
      let targetYear = now.getFullYear();
      let halloween = new Date(targetYear, 9, 31, 23, 59, 59); // Oct is month index 9
      if (now > halloween) {
        targetYear++;
        halloween = new Date(targetYear, 9, 31, 23, 59, 59);
      }

      const diff = halloween - now;
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      if (daysEl) daysEl.textContent = String(d).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(m).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(s).padStart(2, '0');
    }
    update();
    setInterval(update, 1000);
  }

  // --- EVENT LISTENERS ---
  function setupEventListeners() {
    // Sound toggle
    if (soundToggleBtn) {
      soundToggleBtn.addEventListener('click', () => {
        const isEnabled = window.spookyAudio.toggleSound();
        if (isEnabled) {
          soundToggleBtn.classList.remove('muted');
          soundToggleBtn.innerHTML = `
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
          `;
          showToast('🎵 Spooky & magical audio enabled!');
        } else {
          soundToggleBtn.classList.add('muted');
          soundToggleBtn.innerHTML = `
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
          `;
          showToast('🔇 Audio muted');
        }
      });
    }

    // Currency Switcher
    if (currencySelector) {
      currencySelector.value = state.currency;
      currencySelector.addEventListener('change', (e) => {
        state.currency = e.target.value;
        localStorage.setItem('spooky_currency', state.currency);
        window.spookyAudio.playCoinClink();
        renderProducts();
        updateCartUI();
        showToast(`Currency changed to ${CONVERSIONS[state.currency].symbol || state.currency.toUpperCase()}`);
      });
    }

    // Search
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value.toLowerCase().trim();
        renderProducts();
      });
    }

    // Sort & Spook Filter
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        state.sortMode = e.target.value;
        renderProducts();
      });
    }
    if (spookSelect) {
      spookSelect.addEventListener('change', (e) => {
        state.spookFilter = parseInt(e.target.value, 10);
        renderProducts();
      });
    }

    // Category Tabs
    catTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        catTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        state.activeCategory = tab.dataset.category;
        window.spookyAudio.playBubble();
        renderProducts();
      });
    });

    // Reset Filters
    if (btnResetFilters) {
      btnResetFilters.addEventListener('click', () => {
        state.searchQuery = '';
        state.sortMode = 'featured';
        state.spookFilter = 0;
        state.activeCategory = 'all';
        if (searchInput) searchInput.value = '';
        if (sortSelect) sortSelect.value = 'featured';
        if (spookSelect) spookSelect.value = '0';
        catTabs.forEach(t => {
          t.classList.toggle('active', t.dataset.category === 'all');
        });
        renderProducts();
      });
    }

    // Cart Drawer Open / Close
    if (btnCartOpen) btnCartOpen.addEventListener('click', openCart);
    if (btnCartClose) btnCartClose.addEventListener('click', closeCart);
    if (drawerBackdrop) {
      drawerBackdrop.addEventListener('click', () => {
        closeCart();
        closeAllModals();
      });
    }

    // Shipping selection change
    document.querySelectorAll('input[name="shipping"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        state.shippingMethod = e.target.value;
        window.spookyAudio.playOwlHoot();
        updateCartUI();
      });
    });

    // Promo Code
    if (btnApplyPromo) {
      btnApplyPromo.addEventListener('click', applyPromoCode);
    }
    if (promoInput) {
      promoInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') applyPromoCode();
      });
    }

    // Spell Caster
    if (btnSpellOpen) {
      btnSpellOpen.addEventListener('click', () => {
        window.spookyAudio.playWandChime();
        openModal(spellModal);
      });
    }

    // Boggart Wardrobe Challenge
    if (btnBoggartChallenge) {
      btnBoggartChallenge.addEventListener('click', openBoggartChallenge);
    }
    if (heroBoggartTrigger) {
      heroBoggartTrigger.addEventListener('click', openBoggartChallenge);
    }

    // Sorting Quiz
    if (btnSortingQuiz) {
      btnSortingQuiz.addEventListener('click', () => {
        state.quizStep = 0;
        state.quizAnswers = [];
        window.spookyAudio.playWandChime();
        renderQuizStep();
        openModal(quizModal);
      });
    }

    // Checkout
    if (btnCheckout) {
      btnCheckout.addEventListener('click', () => {
        if (state.cart.length === 0) {
          showToast('⚠️ Your Cauldron is empty! Add treats or relics first.');
          return;
        }
        closeCart();
        renderCheckoutModal();
        openModal(checkoutModal);
      });
    }

    // Modal Close Buttons
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', closeAllModals);
    });

    // Spell Buttons Actions
    document.querySelectorAll('.spell-btn-action').forEach(btn => {
      btn.addEventListener('click', () => {
        const spellKey = btn.dataset.spell;
        castSpell(spellKey);
      });
    });
  }

  function applyStateToUI() {
    if (state.userHouse) {
      showToast(`⚡ Welcome back, noble ${state.userHouse}!`);
    }
  }

  // --- PRODUCT FILTERING & RENDERING ---
  function getFilteredProducts() {
    return PRODUCTS.filter(p => {
      // Category filter
      if (state.activeCategory === 'favorites') {
        if (!state.wishlist.includes(p.id)) return false;
      } else if (state.activeCategory !== 'all') {
        if (p.category !== state.activeCategory) return false;
      }

      // Spook Rating
      if (state.spookFilter > 0 && p.spookRating < state.spookFilter) {
        return false;
      }

      // Search Query
      if (state.searchQuery) {
        const query = state.searchQuery;
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.shortDesc.toLowerCase().includes(query);
        const matchesTag = p.tag.toLowerCase().includes(query);
        const matchesHouse = p.house.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesTag && !matchesHouse) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (state.sortMode === 'rating-desc') return (b.starRating || 5.0) - (a.starRating || 5.0);
      if (state.sortMode === 'price-asc') return a.priceGalleons - b.priceGalleons;
      if (state.sortMode === 'price-desc') return b.priceGalleons - a.priceGalleons;
      if (state.sortMode === 'spook-desc') return b.spookRating - a.spookRating;
      return 0; // featured
    });
  }

  function renderProducts() {
    if (!productsGrid) return;
    const filtered = getFilteredProducts();

    if (resultsCount) {
      resultsCount.textContent = `Showing ${filtered.length} enchanted relics & sweets`;
    }

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div class="empty-results">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3>No Magical Artifacts Found</h3>
          <p style="color: var(--text-muted); margin-top: 8px;">Perhaps the invisibility cloak concealed them? Try loosening your search filters.</p>
        </div>
      `;
      return;
    }

    productsGrid.innerHTML = filtered.map(item => {
      const isWishlisted = state.wishlist.includes(item.id);
      
      // Generate skulls rating
      let skullsHtml = '';
      for (let i = 1; i <= 5; i++) {
        if (i <= item.spookRating) {
          skullsHtml += '<span class="spook-skull-filled">💀</span>';
        } else {
          skullsHtml += '<span class="spook-skull-empty">💀</span>';
        }
      }

      return `
        <div class="product-card" data-id="${item.id}">
          <div class="product-badge-wrap">
            <span class="card-badge ${item.badgeClass}">${item.tag}</span>
          </div>

          <button class="btn-card-wishlist ${isWishlisted ? 'active' : ''}" data-id="${item.id}" title="${isWishlisted ? 'Remove Bookmark' : 'Bookmark to Grimoire'}" aria-label="Bookmark">
            <svg width="18" height="18" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          <div class="product-visual">
            <div class="product-svg-container">
              ${item.svgIcon}
            </div>
            <button class="quick-view-overlay-btn" data-id="${item.id}">
              🔍 Inspect Lore
            </button>
          </div>

          <div class="product-body">
            <div class="product-meta-row">
              <div class="star-rating" title="Rating: ${item.starRating || '5.0'} / 5 Stars">
                <span>★</span>
                <span class="star-rating-val">${item.starRating ? item.starRating.toFixed(1) : '5.0'}</span>
              </div>
              <div class="spook-rating" title="Spook Factor: ${item.spookRating}/5 Skulls">
                ${skullsHtml}
              </div>
            </div>

            <h3 class="product-name" title="${item.name}">${item.name}</h3>
            <p class="product-desc">${item.shortDesc}</p>

            <div class="product-footer">
              <div class="price-display">
                <span class="price-primary">${formatPrice(item.priceGalleons)}</span>
                <span class="price-secondary">${item.priceGalleons.toFixed(2)} ʛ / $${item.priceUSD.toFixed(2)} USD</span>
              </div>

              <button class="btn-add-cauldron" data-id="${item.id}">
                <span>Add to Cauldron</span>
                <span style="font-size: 1.1rem;">🧪</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach card event listeners
    productsGrid.querySelectorAll('.btn-add-cauldron').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        addToCart(id);
      });
    });

    productsGrid.querySelectorAll('.btn-card-wishlist').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        toggleWishlist(id);
      });
    });

    productsGrid.querySelectorAll('.quick-view-overlay-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        openQuickView(id);
      });
    });
  }

  // --- CART MANAGEMENT ---
  function addToCart(productId, qty = 1) {
    const existing = state.cart.find(item => item.productId === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      state.cart.push({ productId, qty });
    }
    saveCart();
    updateCartUI();
    window.spookyAudio.playBubble();
    
    const prod = PRODUCTS.find(p => p.id === productId);
    showToast(`🧪 Added "${prod ? prod.name : 'Item'}" into Cauldron!`);
  }

  function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.productId !== productId);
    saveCart();
    updateCartUI();
    showToast('💨 Item dissolved from Cauldron');
  }

  function updateItemQty(productId, delta) {
    const item = state.cart.find(i => i.productId === productId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
      updateCartUI();
    }
  }

  function saveCart() {
    localStorage.setItem('spooky_cart', JSON.stringify(state.cart));
  }

  function updateCartUI() {
    // Badges count
    const totalCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountBadges.forEach(b => b.textContent = totalCount);

    if (!cartItemsContainer) return;

    if (state.cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div style="text-align: center; padding: 40px 10px; color: var(--text-muted);">
          <div style="font-size: 3rem; margin-bottom: 12px; filter: drop-shadow(0 0 10px rgba(123, 44, 191, 0.5));">🧪</div>
          <h4 style="font-family: var(--font-magic); color: #fff; margin-bottom: 6px;">Your Cauldron is Empty</h4>
          <p style="font-size: 0.85rem;">No potions or wizard treats are brewing yet.</p>
        </div>
      `;
      if (cartSubtotalEl) cartSubtotalEl.textContent = formatPrice(0);
      if (cartShippingEl) cartShippingEl.textContent = formatPrice(0);
      if (cartTotalEl) cartTotalEl.textContent = formatPrice(0);
      if (cartDiscountRow) cartDiscountRow.style.display = 'none';
      return;
    }

    let subtotalGalleons = 0;

    cartItemsContainer.innerHTML = state.cart.map(cartItem => {
      const prod = PRODUCTS.find(p => p.id === cartItem.productId);
      if (!prod) return '';

      const lineTotalGalleons = prod.priceGalleons * cartItem.qty;
      subtotalGalleons += lineTotalGalleons;

      return `
        <div class="cart-item">
          <div class="cart-item-img">
            <div style="width: 44px; height: 44px;">
              ${prod.svgIcon}
            </div>
          </div>
          <div class="cart-item-info">
            <div>
              <div class="cart-item-title">${prod.name}</div>
              <div class="cart-item-price">${formatPrice(prod.priceGalleons)} each</div>
            </div>
            <div class="cart-item-controls">
              <div class="qty-control">
                <button class="qty-btn" data-action="dec" data-id="${prod.id}">-</button>
                <span class="qty-num">${cartItem.qty}</span>
                <button class="qty-btn" data-action="inc" data-id="${prod.id}">+</button>
              </div>
              <button class="btn-remove-item" data-id="${prod.id}">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach qty button listeners
    cartItemsContainer.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const action = e.currentTarget.dataset.action;
        updateItemQty(id, action === 'inc' ? 1 : -1);
      });
    });

    cartItemsContainer.querySelectorAll('.btn-remove-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        removeFromCart(id);
      });
    });

    // Calculate totals
    let shippingGalleons = SHIPPING_RATES[state.shippingMethod].costGalleons;
    if (subtotalGalleons >= SHIPPING_RATES[state.shippingMethod].minFree || (state.promo && state.promo.freeShipping)) {
      shippingGalleons = 0;
    }

    let discountGalleons = 0;
    if (state.promo && state.promo.discount) {
      discountGalleons = subtotalGalleons * state.promo.discount;
      if (cartDiscountRow) {
        cartDiscountRow.style.display = 'flex';
        cartDiscountEl.textContent = `-${formatPrice(discountGalleons)} (${state.promo.code})`;
      }
    } else {
      if (cartDiscountRow) cartDiscountRow.style.display = 'none';
    }

    const grandTotalGalleons = Math.max(0, subtotalGalleons - discountGalleons + shippingGalleons);

    if (cartSubtotalEl) cartSubtotalEl.textContent = formatPrice(subtotalGalleons);
    if (cartShippingEl) {
      cartShippingEl.textContent = shippingGalleons === 0 ? 'FREE (Enchanted)' : formatPrice(shippingGalleons);
    }
    if (cartTotalEl) cartTotalEl.textContent = formatPrice(grandTotalGalleons);
  }

  function openCart() {
    window.spookyAudio.playBubble();
    if (cartDrawer) cartDrawer.classList.add('active');
    if (drawerBackdrop) drawerBackdrop.classList.add('active');
  }

  function closeCart() {
    if (cartDrawer) cartDrawer.classList.remove('active');
    if (drawerBackdrop) drawerBackdrop.classList.remove('active');
  }

  // --- PROMO CODE ---
  function applyPromoCode() {
    if (!promoInput) return;
    const code = promoInput.value.trim().toUpperCase();

    if (!code) {
      setPromoMessage('Please enter an incantation code', 'error');
      return;
    }

    if (code === 'LUMOS') {
      state.promo = { code: 'LUMOS', discount: 0.15, freeShipping: false };
      setPromoMessage('⚡ LUMOS! 15% enchantment discount applied!', 'success');
      window.spookyAudio.playSpellZap();
    } else if (code === 'HALLOWEEN13') {
      state.promo = { code: 'HALLOWEEN13', discount: 0.13, freeShipping: false };
      setPromoMessage('🎃 Spooky HALLOWEEN13! 13% off applied!', 'success');
      window.spookyAudio.playOwlHoot();
    } else if (code === 'ALOHOMORA') {
      state.promo = { code: 'ALOHOMORA', discount: 0.0, freeShipping: true };
      setPromoMessage('🗝️ ALOHOMORA! Delivery locks unlocked - Free Owl Post!', 'success');
      window.spookyAudio.playSpellZap();
    } else if (code === 'AVADA20') {
      state.promo = { code: 'AVADA20', discount: 0.20, freeShipping: false };
      setPromoMessage('💀 Dark Mark discount: 20% curse reduction applied!', 'success');
      window.spookyAudio.playSpellZap();
    } else if (code === 'RIDDIKULUS') {
      state.promo = { code: 'RIDDIKULUS', discount: 0.10, freeShipping: false };
      // Include Lupin's chocolate in Cauldron as a reward if not already in cart
      if (!state.cart.some(item => item.productId === 'potter-lupin-chocolate')) {
        state.cart.push({ productId: 'potter-lupin-chocolate', qty: 1 });
        saveCart();
      }
      setPromoMessage('🍫 RIDDIKULUS! 10% off applied + Professor Lupin\'s Chocolate included in Cauldron!', 'success');
      window.spookyAudio.playRiddikulusPop();
    } else {
      setPromoMessage('❌ Spell fizzled: Invalid or expired incantation', 'error');
    }

    updateCartUI();
  }

  function setPromoMessage(msg, type) {
    if (!promoMessage) return;
    promoMessage.textContent = msg;
    promoMessage.className = `promo-message ${type}`;
  }

  // --- WISHLIST / GRIMOIRE BOOKMARK ---
  function toggleWishlist(productId) {
    const idx = state.wishlist.indexOf(productId);
    if (idx > -1) {
      state.wishlist.splice(idx, 1);
      showToast('📖 Removed bookmark from Grimoire');
    } else {
      state.wishlist.push(productId);
      window.spookyAudio.playWandChime();
      showToast('✨ Bound to your Grimoire Spellbook!');
    }
    localStorage.setItem('spooky_wishlist', JSON.stringify(state.wishlist));
    updateWishlistUI();
    renderProducts();
  }

  function updateWishlistUI() {
    wishlistCountBadges.forEach(b => b.textContent = state.wishlist.length);
  }

  // --- QUICK VIEW MODAL ---
  function openQuickView(productId) {
    const prod = PRODUCTS.find(p => p.id === productId);
    if (!prod || !quickViewContent) return;

    window.spookyAudio.playWandChime();

    quickViewContent.innerHTML = `
      <div class="modal-visual-side">
        <div style="width: 170px; height: 170px;">
          ${prod.svgIcon}
        </div>
        <span class="card-badge ${prod.badgeClass}" style="margin-top: 20px;">${prod.tag}</span>
        <div style="margin-top: 10px; font-size: 1.1rem; color: var(--galleon-bright); font-family: var(--font-magic);">
          ${formatPrice(prod.priceGalleons)}
        </div>
      </div>

      <div class="modal-details-side">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-family: var(--font-gothic); color: var(--pumpkin-glow); font-size: 0.9rem;">
            Spook Level: ${'💀'.repeat(prod.spookRating)}
          </span>
          <span style="font-family: var(--font-serif); font-size: 0.85rem; color: var(--galleon-gold);">
            House: ${prod.house}
          </span>
        </div>

        <h2 class="modal-title">${prod.name}</h2>
        <p style="color: #cbd5e1; font-size: 0.92rem; line-height: 1.6;">${prod.lore}</p>

        <div>
          <h4 style="font-family: var(--font-serif); color: var(--galleon-bright); font-size: 0.9rem; margin-bottom: 6px;">
            Enchantment Specifications & Ingredients:
          </h4>
          <ul class="modal-specs-list">
            ${prod.specs.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>

        <div>
          <h4 style="font-family: var(--font-serif); color: var(--pumpkin-glow); font-size: 0.9rem; margin-bottom: 6px;">
            Witches & Wizards Reviews:
          </h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${prod.reviews.map(r => `
              <div class="modal-review-quote">
                "${r.text}" — <strong>${r.author}</strong> <span style="opacity: 0.7;">(${r.role})</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="margin-top: 14px; display: flex; gap: 14px;">
          <button class="btn-primary-spooky" id="modal-quick-add" data-id="${prod.id}" style="flex-grow: 1;">
            <span>Brew into Cauldron</span>
            <span>🧪</span>
          </button>
        </div>
      </div>
    `;

    document.getElementById('modal-quick-add').addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      addToCart(id);
      closeAllModals();
      openCart();
    });

    openModal(quickViewModal);
  }

  // --- SPELL CASTER LOGIC ---
  function castSpell(spellKey) {
    const spell = SPELLS[spellKey];
    if (!spell) return;

    window.spookyAudio.playSpellZap();
    const outputEl = document.getElementById('spell-output-text');
    if (outputEl) {
      outputEl.innerHTML = `<strong>${spell.name}</strong> — ${spell.desc}`;
    }

    if (spell.effect === 'light') {
      document.body.classList.add('lumos-active');
      showToast('💡 Lumos Maxima! Floating wand flashlight active!');
    } else if (spell.effect === 'dark') {
      document.body.classList.remove('lumos-active');
      showToast('🌑 Nox! Shadows return.');
    } else if (spell.effect === 'fire') {
      spawnFireEmbers();
      showToast('🔥 Incendio! Fire embers bursting!');
    } else if (spell.effect === 'water') {
      spawnWaterRipples();
      showToast('🌊 Aguamenti! Cauldron refreshed with spring water!');
    } else if (spell.effect === 'unlock') {
      if (promoInput) promoInput.value = 'ALOHOMORA';
      showToast('🗝️ Alohomora! Code "ALOHOMORA" ready in cart!');
    } else if (spell.effect === 'patronum') {
      spawnPatronusMist();
      showToast('🦌 Expecto Patronum! Silver patronus shines bright!');
    } else if (spell.effect === 'riddikulus') {
      window.spookyAudio.playRiddikulusPop();
      spawnConfettiPoof();
      showToast('🪄 Riddikulus! Your deepest fears dissolve into laughter!');
    }
  }

  function spawnFireEmbers() {
    for (let i = 0; i < 40; i++) {
      const ember = document.createElement('div');
      ember.style.position = 'fixed';
      ember.style.left = `${window.innerWidth / 2 + (Math.random() - 0.5) * 300}px`;
      ember.style.top = `${window.innerHeight / 2 + (Math.random() - 0.5) * 300}px`;
      ember.style.width = `${Math.random() * 12 + 6}px`;
      ember.style.height = ember.style.width;
      ember.style.borderRadius = '50%';
      ember.style.backgroundColor = '#ff7518';
      ember.style.boxShadow = '0 0 16px #ea580c, 0 0 30px #f59e0b';
      ember.style.zIndex = '9999';
      ember.style.pointerEvents = 'none';
      ember.style.transition = 'all 0.9s cubic-bezier(0.1, 0.9, 0.2, 1)';
      document.body.appendChild(ember);

      requestAnimationFrame(() => {
        ember.style.transform = `translate(${(Math.random() - 0.5) * 400}px, ${(Math.random() - 0.5) * 400}px) scale(0)`;
        ember.style.opacity = '0';
      });

      setTimeout(() => ember.remove(), 950);
    }
  }

  function spawnWaterRipples() {
    for (let i = 0; i < 25; i++) {
      const drop = document.createElement('div');
      drop.style.position = 'fixed';
      drop.style.left = `${Math.random() * window.innerWidth}px`;
      drop.style.top = `${Math.random() * window.innerHeight}px`;
      drop.style.width = '24px';
      drop.style.height = '24px';
      drop.style.borderRadius = '50%';
      drop.style.border = '2px solid #38bdf8';
      drop.style.boxShadow = '0 0 15px #0284c7';
      drop.style.zIndex = '9999';
      drop.style.pointerEvents = 'none';
      drop.style.transition = 'all 0.8s ease-out';
      document.body.appendChild(drop);

      requestAnimationFrame(() => {
        drop.style.transform = 'scale(3.5)';
        drop.style.opacity = '0';
      });

      setTimeout(() => drop.remove(), 850);
    }
  }

  function spawnPatronusMist() {
    const patronus = document.createElement('div');
    patronus.style.position = 'fixed';
    patronus.style.inset = '0';
    patronus.style.background = 'radial-gradient(circle at center, rgba(224, 231, 255, 0.45) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 80%)';
    patronus.style.zIndex = '9999';
    patronus.style.pointerEvents = 'none';
    patronus.style.transition = 'opacity 1.5s ease-out';
    document.body.appendChild(patronus);

    setTimeout(() => {
      patronus.style.opacity = '0';
      setTimeout(() => patronus.remove(), 1600);
    }, 1200);
  }

  // --- SORTING HAT QUIZ ---
  function renderQuizStep() {
    const quizContent = document.getElementById('quiz-content');
    if (!quizContent) return;

    if (state.quizStep >= SORTING_QUIZ.length) {
      // Calculate house
      const counts = { Gryffindor: 0, Slytherin: 0, Ravenclaw: 0, Hufflepuff: 0 };
      state.quizAnswers.forEach(h => counts[h] = (counts[h] || 0) + 1);
      
      let bestHouse = 'Gryffindor';
      let maxScore = -1;
      for (const house in counts) {
        if (counts[house] > maxScore) {
          maxScore = counts[house];
          bestHouse = house;
        }
      }

      state.userHouse = bestHouse;
      localStorage.setItem('spooky_house', bestHouse);
      window.spookyAudio.playWandChime();

      quizContent.innerHTML = `
        <div style="text-align: center; padding: 20px 0;">
          <div style="font-size: 3.5rem; margin-bottom: 14px;">🎩</div>
          <h2 style="font-family: var(--font-magic); font-size: 1.8rem; color: var(--galleon-bright); margin-bottom: 10px;">
            ${bestHouse.toUpperCase()}!
          </h2>
          <p style="font-size: 1rem; color: #cbd5e1; max-width: 440px; margin: 0 auto 24px; line-height: 1.6;">
            The Sorting Hat has spoken. Your spirit aligns with the ancient traditions of <strong>${bestHouse}</strong>. 
            We have tailored our Halloween shop collection for your house!
          </p>
          <button class="btn-primary-spooky" id="btn-quiz-view-house" style="margin: 0 auto;">
            Explore ${bestHouse} Artifacts
          </button>
        </div>
      `;

      document.getElementById('btn-quiz-view-house').addEventListener('click', () => {
        closeAllModals();
        state.searchQuery = bestHouse.toLowerCase();
        if (searchInput) searchInput.value = bestHouse;
        renderProducts();
        showToast(`⚡ Displaying ${bestHouse} relics & gear!`);
      });
      return;
    }

    const currentQ = SORTING_QUIZ[state.quizStep];
    quizContent.innerHTML = `
      <div style="font-family: var(--font-gothic); color: var(--galleon-gold); text-align: center; margin-bottom: 8px;">
        Question ${state.quizStep + 1} of ${SORTING_QUIZ.length}
      </div>
      <h3 class="quiz-question-title">"${currentQ.question}"</h3>
      <div class="quiz-options-list">
        ${currentQ.options.map(opt => `
          <button class="quiz-option-btn" data-house="${opt.house}">
            ⚡ ${opt.text}
          </button>
        `).join('')}
      </div>
    `;

    quizContent.querySelectorAll('.quiz-option-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const house = e.currentTarget.dataset.house;
        state.quizAnswers.push(house);
        state.quizStep++;
        window.spookyAudio.playOwlHoot();
        renderQuizStep();
      });
    });
  }

  // --- CHECKOUT & OWL POST RECEIPT ---
  function renderCheckoutModal() {
    const container = document.getElementById('checkout-content');
    if (!container) return;

    let subtotal = 0;
    state.cart.forEach(item => {
      const p = PRODUCTS.find(prod => prod.id === item.productId);
      if (p) subtotal += p.priceGalleons * item.qty;
    });

    let discount = state.promo ? (subtotal * (state.promo.discount || 0)) : 0;
    let shipping = (state.promo && state.promo.freeShipping) || subtotal >= SHIPPING_RATES[state.shippingMethod].minFree ? 0 : SHIPPING_RATES[state.shippingMethod].costGalleons;
    let total = Math.max(0, subtotal - discount + shipping);

    container.innerHTML = `
      <div class="parchment-box">
        <div class="parchment-header">
          <div class="parchment-seal">🦉</div>
          <h2>Owl Post Delivery Order</h2>
          <p style="font-family: var(--font-serif); font-size: 0.85rem; color: #78350f; margin-top: 4px;">
            Authorized by The Ministry of Magic & The Spooky Cauldron
          </p>
        </div>

        <form class="parchment-form" id="order-form">
          <div class="parchment-field">
            <label for="wizard-name">Witch / Wizard Full Name:</label>
            <input type="text" id="wizard-name" class="parchment-input" required placeholder="e.g., Albus Percival Wulfric Brian Dumbledore" value="Harry Potter" />
          </div>

          <div class="parchment-field">
            <label for="wizard-address">Delivery Destination (Castle, Chamber, or Muggle Abode):</label>
            <input type="text" id="wizard-address" class="parchment-input" required placeholder="e.g., Gryffindor Tower, Hogwarts Castle / 4 Privet Drive" value="Gryffindor Tower, Hogwarts Castle" />
          </div>

          <div class="parchment-field">
            <label for="vault-key">Gringotts Vault Key / Payment Type:</label>
            <select id="vault-key" class="parchment-input">
              <option value="vault-687">Gringotts Vault 687 (Gold Galleons)</option>
              <option value="vault-713">Gringotts High Security Vault 713</option>
              <option value="muggle-card">Muggle Card (Enchanted Plastic)</option>
            </select>
          </div>

          <div class="parchment-order-items">
            ${state.cart.map(item => {
              const p = PRODUCTS.find(prod => prod.id === item.productId);
              return p ? `
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                  <span>${p.name} × ${item.qty}</span>
                  <strong>${formatPrice(p.priceGalleons * item.qty)}</strong>
                </div>
              ` : '';
            }).join('')}
          </div>

          <div style="font-family: var(--font-magic); font-size: 1.15rem; color: #451a03; display: flex; justify-content: space-between; margin-bottom: 14px;">
            <span>Grand Total Due:</span>
            <span>${formatPrice(total)}</span>
          </div>

          <button type="submit" class="btn-seal-order">
            <span>Seal with Wax & Dispatch Owl</span>
            <span>📜</span>
          </button>
        </form>
      </div>
    `;

    document.getElementById('order-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('wizard-name').value;
      const addr = document.getElementById('wizard-address').value;
      const orderNum = 'OWL-' + Math.floor(100000 + Math.random() * 900000);

      window.spookyAudio.playOwlHoot();

      container.innerHTML = `
        <div class="parchment-box" style="text-align: center;">
          <div class="parchment-seal" style="background: #15803d; border-color: #86efac;">✓</div>
          <h2 style="font-family: var(--font-magic); color: #14532d; font-size: 1.7rem; margin-bottom: 12px;">
            Dispatched via Owl Post!
          </h2>
          <p style="font-size: 0.95rem; line-height: 1.6; margin-bottom: 16px;">
            Thank you, <strong>${name}</strong>. Your parcel has been secured with tamper-proof anti-curse spells and entrusted to our speediest Barn Owls.
          </p>
          <div style="background: rgba(0,0,0,0.05); padding: 14px; border-radius: 6px; font-family: var(--font-gothic); font-size: 1rem; margin-bottom: 24px;">
            🦉 Dispatch Ref: <strong>${orderNum}</strong><br>
            📍 Flight Path: To <strong>${addr}</strong><br>
            ⏱️ Estimated Arrival: Before Tomorrow's Witching Hour
          </div>
          <button class="btn-primary-spooky" id="btn-order-done" style="margin: 0 auto;">
            Return to Emporium
          </button>
        </div>
      `;

      // Clear cart
      state.cart = [];
      saveCart();
      updateCartUI();

      document.getElementById('btn-order-done').addEventListener('click', closeAllModals);
    });
  }

  // --- MODAL UTILS ---
  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add('active');
    if (drawerBackdrop) drawerBackdrop.classList.add('active');
  }

  function closeAllModals() {
    document.querySelectorAll('.modal-wrapper').forEach(m => m.classList.remove('active'));
    if (drawerBackdrop && !cartDrawer.classList.contains('active')) {
      drawerBackdrop.classList.remove('active');
    }
  }

  // --- TOAST NOTIFICATIONS ---
  function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px)';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // --- BOGGART WARDROBE CHALLENGE (PROFESSOR LUPIN'S DADA CLASS) ---
  const BOGGART_SCENARIOS = [
    {
      id: 'dementor',
      scaryName: 'A Rotten Soul-Chilling Dementor',
      scaryLore: 'A towering, cloaked nightmare sweeping toward you with rotting skeletal fingers, freezing the room and draining every happy memory!',
      scaryIcon: `<svg viewBox="0 0 100 100" fill="none" style="width: 130px; height: 130px;">
        <path d="M50 15 C38 15 28 32 26 50 C24 70 34 88 50 90 C66 88 76 70 74 50 C72 32 62 15 50 15 Z" fill="#18181B" stroke="#09090B" stroke-width="2"/>
        <path d="M26 50 C16 65 14 80 20 85 M74 50 C84 65 86 80 80 85" stroke="#27272A" stroke-width="4" stroke-linecap="round"/>
        <ellipse cx="50" cy="45" rx="10" ry="14" fill="#000"/>
        <ellipse cx="50" cy="62" rx="7" ry="10" fill="#000"/>
      </svg>`,
      funnyName: 'The Dementor in Pink Glitter Roller-Skates!',
      funnyLore: 'The Dementor wobbles uncontrollably on bright neon pink roller-skates, wearing a silly birthday cone hat while streamers explode everywhere!',
      funnyIcon: `<svg viewBox="0 0 100 100" fill="none" style="width: 140px; height: 140px;" class="boggart-transformed">
        <!-- Birthday party hat -->
        <polygon points="50,5 40,25 60,25" fill="#EC4899" stroke="#FDE047" stroke-width="2"/>
        <circle cx="50" cy="5" r="4" fill="#FDE047"/>
        <circle cx="46" cy="16" r="2.5" fill="#38BDF8"/>
        <circle cx="54" cy="18" r="2" fill="#FBBF24"/>
        <!-- Dementor body -->
        <path d="M50 24 C38 24 30 38 28 54 C26 70 34 80 50 82 C66 80 74 70 72 54 C70 38 62 24 50 24 Z" fill="#3F3F46" stroke="#18181B" stroke-width="2"/>
        <!-- Funny face -->
        <circle cx="43" cy="40" r="4" fill="#F472B6"/>
        <circle cx="57" cy="40" r="4" fill="#F472B6"/>
        <ellipse cx="50" cy="50" rx="8" ry="4" fill="#FDE047"/>
        <!-- Neon Pink Skates -->
        <rect x="25" y="80" width="20" height="8" rx="2" fill="#EC4899" stroke="#BE185D" stroke-width="1.5"/>
        <circle cx="28" cy="90" r="4" fill="#FDE047" stroke="#D97706" stroke-width="1.5"/>
        <circle cx="42" cy="90" r="4" fill="#FDE047" stroke="#D97706" stroke-width="1.5"/>
        <rect x="55" y="80" width="20" height="8" rx="2" fill="#EC4899" stroke="#BE185D" stroke-width="1.5"/>
        <circle cx="58" cy="90" r="4" fill="#FDE047" stroke="#D97706" stroke-width="1.5"/>
        <circle cx="72" cy="90" r="4" fill="#FDE047" stroke="#D97706" stroke-width="1.5"/>
      </svg>`
    },
    {
      id: 'snape',
      scaryName: 'Furious Professor Severus Snape',
      scaryLore: 'Professor Snape emerges scowling menacingly, dark billowing robes swirling, threatening expulsion and detention until your seventh year!',
      scaryIcon: `<svg viewBox="0 0 100 100" fill="none" style="width: 130px; height: 130px;">
        <!-- Hair and face -->
        <path d="M30 35 C30 18 70 18 70 35 L76 70 L66 65 L66 50 L34 50 L34 65 L24 70 Z" fill="#0F172A"/>
        <ellipse cx="50" cy="42" rx="16" ry="18" fill="#F8FAFC"/>
        <!-- Scowl and nose -->
        <path d="M50 36 L47 48 L52 48" stroke="#334155" stroke-width="2" stroke-linecap="round"/>
        <line x1="43" y1="56" x2="57" y2="56" stroke="#0F172A" stroke-width="2.5"/>
        <line x1="38" y1="36" x2="46" y2="40" stroke="#0F172A" stroke-width="2.5"/>
        <line x1="62" y1="36" x2="54" y2="40" stroke="#0F172A" stroke-width="2.5"/>
        <!-- Dark Robes -->
        <path d="M25 65 L50 60 L75 65 L82 95 L18 95 Z" fill="#09090B" stroke="#000" stroke-width="2"/>
      </svg>`,
      funnyName: 'Snape in Neville\'s Grandmother\'s Vulture Hat!',
      funnyLore: 'Snape is suddenly dressed in a long emerald-green lace dress, an ancient fox-fur stole, and a towering hat crowned with a stuffed vulture, carrying a crimson handbag!',
      funnyIcon: `<svg viewBox="0 0 100 100" fill="none" style="width: 140px; height: 140px;" class="boggart-transformed">
        <!-- Stuffed vulture on hat -->
        <polygon points="50,6 44,14 56,14" fill="#78350F"/>
        <ellipse cx="50" cy="14" rx="8" ry="6" fill="#451A03"/>
        <circle cx="53" cy="12" r="1.5" fill="#FEF08A"/>
        <polygon points="58,13 63,14 58,15" fill="#F59E0B"/>
        <!-- Grandmother Hat Brim -->
        <ellipse cx="50" cy="22" rx="28" ry="6" fill="#15803D" stroke="#14532D" stroke-width="2"/>
        <!-- Snape perplexed face -->
        <ellipse cx="50" cy="36" rx="14" ry="14" fill="#FDE68A"/>
        <circle cx="44" cy="34" r="2.5" fill="#0F172A"/>
        <circle cx="56" cy="34" r="2.5" fill="#0F172A"/>
        <ellipse cx="50" cy="44" rx="4" ry="3" fill="#B91C1C"/>
        <!-- Green Lace Dress -->
        <path d="M30 48 L70 48 L78 88 L22 88 Z" fill="#16A34A" stroke="#15803D" stroke-width="2"/>
        <path d="M30 48 Q50 62 70 48" stroke="#FEF08A" stroke-width="3" fill="none"/>
        <!-- Red handbag -->
        <rect x="68" y="68" width="16" height="14" rx="2" fill="#DC2626" stroke="#991B1B" stroke-width="1.5"/>
        <path d="M72 68 Q76 60 80 68" stroke="#F59E0B" stroke-width="2" fill="none"/>
      </svg>`
    },
    {
      id: 'spider',
      scaryName: 'A Giant Hairy Acromantula Spider',
      scaryLore: 'A colossal eight-legged spider skittering rapidly with clicking venomous fangs and razor-sharp bristling leg spines!',
      scaryIcon: `<svg viewBox="0 0 100 100" fill="none" style="width: 130px; height: 130px;">
        <ellipse cx="50" cy="40" rx="14" ry="12" fill="#18181B" stroke="#000" stroke-width="2"/>
        <ellipse cx="50" cy="62" rx="22" ry="18" fill="#18181B" stroke="#000" stroke-width="2"/>
        <circle cx="44" cy="34" r="2.5" fill="#DC2626"/>
        <circle cx="56" cy="34" r="2.5" fill="#DC2626"/>
        <circle cx="48" cy="30" r="2" fill="#DC2626"/>
        <circle cx="52" cy="30" r="2" fill="#DC2626"/>
        <!-- Fangs -->
        <path d="M44 48 L46 56 M56 48 L54 56" stroke="#F8FAFC" stroke-width="3" stroke-linecap="round"/>
        <!-- 8 Legs -->
        <path d="M40 38 C25 25 15 35 8 50 M40 42 C22 38 12 55 10 70 M60 38 C75 25 85 35 92 50 M60 42 C78 38 88 55 90 70" stroke="#27272A" stroke-width="3.5" stroke-linecap="round"/>
      </svg>`,
      funnyName: 'Spider on 8 Slippery Roller-Skates!',
      funnyLore: 'The spider tries to charge, but its eight legs are fitted with roller skates, causing it to slip and do the splits in wild cartoon confusion!',
      funnyIcon: `<svg viewBox="0 0 100 100" fill="none" style="width: 140px; height: 140px;" class="boggart-transformed">
        <ellipse cx="50" cy="40" rx="14" ry="12" fill="#3B1C52" stroke="#2E1065" stroke-width="2"/>
        <ellipse cx="50" cy="62" rx="20" ry="16" fill="#3B1C52" stroke="#2E1065" stroke-width="2"/>
        <circle cx="44" cy="36" r="3" fill="#FDE047"/>
        <circle cx="56" cy="36" r="3" fill="#FDE047"/>
        <path d="M45 44 Q50 50 55 44" stroke="#F43F5E" stroke-width="2" fill="none"/>
        <!-- Legs with yellow roller skates on tips -->
        <path d="M38 38 Q18 20 12 36 M38 45 Q15 45 8 60 M62 38 Q82 20 88 36 M62 45 Q85 45 92 60" stroke="#581C87" stroke-width="3" stroke-linecap="round"/>
        <circle cx="12" cy="36" r="4" fill="#F59E0B"/>
        <circle cx="8" cy="60" r="4" fill="#F59E0B"/>
        <circle cx="88" cy="36" r="4" fill="#F59E0B"/>
        <circle cx="92" cy="60" r="4" fill="#F59E0B"/>
      </svg>`
    }
  ];

  function openBoggartChallenge() {
    window.spookyAudio.playWardrobeRattle();
    openModal(boggartModal);
    renderWardrobeClosed();
  }

  function renderWardrobeClosed() {
    const stage = document.getElementById('wardrobe-stage');
    const actions = document.getElementById('boggart-action-bar');
    if (!stage || !actions) return;

    stage.innerHTML = `
      <div class="wardrobe-visual-wrap rattling" id="boggart-wardrobe-click" title="Click to rattle the wardrobe!">
        <svg viewBox="0 0 100 100" fill="none" style="width: 100%; height: 100%;">
          <polygon points="50,12 85,22 15,22" fill="#593009" stroke="#381D03" stroke-width="2.5"/>
          <rect x="20" y="22" width="60" height="66" rx="2" fill="#783F04" stroke="#381D03" stroke-width="3"/>
          <line x1="50" y1="22" x2="50" y2="88" stroke="#381D03" stroke-width="2.5"/>
          <rect x="24" y="28" width="22" height="26" fill="#593009" stroke="#381D03" stroke-width="1.5"/>
          <rect x="54" y="28" width="22" height="26" fill="#593009" stroke="#381D03" stroke-width="1.5"/>
          <circle cx="47" cy="46" r="2.5" fill="#EF4444"/>
          <circle cx="53" cy="46" r="2.5" fill="#EF4444"/>
          <circle cx="46" cy="56" r="2.5" fill="#F59E0B"/>
          <circle cx="54" cy="56" r="2.5" fill="#F59E0B"/>
        </svg>
      </div>
      <p style="font-family: var(--font-gothic); font-size: 1.15rem; color: #fde047; margin-top: 16px;">
        *THUD! BANG! RATTLE!*<br>
        <span style="font-size: 0.88rem; color: #cbd5e1; font-family: var(--font-sans);">Something sinister is violently pounding inside the staffroom wardrobe...</span>
      </p>
    `;

    document.getElementById('boggart-wardrobe-click').addEventListener('click', () => {
      window.spookyAudio.playWardrobeRattle();
    });

    actions.innerHTML = `
      <button class="btn-primary-spooky" id="btn-unlock-wardrobe" style="font-size: 1.05rem; padding: 12px 28px;">
        <span>🗝️ Turn Key & Unleash the Boggart</span>
      </button>
    `;

    document.getElementById('btn-unlock-wardrobe').addEventListener('click', unleashBoggart);
  }

  function unleashBoggart() {
    window.spookyAudio.playSpellZap();
    const stage = document.getElementById('wardrobe-stage');
    const actions = document.getElementById('boggart-action-bar');
    if (!stage || !actions) return;

    // Pick random scenario
    currentBoggart = BOGGART_SCENARIOS[Math.floor(Math.random() * BOGGART_SCENARIOS.length)];

    stage.innerHTML = `
      <div class="boggart-creature">
        ${currentBoggart.scaryIcon}
        <h3 style="font-family: var(--font-magic); font-size: 1.35rem; color: #ef4444; margin-top: 8px;">
          ${currentBoggart.scaryName}!
        </h3>
        <p style="font-size: 0.9rem; color: #e2e8f0; max-width: 480px; line-height: 1.5;">
          ${currentBoggart.scaryLore}
        </p>
      </div>
    `;

    actions.innerHTML = `
      <button class="btn-riddikulus" id="btn-cast-riddikulus">
        <span>🪄 Cast RIDDIKULUS!</span>
      </button>
    `;

    document.getElementById('btn-cast-riddikulus').addEventListener('click', transformBoggart);
  }

  function transformBoggart() {
    window.spookyAudio.playRiddikulusPop();
    spawnConfettiPoof();

    const stage = document.getElementById('wardrobe-stage');
    const actions = document.getElementById('boggart-action-bar');
    if (!stage || !actions || !currentBoggart) return;

    stage.innerHTML = `
      <div class="boggart-creature">
        ${currentBoggart.funnyIcon}
        <h3 style="font-family: var(--font-magic); font-size: 1.4rem; color: #fde047; margin-top: 8px;">
          ${currentBoggart.funnyName}
        </h3>
        <p style="font-size: 0.92rem; color: #cbd5e1; max-width: 480px; line-height: 1.5;">
          ${currentBoggart.funnyLore}
        </p>
        <div style="background: rgba(245, 158, 11, 0.15); border: 1px dashed #f59e0b; padding: 10px 16px; border-radius: 8px; margin-top: 10px;">
          <span style="font-family: var(--font-magic); color: #fde047; font-size: 1rem;">
            🌕 Professor Lupin: <em>"Brilliant! 10 points to your house! Have some chocolate, you've earned it."</em>
          </span>
        </div>
      </div>
    `;

    actions.innerHTML = `
      <button class="btn-primary-spooky" id="btn-claim-lupin-gift">
        <span>🍫 Claim Lupin's Chocolate to Cauldron (Code: RIDDIKULUS)</span>
      </button>
      <button class="btn-secondary-magic" id="btn-retry-boggart">
        <span>🚪 Another Boggart</span>
      </button>
    `;

    document.getElementById('btn-claim-lupin-gift').addEventListener('click', () => {
      // Add chocolate to cart and set promo
      addToCart('potter-lupin-chocolate', 1);
      state.promo = { code: 'RIDDIKULUS', discount: 0.10, freeShipping: false };
      if (promoInput) promoInput.value = 'RIDDIKULUS';
      updateCartUI();
      closeAllModals();
      openCart();
      showToast('🍫 Professor Lupin\'s Anti-Dementor Chocolate brewed into Cauldron with 10% discount!');
    });

    document.getElementById('btn-retry-boggart').addEventListener('click', renderWardrobeClosed);
  }

  function spawnConfettiPoof() {
    for (let i = 0; i < 35; i++) {
      const conf = document.createElement('div');
      conf.style.position = 'fixed';
      conf.style.left = `${window.innerWidth / 2}px`;
      conf.style.top = `${window.innerHeight / 2}px`;
      conf.style.width = `${Math.random() * 10 + 6}px`;
      conf.style.height = `${Math.random() * 10 + 6}px`;
      conf.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      const colors = ['#f43f5e', '#ec4899', '#fde047', '#38bdf8', '#a855f7', '#22c55e'];
      conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      conf.style.zIndex = '9999';
      conf.style.pointerEvents = 'none';
      conf.style.transition = 'all 0.8s cubic-bezier(0.1, 0.9, 0.2, 1)';
      document.body.appendChild(conf);

      requestAnimationFrame(() => {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 320 + 80;
        conf.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) rotate(${Math.random() * 360}deg) scale(0)`;
        conf.style.opacity = '0';
      });

      setTimeout(() => conf.remove(), 850);
    }
  }

  // Launch!
  document.addEventListener('DOMContentLoaded', init);
})();
