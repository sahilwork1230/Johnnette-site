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

  if (copyrightYear) copyrightYear.textContent = new Date().getFullYear();

  let activeIndex = 0;
  const images = thumbnails.map((button) => ({
    src: button.dataset.image,
    alt: button.dataset.alt
  }));

  // Only local project assets are loaded; no external image URLs.
  images.forEach((item) => {
    const preload = new Image();
    preload.src = item.src;
  });

  function showImage(index) {
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

    thumbnails.forEach((button, i) => {
      const isActive = i === activeIndex;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
    if (currentNumber) currentNumber.textContent = String(activeIndex + 1).padStart(2, "0");
  }

  thumbnails.forEach((button, index) => button.addEventListener("click", () => showImage(index)));
  previousButton?.addEventListener("click", () => showImage(activeIndex - 1));
  nextButton?.addEventListener("click", () => showImage(activeIndex + 1));

  document.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowLeft") showImage(activeIndex - 1);
    if (event.key === "ArrowRight") showImage(activeIndex + 1);
    if (event.key === "Escape" && mobileNavigation && !mobileNavigation.hidden) {
      mobileNavigation.hidden = true;
      menuButton?.setAttribute("aria-expanded", "false");
      menuButton?.setAttribute("aria-label", "Open navigation");
    }
  });

  menuButton?.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    menuButton.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
    mobileNavigation.hidden = expanded;
  });

  mobileNavigation?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    mobileNavigation.hidden = true;
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Open navigation");
  }));

  window.addEventListener("resize", () => {
    if (window.innerWidth > 680 && mobileNavigation && menuButton) {
      mobileNavigation.hidden = true;
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
    }
  }, { passive: true });
})();