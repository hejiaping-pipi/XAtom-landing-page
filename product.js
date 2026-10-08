const syncProductPreviewScale = () => {
  const requestedPreviewWidth = Number(new URLSearchParams(window.location.search).get('mobile-preview'));
  const viewportWidth = Number.isFinite(requestedPreviewWidth) && requestedPreviewWidth >= 320 && requestedPreviewWidth <= 767
    ? requestedPreviewWidth
    : window.innerWidth || document.documentElement.clientWidth;
  const scale = Math.min(1, Math.max(1, viewportWidth) / 1440);
  document.documentElement.style.setProperty('--product-preview-scale', String(scale));
  document.documentElement.style.setProperty('--product-mobile-text-zoom', String(1 / scale));
  document.documentElement.style.setProperty('--product-mobile-feature-title-size', `${28 / scale}px`);
  document.documentElement.style.setProperty('--product-mobile-feature-title-line', `${34 / scale}px`);
  document.documentElement.style.setProperty('--product-mobile-feature-copy-size', `${14 / scale}px`);
  document.documentElement.style.setProperty('--product-mobile-feature-copy-line', `${20 / scale}px`);
};

syncProductPreviewScale();
window.addEventListener('resize', syncProductPreviewScale, { passive: true });

const quantityValue = document.querySelector("[data-quantity-value]");

document.querySelector("[data-quantity-increase]")?.addEventListener("click", () => {
  quantityValue.value = String(Number(quantityValue.value) + 1);
});

document.querySelector("[data-quantity-decrease]")?.addEventListener("click", () => {
  quantityValue.value = String(Math.max(1, Number(quantityValue.value) - 1));
});

const colourName = document.querySelector("[data-colour-name]");
document.querySelectorAll("[data-colour]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-colour]").forEach((option) => {
      const selected = option === button;
      option.classList.toggle("is-selected", selected);
      option.setAttribute("aria-pressed", String(selected));
    });
    colourName.textContent = button.dataset.colour;
  });
});
