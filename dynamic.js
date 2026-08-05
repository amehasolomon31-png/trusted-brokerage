document.addEventListener("DOMContentLoaded", () => {
  // 1. Grid vs Map View Toggle & Leaflet Map Initialization
  const btnGrid = document.getElementById("btn-grid-view");
  const btnMap = document.getElementById("btn-map-view");
  const gridView = document.getElementById("properties-grid");
  const mapContainer = document.getElementById("map-container");
  let mapInstance = null;
  let mapInitialized = false;

  if (btnGrid && btnMap && gridView && mapContainer) {
    btnGrid.addEventListener("click", () => {
      btnGrid.classList.add("active");
      btnMap.classList.remove("active");
      gridView.style.display = "grid";
      mapContainer.style.display = "none";
    });

    btnMap.addEventListener("click", () => {
      btnMap.classList.add("active");
      btnGrid.classList.remove("active");
      gridView.style.display = "none";
      mapContainer.style.display = "block";

      if (!mapInitialized && typeof L !== "undefined") {
        // የኢትዮጵያ (አዲስ አበባ) መነሻ ኮኦርዲኔት
        mapInstance = L.map("map-container").setView([9.01079, 38.76125], 12);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
        }).addTo(mapInstance);

        // Marker 1: ቦሌ
        L.marker([9.03, 38.76])
          .addTo(mapInstance)
          .bindPopup("<b>ዘመናዊ ቪላ</b><br>15,000,000 ብር (ቦሌ)");

        // Marker 2: CMC
        L.marker([9.01, 38.78])
          .addTo(mapInstance)
          .bindPopup("<b>አፓርታማ</b><br>7,500,000 ብር (CMC)");

        mapInitialized = true;
      }

      // ካርታው ከተደበቀበት ሲወጣ ስክሪኑን ሙሉ በሙሉ እንዲሞላ የሚረዳ
      if (mapInstance) {
        setTimeout(() => {
          mapInstance.invalidateSize();
        }, 100);
      }
    });
  }

  // 2. Auth Form Tab Switcher (Login / Register)
  const tabLogin = document.getElementById("tab-login");
  const tabRegister = document.getElementById("tab-register");
  const formLogin = document.getElementById("form-login");
  const formRegister = document.getElementById("form-register");

  if (tabLogin && tabRegister && formLogin && formRegister) {
    const switchTab = (activeTab, inactiveTab, activeForm, inactiveForm) => {
      activeTab.classList.add("active");
      inactiveTab.classList.remove("active");
      activeForm.classList.add("active");
      inactiveForm.classList.remove("active");
    };

    tabLogin.addEventListener("click", () =>
      switchTab(tabLogin, tabRegister, formLogin, formRegister),
    );
    tabRegister.addEventListener("click", () =>
      switchTab(tabRegister, tabLogin, formRegister, formLogin),
    );

    // URL Hash Check (ለምሳሌ auth.html#register ተብሎ ከተከፈተ)
    if (window.location.hash === "#register") {
      switchTab(tabRegister, tabLogin, formRegister, formLogin);
    }
  }
});

// 3. Header Scroll Shadow Effect
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
});
// Smooth Theme Toggle Effect
const themeToggleBtn =
  document.querySelector(".theme-toggle") ||
  document.getElementById("theme-btn");

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    // Smooth Transition Effect
    document.body.style.transition =
      "background-color 0.4s ease, color 0.4s ease";
  });
}
// Generic Tab & View Switcher (Works like Auth Switcher everywhere)
function setupTabSwitcher(buttonSelector, contentSelector) {
  const buttons = document.querySelectorAll(buttonSelector);
  const contents = document.querySelectorAll(contentSelector);

  buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      // Remove active class from all
      buttons.forEach((b) => b.classList.remove("active"));
      contents.forEach((c) => c.classList.remove("active"));

      // Add active class to clicked button & corresponding content
      btn.classList.add("active");
      if (contents[index]) {
        contents[index].classList.add("active");
      }
    });
  });
}

// Execute for Grid/Map or other dynamic sections
document.addEventListener("DOMContentLoaded", () => {
  setupTabSwitcher(".view-btn", ".view-panel");
});
// Dynamic FAQ Accordion with Smooth Slide
document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");

    questionBtn.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      // ሌሎቹን ክፍት ጥያቄዎች Slide አድርጎ መዝጋት
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });

      // የተጫኑትን ማብራት/ማጥፋት (Toggle)
      if (!isOpen) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  });
});
