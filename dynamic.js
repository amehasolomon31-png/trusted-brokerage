document.addEventListener('DOMContentLoaded', () => {
  // 1. Grid vs Map View Toggle & Leaflet Map Initialization
  const btnGrid = document.getElementById('btn-grid-view');
  const btnMap = document.getElementById('btn-map-view');
  const gridView = document.getElementById('properties-grid');
  const mapContainer = document.getElementById('map-container');
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
        const map = L.map('map-container').setView([9.01079, 38.76125], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap'
        }).addTo(map);

        L.marker([9.03, 38.76]).addTo(map).bindPopup('<b>ዘመናዊ ቪላ</b><br>15,000,000 ብር (ቦሌ)').openPopup();
        L.marker([9.01, 38.78]).addTo(map).bindPopup('<b>አፓርታማ</b><br>7,500,000 ብር (CMC)');
        mapInitialized = true;
      }
    });
  }

  // 2. Auth Form Tab Switcher (Login / Register)
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  const formLogin = document.getElementById('form-login');
  const formRegister = document.getElementById('form-register');

  if (tabLogin && tabRegister && formLogin && formRegister) {
    tabLogin.addEventListener('click', () => {
      tabLogin.classList.add('active');
      tabRegister.classList.remove('active');
      formLogin.classList.add('active');
      formRegister.classList.remove('active');
    });

    tabRegister.addEventListener('click', () => {
      tabRegister.classList.add('active');
      tabLogin.classList.remove('active');
      formRegister.classList.add('active');
      formLogin.classList.remove('active');
    });
  }
});