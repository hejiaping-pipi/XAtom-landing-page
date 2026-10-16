(() => {
  const translations = {
    "Meeting": "会议",
    "Taxi": "叫车",
    "Emergency": "紧急求助",
    "Stocks": "股票",
    "Delivery": "配送",
    "Travel": "旅行",
    "Chat": "聊天",
    "Care": "关怀",

    "A new generation of physical AI agents.": "新一代实体 AI 智能体。",
    "It supports intelligent interaction across multiple scenarios—whether at home, in the office, on the go, or in the car—integrating smart companionship into every aspect of your life and meeting your diverse needs anytime, anywhere.": "无论居家、办公、出行还是驾车，都能智能交互，让智慧陪伴融入生活，随时随地满足你的多样需求。",
    "Offering a wide range of personalized casings and modular combinations, it supports free mixing and matching as well as creative customization, unlocking a unique modular smart experience tailored to you.": "提供丰富的个性外壳与模块组合，支持自由搭配和创意定制，打造专属于你的模块化智能体验。",
    "make a phone call": "拨打电话",
    "send message you": "发送消息",
    "monitor personal status": "监测个人状态",
    "order MaDonald’s": "订购麦当劳",
    "connect to your car": "连接汽车",
    "check plane tickets": "查询机票",
    "XAtom,I want to order Doco Restaurant": "XAtom，我想订 Doco 餐厅的餐。",
    "Okay, I'll order Doco Restaurant.": "好的，我来帮你订 Doco 餐厅。",
    "What do you want to eat? There's a special offer on french fries today.": "你想吃什么？今天薯条有优惠。",
    "XATOM, help me order Doco.": "XATOM，帮我订 Doco。",
    "Recognized Order Request": "已识别订餐需求",
    "Restaurant: Doco": "餐厅：Doco",
    "Items: Burger + Fries + Cola": "餐品：汉堡、薯条、可乐",
    "Quantity: 1 set": "数量：1 份",
    "External Service Connection": "连接外部服务",
    "Burger ×1": "汉堡 ×1",
    "Fries ×1": "薯条 ×1",
    "Cola ×1": "可乐 ×1",
    "Total $12": "合计 $12",
    "Confirm Order": "确认下单",
    "Order submitted. The restaurant is now processing it.": "订单已提交，餐厅正在处理中。",
    "Doco—your order has been placed. Estimated arrival: 25 minutes.": "Doco：下单成功，预计 25 分钟送达。",

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

    'Mini · Versatile · Smart': '小巧 · 百变 · 智能',
    'XAtom is a physical Muse AI assistant that performs tasks on behalf of others.': 'XAtom 是一款实体 Muse AI 助手，可以代你完成任务。',
    'Versatile Settings · Natural · Distinctive Style': '多元场景 · 自然交互 · 独特风格',
    'Freedom · Uniqueness · Individuality': '自由 · 独特 · 个性',
    'XATOM is a smart, miniature AI interaction device designed around the core concepts of compact size, seamless integration, and powerful intelligence. Thanks to its embedded design, it can be integrated into everyday objects for easy portability, bringing intelligence to every aspect of daily life.': 'XATOM 是一款小巧的 AI 交互设备，以紧凑体积、无缝融入和强大智能为核心。它可以嵌入日常物品，方便随身携带，让智能融入生活的每一处。',
    'XATOM is a smart, miniature AI interaction device.': 'XATOM 是一款小巧的 AI 交互设备。',
    'Get XAtom': '了解 XAtom',
    'One XAtom': '一个 XAtom',
    'Exists Everywhere': '无处不在',
    'XAtom can be used in a wide range of everyday situations.': 'XAtom 可以融入各种日常场景。',
    'XAtom covers almost all common scenarios.': 'XAtom 覆盖几乎所有常见场景。',
    'One XAtom.': '一个 XAtom。',
    'Many different shapes.': '百变造型。',
    'One AI core that adapts to different shapes.': '一个 AI 核心，适配不同造型。',
    'One AI core that adapts to your life.': '一个 AI 核心，融入你的生活。',
    'Coffee Shop': '咖啡馆',
    'City Cycling': '城市骑行',
    'Hanging Out': '外出相聚',
    'Baby Room': '婴儿房',
    'On The Desk': '书桌旁',
    'See how it works': '了解工作方式',
    'Talk': '说话',
    'understand': '理解',
    'connect': '连接',
    'Perform all operations via voice interaction.': '通过语音交互完成所有操作。',
    'AI models understands your task.': 'AI 模型理解你的任务。',
    'MCP connects online and offline channels.': 'MCP 连接线上与线下服务。',
    'Xatom,how do I make salad?': 'XAtom，沙拉怎么做？',
    'Xatom,how many kings of vegetables do I need to prepare?': 'XAtom，做沙拉需要准备哪些蔬菜？',
    'Make a salad you will need lettuce, tomatoes, cucmbers and dressing, let me show you the step.': '做沙拉需要生菜、番茄、黄瓜和沙拉酱。我来一步步教你。',
    'Varied Designs': '多样设计',
    'Premium Craft': '精致工艺',
    'Custom Made': '专属定制',
    'Collector’s Choice': '收藏之选',
    'Your XAtom Style.': '打造你的 XAtom 风格。',
    'Shop All': '查看全部',
    'Support of major AI models': '支持主流 AI 模型',
    'Comprehensive support for major AI models in the industry.': '全面支持业内主流 AI 模型。',
    'Powerful AI capabilities': '强大的 AI 能力',
    'Diverse large-scale AI models help address issues.': '多种大模型协助解决问题。',
    'Use it extremely Simple': '使用起来非常简单',
    'You can start using it simply by turning it on.': '开机即可轻松使用。',
    'Short press to open': '短按开启',
    'Long press to close': '长按关闭',
    'Double press to switch wifi/5G': '双击切换 Wi-Fi/5G',
    'Press × 2': '按两下',
    'Privacy Protection': '隐私保护',
    'Uses LiDAR instead of cameras to detect status.': '以激光雷达代替摄像头感知状态。',
    'Detects Multiple Scenarios': '识别多种场景',
    'Accurately identifies people, objects and movements': '准确识别人、物体和动作',
    'to ensure safer and smarter interaction.': '让交互更安全、更智能。',
    '3D Spatial Perception': '三维空间感知',
    'People Detection': '人员检测',
    'Recognizes people': '识别人员',
    'and tracks movement.': '并跟踪动作。',
    'Posture Recognition': '姿态识别',
    'Identifies different': '识别不同',
    'body postures.': '身体姿态。',
    'Fall Detection': '跌倒检测',
    'Detects abnormal': '检测异常',
    'postures and triggers alerts.': '姿态并触发提醒。',
    'Personalized language pack': '个性化语音包',
    'Freely choose voice packs featuring your favorite animals, celebrities, and anime characters.': '自由选择喜欢的动物、明星和动漫角色语音包。',
    'Pop Star': '流行歌手',
    'Fashionista Girl': '时尚女孩',
    'Cheerful Companion': '活力伙伴',
    'Gentle Female': '温柔女声',
    'Warm Narrator': '暖心旁白',
    'Playful Cat': '俏皮猫咪',
    'Little Fairy': '小仙女',
    'Voice Interaction': '语音交互',
    '3D Print': '3D 打印',
    'Creative': '创意设计',
    'Lidar Detect': '激光雷达感知',
    'AI Models': 'AI 模型',
    'Personalized': '个性化',
    'More than one way.': '不止一种方式。',
    'Many different Roles.': '更多不同角色。',
    'Play with AI.': '与 AI 一起玩。',
    'Business': '商务工作',
    'Explorer': '探索者',
    'Fitness enthusiasts': '健身爱好者',
    'Students': '学生',
    'Teenager': '青少年',
    'Travelers': '旅行者',
    'Travel Assistant': '旅行助手',
    'Travel Companions': '旅途伙伴',
    'Smart Tour Guide': '智能导游',
    'Workout Partner': '运动伙伴',
    'Private Coach': '私人教练',
    'Safety Guard': '安全守护',
    'Older man order a taxi.': '老人语音叫车。',
    'XATOM supports schedules, reminders, communication, and travel planning throughout busy workdays.': 'XATOM 在忙碌的工作日里协助安排日程、提醒事项、沟通交流和出行计划。',
    'XATOM provides hands-free guidance, safety checks, and emergency support for outdoor exploration.': 'XATOM 为户外探索提供免提指引、安全检测和紧急支持。',
    'XATOM keeps workouts on track with voice coaching, progress guidance, and hands-free encouragement.': 'XATOM 通过语音指导、进度提示和免提鼓励，陪你坚持运动。',
    'XATOM is a personal AI learning companion for languages, exams, and new skills.': 'XATOM 是学习语言、备考和掌握新技能的个人 AI 伙伴。',
    'XATOM is a personal cultural guide offering real-time stories and insights about nearby sites.': 'XATOM 是你的随身文化向导，实时讲述附近地点的故事与知识。',
    'XATOM is an AI travel companion offering conversation, local recommendations, and itinerary planning.': 'XATOM 是能聊天、推荐当地去处并规划行程的 AI 旅伴。',
    'It adapts plans in real time and provides emergency assistance for safer, smoother journeys.': '它实时调整计划并提供紧急协助，让旅途更安全顺畅。',
    'It delivers location-based recommendations for a deeper, more meaningful travel experience.': '它根据位置推荐内容，让旅行体验更深入、更有意义。',
    'It offers voice-based explanations, Q&A, and personalized study planning.': '它提供语音讲解、问答和个性化学习规划。',

    'Next-generation AI agent platform': '下一代 AI 智能体平台',
    'Intelligent understanding abilities.': '具备智能理解能力。',
    'XATOM integrates advanced AI, edge computing, and IoT technologies to create intelligent devices that understand users, perceive their surroundings, take action, and provide continuous companionship.': 'XATOM 融合先进 AI、边缘计算与物联网技术，打造能够理解用户、感知环境、采取行动并持续陪伴的智能设备。',
    'XAtom Brings AI to Physical world': 'XAtom 将 AI 带入物理世界',
    'Integrate AI into your real life.': '让 AI 融入真实生活。',
    'From Bits to Atom': '从比特到原子',
    'Empowers your life, just like Muse.': '像灵感缪斯一样，为生活赋能。',
    'Physical AI that transcends the screen.': '超越屏幕的实体 AI。',
    'XATOM brings AI into the physical world, enabling instant, anywhere assistance and seamlessly connecting people, devices, and intelligent services.': 'XATOM 将 AI 带入物理世界，让你随时随地获得即时协助，并无缝连接人与设备及智能服务。',

    'XATOM home': 'XATOM 首页',
    'Primary navigation': '主导航',
    'Utility navigation': '功能导航',
    'Quick actions': '快捷操作',
    'Cart, 0 items': '购物车，0 件商品',
    'Open menu': '打开菜单',
    'Close menu': '关闭菜单',
    'Login': '登录',
    'AI services': 'AI 服务',
    'Legal navigation': '法律导航',
    'Play XATOM brand film': '播放 XATOM 品牌影片',
    'Pause XATOM brand film': '暂停 XATOM 品牌影片',
    'XATOM brand film': 'XATOM 品牌影片',
    'Next slide': '下一张',
    'Previous slide': '上一张',
    'Next video': '下一个视频',
    'Previous video': '上一个视频',
    'Next banner': '下一张横幅',
    'Next shells': '下一组外壳',
    'Previous shells': '上一组外壳',
    'Hero pages': '首屏分页',
    'Hero carousel pages': '首屏轮播分页',
    'Everyday situations': '日常场景',
    'Scenario navigation': '场景导航',
    'Scenario video navigation': '场景视频导航',
    'Shell collection navigation': '外壳系列导航',
    'XATOM capabilities': 'XATOM 功能',
    'XATOM highlights': 'XATOM 亮点',
    'XATOM shell benefits': 'XATOM 外壳优势',
    'Supported AI models': '支持的 AI 模型',
    '5 out of 5 stars': '5 星满分',
    'XATOM — Amplify human intelligence. Contact: garyyang@qiniu.com. Moli Space T2, Shanghai, China. Copyright 2026 XATOM.': 'XATOM——增强人类智能。联系邮箱：garyyang@qiniu.com。地址：中国上海 Moli Space T2。版权所有 © 2026 XATOM。'
  };

  const page = document.body.classList.contains('product-body') ? 'product'
    : document.body.classList.contains('about-body') ? 'about' : 'home';
  const pageTitles = { home: ['XATOM', 'XATOM'], about: ['About Us | XATOM', '关于我们 | XATOM'], product: ['XATOM Device', 'XATOM 设备'] };
  const originalTexts = new WeakMap();
  const originalAttributes = new WeakMap();
  let currentLanguage = 'en';

  const translated = (value) => {
    const clean = value.trim();
    const dynamic = clean.match(/^(Open|Close) (.+) details$/);
    if (dynamic) return `${dynamic[1] === 'Open' ? '打开' : '关闭'}${translations[dynamic[2]] || dynamic[2]}详情`;
    const slide = clean.match(/^Go to slide (\d+) of (\d+)$/);
    if (slide) return `跳转到第 ${slide[1]} 张，共 ${slide[2]} 张`;
    const hero = clean.match(/^Hero page (\d+)$/);
    if (hero) return `首屏第 ${hero[1]} 页`;
    const group = clean.match(/^(\d+) of (\d+)$/);
    if (group) return `第 ${group[1]} 张，共 ${group[2]} 张`;
    const card = clean.match(/^Show (.+) card$/);
    if (card) return `显示${translations[card[1]] || card[1]}卡片`;
    return translations[clean];
  };

  const localizeText = (node) => {
    if (node.parentElement?.closest('script, style, noscript, option, [data-language-picker]')) return;
    const current = node.nodeValue;
    let original = originalTexts.get(node);
    const previousTranslation = original && translated(original);
    if (original === undefined || (current !== original && current !== original.replace(original.trim(), previousTranslation || original.trim()))) {
      original = current;
      originalTexts.set(node, original);
    }
    const replacement = translated(original);
    if (!replacement) return;
    const desired = currentLanguage === 'zh-CN' ? original.replace(original.trim(), replacement) : original;
    if (current !== desired) node.nodeValue = desired;
  };

  const localizeAttributes = (element) => {
    if (element.closest('[data-language-picker]')) return;
    let originals = originalAttributes.get(element);
    if (!originals) { originals = new Map(); originalAttributes.set(element, originals); }
    for (const attribute of ['aria-label', 'alt', 'title', 'placeholder']) {
      const current = element.getAttribute(attribute);
      if (!current) continue;
      let original = originals.get(attribute);
      if (original === undefined || (current !== original && current !== (translated(original) || original))) {
        original = current;
        originals.set(attribute, original);
      }
      const replacement = translated(original);
      if (!replacement) continue;
      const desired = currentLanguage === 'zh-CN' ? replacement : original;
      if (current !== desired) element.setAttribute(attribute, desired);
    }
  };

  const localizeTree = (root) => {
    if (root.nodeType === Node.TEXT_NODE) { localizeText(root); return; }
    if (root.nodeType !== Node.ELEMENT_NODE) return;
    localizeAttributes(root);
    root.querySelectorAll('[aria-label], [alt], [title], [placeholder]').forEach(localizeAttributes);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) localizeText(walker.currentNode);
  };

  const languagePickers = [...document.querySelectorAll('[data-language-picker]')];
  const updateLanguageSelectors = () => {
    languagePickers.forEach((picker) => {
      const trigger = picker.querySelector('[data-language-trigger]');
      const label = trigger.querySelector('.locale-label');
      const isMobile = picker.matches('.site-mobile-language, .product-mobile-language');
      const text = currentLanguage === 'zh-CN'
        ? (isMobile ? '语言：中文' : '中文')
        : (isMobile ? 'Language: English' : 'English');
      if (label.textContent !== text) label.textContent = text;
      trigger.setAttribute('aria-label', currentLanguage === 'zh-CN' ? '选择语言' : 'Select language');
      picker.querySelectorAll('[data-language-choice]').forEach((option) => {
        option.setAttribute('aria-checked', String(option.dataset.languageChoice === currentLanguage));
      });
    });
  };

  const closeLanguageMenus = ({ restoreFocus = false } = {}) => {
    let wasOpen = false;
    languagePickers.forEach((picker) => {
      const trigger = picker.querySelector('[data-language-trigger]');
      if (trigger.getAttribute('aria-expanded') !== 'true') return;
      wasOpen = true;
      trigger.setAttribute('aria-expanded', 'false');
      picker.querySelector('.language-menu').hidden = true;
      if (restoreFocus) trigger.focus({ preventScroll: true });
    });
    if (wasOpen) document.dispatchEvent(new CustomEvent('xatom-language-menu-change', { detail: { open: false } }));
  };

  const openLanguageMenu = (picker, focusIndex) => {
    closeLanguageMenus();
    picker.querySelector('[data-language-trigger]').setAttribute('aria-expanded', 'true');
    picker.querySelector('.language-menu').hidden = false;
    document.dispatchEvent(new CustomEvent('xatom-language-menu-change', { detail: { open: true } }));
    if (focusIndex !== undefined) picker.querySelectorAll('[data-language-choice]')[focusIndex].focus({ preventScroll: true });
  };

  const syncLinks = () => {
    document.querySelectorAll('a[href]').forEach((link) => {
      const href = link.getAttribute('href');
      if (!/^(index|about-us|xatom-device)\.html(?:[?#]|$)/.test(href)) return;
      const target = new URL(href, location.href);
      if (currentLanguage === 'zh-CN') target.searchParams.set('lang', 'zh');
      else target.searchParams.delete('lang');
      link.setAttribute('href', `${target.pathname.split('/').pop()}${target.search}${target.hash}`);
    });
  };

  const persistLanguage = () => {
    try { localStorage.setItem('xatom-site-language', currentLanguage); } catch (_) { /* file URLs may block storage */ }
    try { sessionStorage.setItem('xatom-site-language', currentLanguage); } catch (_) { /* file URLs may block storage */ }
    try {
      const url = new URL(location.href);
      if (currentLanguage === 'zh-CN') url.searchParams.set('lang', 'zh');
      else url.searchParams.delete('lang');
      history.replaceState(null, '', url.href);
    } catch (_) { /* URL query on links still preserves the choice */ }
    syncLinks();
  };

  const applyLanguage = (language) => {
    currentLanguage = language;
    if (page === 'product') {
      window.XatomApplyProductLanguage?.(language);
    } else {
      document.documentElement.lang = language;
      document.title = pageTitles[page][language === 'zh-CN' ? 1 : 0];
      localizeTree(document.body);
      document.dispatchEvent(new Event('xatom-language-change'));
    }
    updateLanguageSelectors();
    persistLanguage();
  };

  document.addEventListener('xatom-language-change', () => {
    currentLanguage = document.documentElement.lang === 'zh-CN' ? 'zh-CN' : 'en';
    updateLanguageSelectors();
    persistLanguage();
  });

  languagePickers.forEach((picker) => {
    const trigger = picker.querySelector('[data-language-trigger]');
    const options = [...picker.querySelectorAll('[data-language-choice]')];
    trigger.addEventListener('click', () => {
      if (trigger.getAttribute('aria-expanded') === 'true') closeLanguageMenus();
      else openLanguageMenu(picker);
    });
    trigger.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
      event.preventDefault();
      openLanguageMenu(picker, event.key === 'ArrowDown' ? 0 : options.length - 1);
    });
    options.forEach((option, index) => {
      option.addEventListener('click', () => {
        applyLanguage(option.dataset.languageChoice);
        closeLanguageMenus({ restoreFocus: true });
      });
      option.addEventListener('keydown', (event) => {
        let next;
        if (event.key === 'ArrowDown') next = (index + 1) % options.length;
        if (event.key === 'ArrowUp') next = (index + options.length - 1) % options.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = options.length - 1;
        if (next === undefined) return;
        event.preventDefault();
        options[next].focus({ preventScroll: true });
      });
    });
    picker.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || trigger.getAttribute('aria-expanded') !== 'true') return;
      event.preventDefault();
      event.stopPropagation();
      closeLanguageMenus({ restoreFocus: true });
    });
    picker.addEventListener('focusout', (event) => {
      if (!picker.contains(event.relatedTarget)) closeLanguageMenus();
    });
  });
  document.addEventListener('pointerdown', (event) => {
    if (!event.target.closest('[data-language-picker]')) closeLanguageMenus();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeLanguageMenus({ restoreFocus: true });
  });
  window.addEventListener('resize', () => closeLanguageMenus());

  if (page !== 'product') {
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        if (record.type === 'characterData') localizeText(record.target);
        else if (record.type === 'attributes') localizeAttributes(record.target);
        else record.addedNodes.forEach(localizeTree);
      }
    });
    observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['aria-label', 'alt', 'title', 'placeholder'] });
  }

  const queryChoice = new URLSearchParams(location.search).get('lang');
  let savedChoice;
  try { savedChoice = localStorage.getItem('xatom-site-language'); } catch (_) { /* optional */ }
  if (!savedChoice) try { savedChoice = sessionStorage.getItem('xatom-site-language'); } catch (_) { /* optional */ }
  applyLanguage(queryChoice === 'zh' || (!queryChoice && savedChoice === 'zh-CN') ? 'zh-CN' : 'en');
})();
