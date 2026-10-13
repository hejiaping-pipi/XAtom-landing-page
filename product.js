const syncProductPreviewScale = () => {
  const requestedPreviewWidth = Number(new URLSearchParams(window.location.search).get('mobile-preview'));
  const viewportWidth = Number.isFinite(requestedPreviewWidth) && requestedPreviewWidth >= 320 && requestedPreviewWidth <= 767
    ? requestedPreviewWidth
    : document.documentElement.clientWidth || window.innerWidth;
  const scale = Math.max(1, viewportWidth) / 1440;
  document.documentElement.style.setProperty('--product-preview-scale', String(scale));
  document.documentElement.style.setProperty('--product-mobile-text-zoom', String(1 / scale));
  document.documentElement.style.setProperty('--product-mobile-feature-title-size', `${19.4535 / scale}px`);
  document.documentElement.style.setProperty('--product-mobile-feature-title-line', `${34 / scale}px`);
  document.documentElement.style.setProperty('--product-mobile-feature-copy-size', `${13.5 / scale}px`);
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
    colourName.textContent = currentProductLanguage === "zh-CN"
      ? (productTranslations[button.dataset.colour] || button.dataset.colour)
      : button.dataset.colour;
  });
});

// Keep the original artwork visible until the first video frame and restore it
// when the one-shot animation has finished.
const productHero = document.querySelector('.product-hero');
const productHeroVideo = productHero?.querySelector('.product-hero-video');
if (productHeroVideo) {
  const showCover = () => {
    productHeroVideo.classList.add('is-finished');
    productHero.classList.remove('has-video');
  };
  productHeroVideo.addEventListener('playing', () => productHero.classList.add('is-playing'), { once: true });
  productHeroVideo.addEventListener('ended', showCover, { once: true });
  productHeroVideo.addEventListener('error', showCover, { once: true });
  if (!productHeroVideo.paused && productHeroVideo.readyState >= 2) productHero.classList.add('is-playing');
  if (productHeroVideo.ended) showCover();
  else productHeroVideo.play().catch(showCover);
}

const productTranslations = {
  'Homepage': '首页',
  'XAtom Device': 'XAtom 设备',
  'Personalized Body': '个性化外壳',
  'Shop': '商店',
  'About Us': '关于我们',
  'English': '中文',
  'British': '英国',
  'Menu': '菜单',
  'Account': '账户',
  'Search': '搜索',
  'Cart': '购物车',
  'Language: English': '语言：中文',
  'Physical Muse AI assistant': '实体缪斯 AI 助手',
  'Compact, portable AI agents with instant access to intelligent capabilities.': '小巧便携的 AI 智能体，随时随地开启智能体验。',
  'Price:': '价格：',
  'Save 39%': '节省 39%',
  'COLOR:': '颜色：',
  'Blush/Muted': '暖黄',
  'Mist Blue': '雾蓝',
  'Quantity:': '数量：',
  'Shop Now': '立即购买',
  'ADD TO CART': '加入购物车',
  'Smart fashion items': '时尚随身配饰',
  'It can also become a fashion statement for you.': '它也可以成为你的时尚表达。',
  'Communicate': '交流互动',
  'Communicate with all parterners.': '与身边伙伴自在交流。',
  'Social contact': '社交陪伴',
  'Help you socialize with others.': '帮助你与他人建立联系。',
  'Good choice for gifts.': '送礼佳选',
  'Good choice for gifts': '送礼佳选',
  'The top choice for a heartwarming gift.': '一份温暖心意的理想之选。',
  'Shop All': '查看全部',
  'Amplify human intelligence': '增强人类智能',
  'Ask AI about Xatom': '向 AI 了解 XAtom',
  'Contact us': '联系我们',
  'Moli Space T2,Shanghai,China': '中国上海 Moli Space T2',
  'Search us': '关注我们',
  'Copyright © 2026 XATOM. Reserve all rights.': '版权所有 © 2026 XATOM。保留所有权利。',
  'Private Policy': '隐私政策',
  'Use Item': '使用条款',
  'Sale and Refund': '销售与退款',
  'Law Information': '法律信息',
  'XATOM home': 'XATOM 首页',
  'Primary navigation': '主导航',
  'Utility navigation': '功能导航',
  'Quick actions': '快捷操作',
  'Cart, 0 items': '购物车，0 件商品',
  'Open menu': '打开菜单',
  'Close menu': '关闭菜单',
  'Switch to Chinese': '切换为中文',
  'Product thumbnails': '商品缩略图',
  '5 out of 5 stars': '5 星满分',
  'Quantity': '数量',
  'Decrease quantity': '减少数量',
  'Increase quantity': '增加数量',
  'Yellow XATOM device': '黄色 XATOM 设备',
  'Yellow XATOM device image': '黄色 XATOM 设备图片',
  'XATOM AI assistant in four colours': '四色 XATOM AI 助手',
  'XATOM character charm attached to a black bag': '挂在黑色皮包上的 XATOM 玩偶挂件',
  'XATOM character charm attached to a brown handbag': '挂在棕色手提包上的 XATOM 玩偶挂件',
  'Three cyclists riding together': '三位骑行者结伴出行',
  'Children playing together with toys': '孩子们一起玩玩具',
  'A gift box tied with a blue ribbon': '系着蓝色丝带的礼盒',
  'AI services': 'AI 服务',
  'Legal navigation': '法律导航',
  'XATOM — Amplify human intelligence. Contact: garyyang@qiniu.com. Moli Space T2, Shanghai, China. Copyright 2026 XATOM.': 'XATOM——增强人类智能。联系邮箱：garyyang@qiniu.com。地址：中国上海 Moli Space T2。版权所有 © 2026 XATOM。'
};

const translatableText = [];
const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
while (textWalker.nextNode()) {
  const node = textWalker.currentNode;
  if (productTranslations[node.nodeValue.trim()]) translatableText.push([node, node.nodeValue]);
}
const translatableAttributes = [];
document.body.querySelectorAll('[aria-label], [alt], [title], [placeholder]').forEach((element) => {
  ['aria-label', 'alt', 'title', 'placeholder'].forEach((attribute) => {
    const value = element.getAttribute(attribute);
    if (value && productTranslations[value]) translatableAttributes.push([element, attribute, value]);
  });
});

let currentProductLanguage = 'en';
const applyProductLanguage = (language) => {
  currentProductLanguage = language;
  document.documentElement.lang = language;
  document.title = language === 'zh-CN' ? 'XATOM 设备' : 'XATOM Device';
  translatableText.forEach(([node, original]) => {
    const translated = productTranslations[original.trim()];
    node.nodeValue = language === 'zh-CN' ? original.replace(original.trim(), translated) : original;
  });
  translatableAttributes.forEach(([element, attribute, original]) => {
    element.setAttribute(attribute, language === 'zh-CN' ? productTranslations[original] : original);
  });
  const selectedColour = document.querySelector('[data-colour].is-selected')?.dataset.colour;
  if (selectedColour && colourName) colourName.textContent = language === 'zh-CN'
    ? productTranslations[selectedColour] : selectedColour;
  document.querySelectorAll('[data-language-toggle]').forEach((button) => {
    button.setAttribute('aria-label', language === 'zh-CN' ? '切换为英文' : 'Switch to Chinese');
    button.querySelector('span').textContent = button.classList.contains('product-mobile-language')
      ? (language === 'zh-CN' ? '语言：中文' : 'Language: English')
      : (language === 'zh-CN' ? '中文' : 'English');
  });
  document.dispatchEvent(new Event('xatom-language-change'));
};

document.querySelectorAll('[data-language-toggle]').forEach((button) => {
  button.addEventListener('click', () => applyProductLanguage(currentProductLanguage === 'en' ? 'zh-CN' : 'en'));
});
