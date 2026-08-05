document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger-menu');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  const themeToggle = document.getElementById('theme-toggle');
  const updateThemeButton = () => {
    if (!themeToggle) return;
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  };
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  }
  updateThemeButton();
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeButton();
    });
  }

  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  const setSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  };
  const nextBtn = document.querySelector('.next-slide');
  const prevBtn = document.querySelector('.prev-slide');
  if (slides.length && nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      setSlide(currentSlide);
    });
    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      setSlide(currentSlide);
    });
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      setSlide(currentSlide);
    }, 5000);
  }

  document.querySelectorAll('.counter').forEach((counter) => {
    const target = Number(counter.dataset.target) || 0;
    const updateCount = () => {
      const current = Number(counter.innerText) || 0;
      const increment = Math.max(1, Math.floor(target / 50));
      if (current < target) {
        counter.innerText = String(Math.min(target, current + increment));
        setTimeout(updateCount, 30);
      }
    };
    updateCount();
  });

  document.querySelectorAll('.faq-question').forEach((question) => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      if (item) {
        item.classList.toggle('active');
      }
    });
  });

  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  const formLogin = document.getElementById('form-login');
  const formRegister = document.getElementById('form-register');
  if (tabLogin && tabRegister && formLogin && formRegister) {
    const switchTab = (activeTab, inactiveTab, activeForm, inactiveForm) => {
      activeTab.classList.add('active');
      inactiveTab.classList.remove('active');
      activeForm.classList.add('active');
      inactiveForm.classList.remove('active');
    };
    tabLogin.addEventListener('click', () => switchTab(tabLogin, tabRegister, formLogin, formRegister));
    tabRegister.addEventListener('click', () => switchTab(tabRegister, tabLogin, formRegister, formLogin));
    if (window.location.hash === '#register') {
      switchTab(tabRegister, tabLogin, formRegister, formLogin);
    }
  }

  const setupSearch = (inputId, itemSelector) => {
    const input = document.getElementById(inputId);
    const items = Array.from(document.querySelectorAll(itemSelector));
    if (!input || !items.length) return;
    input.addEventListener('input', () => {
      const query = input.value.trim().toLowerCase();
      items.forEach((item) => {
        item.style.display = query && !item.textContent.toLowerCase().includes(query) ? 'none' : '';
      });
    });
  };
  setupSearch('carSearch', '.car-item');
  setupSearch('propertySearch', '.property-item');

  const btnGrid = document.getElementById('btn-grid-view');
  const btnMap = document.getElementById('btn-map-view');
  const gridView = document.getElementById('properties-grid');
  const mapContainer = document.getElementById('map-container');
  let mapInstance = null;
  let mapInitialized = false;
  if (btnGrid && btnMap && gridView && mapContainer) {
    btnGrid.addEventListener('click', () => {
      btnGrid.classList.add('active');
      btnMap.classList.remove('active');
      gridView.style.display = 'grid';
      mapContainer.style.display = 'none';
    });
    btnMap.addEventListener('click', () => {
      btnMap.classList.add('active');
      btnGrid.classList.remove('active');
      gridView.style.display = 'none';
      mapContainer.style.display = 'block';
      if (!mapInitialized && typeof L !== 'undefined') {
        mapInstance = L.map('map-container').setView([9.01079, 38.76125], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(mapInstance);
        L.marker([9.03, 38.76]).addTo(mapInstance).bindPopup('<b>ዘመናዊ ቪላ</b><br>15,000,000 ብር (ቦሌ)');
        L.marker([9.01, 38.78]).addTo(mapInstance).bindPopup('<b>አፓርታማ</b><br>7,500,000 ብር (CMC)');
        mapInitialized = true;
      }
      if (mapInstance) {
        setTimeout(() => mapInstance.invalidateSize(), 100);
      }
    });
  }

  const detailMapEl = document.getElementById('detail-map');
  if (detailMapEl && typeof L !== 'undefined') {
    const detailMap = L.map('detail-map').setView([9.03, 38.76], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(detailMap);
    L.marker([9.03, 38.76]).addTo(detailMap).bindPopup('ዘመናዊ ቪላ (ቦሌ)').openPopup();
  }
});

window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 50);
});
