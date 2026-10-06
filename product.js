const syncProductPreviewScale = () => {
  const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
  const scale = Math.min(1, Math.max(360, viewportWidth) / 1440);
  document.documentElement.style.setProperty('--product-preview-scale', String(scale));
  document.documentElement.style.setProperty('--product-mobile-feature-title-size', `${24 / scale}px`);
  document.documentElement.style.setProperty('--product-mobile-feature-title-line', `${28 / scale}px`);
  document.documentElement.style.setProperty('--product-mobile-feature-copy-size', `${16 / scale}px`);
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
