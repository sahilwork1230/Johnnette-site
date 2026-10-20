(() => {
  "use strict";

  const mainImage = document.getElementById("gallery-main-image");
  const thumbnails = Array.from(document.querySelectorAll(".gallery-thumb"));
  const previousButton = document.querySelector(".gallery-prev");
  const nextButton = document.querySelector(".gallery-next");
  const currentNumber = document.getElementById("current-image-number");
  const menuButton = document.getElementById("menu-bar");
  const mobileNavigation = document.getElementById("mobile-navigation");
  const copyrightYear = document.getElementById("copyright-year");
  const detailTabs = Array.from(document.querySelectorAll(".details-tab"));
  const detailPanels = Array.from(document.querySelectorAll(".details-panel"));

  detailTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const selected = tab.dataset.panel;
      detailTabs.forEach((item) => {
        const active = item === tab;
        item.classList.toggle("active", active);
        item.setAttribute("aria-selected", String(active));
      });
      detailPanels.forEach((panel) => {
        const active = panel.id === `panel-${selected}`;
        panel.hidden = !active;
        panel.classList.toggle("active", active);
      });
    });
  });

  if (copyrightYear) {
    copyrightYear.textContent = String(new Date().getFullYear());
  }

  const images = thumbnails.map((button) => ({
    src: button.dataset.image,
    alt: button.dataset.alt || ""
  }));
  let activeIndex = 0;

  function showImage(index) {
    if (!mainImage || images.length === 0) return;

    activeIndex = (index + images.length) % images.length;
    const selected = images[activeIndex];
    const replacement = new Image();

    mainImage.classList.add("is-changing");
    replacement.onload = () => {
      mainImage.src = selected.src;
      mainImage.alt = selected.alt;
      mainImage.classList.remove("is-changing");
    };
    replacement.onerror = () => {
      mainImage.classList.remove("is-changing");
      console.error("JB-1 image could not be loaded. Check filename and path:", selected.src);
    };
    replacement.src = selected.src;

    thumbnails.forEach((button, thumbnailIndex) => {
      const isActive = thumbnailIndex === activeIndex;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    if (currentNumber) {
      currentNumber.textContent = String(activeIndex + 1).padStart(2, "0");
    }
  }

  thumbnails.forEach((button, index) => {
    button.addEventListener("click", () => showImage(index));
  });

  previousButton?.addEventListener("click", () => showImage(activeIndex - 1));
  nextButton?.addEventListener("click", () => showImage(activeIndex + 1));

  function closeMobileNavigation() {
    if (!mobileNavigation || !menuButton) return;

    mobileNavigation.hidden = true;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  }

  menuButton?.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    menuButton.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
    if (mobileNavigation) mobileNavigation.hidden = expanded;
  });

  mobileNavigation?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileNavigation);
  });

  document.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;

    if (event.key === "ArrowLeft") showImage(activeIndex - 1);
    if (event.key === "ArrowRight") showImage(activeIndex + 1);
    if (event.key === "Escape") closeMobileNavigation();
  });

  const header = document.getElementById("site-header");
  const headerBackground = document.querySelector(".header_background");
  let previousScrollPosition = window.pageYOffset;

  window.addEventListener("scroll", () => {
    const currentScrollPosition = window.pageYOffset;
    if (currentScrollPosition > window.innerHeight / 2) {
      headerBackground?.classList.add("show_background");
    } else {
      headerBackground?.classList.remove("show_background");
    }

    if (currentScrollPosition > previousScrollPosition) {
      header?.classList.remove("show");
    } else {
      header?.classList.add("show");
    }
    previousScrollPosition = currentScrollPosition;
  }, { passive: true });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeMobileNavigation();
  }, { passive: true });
})();
