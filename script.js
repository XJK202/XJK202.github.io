document.documentElement.classList.add('js');

const header = document.querySelector('.site-header');
const nav = document.querySelector('.site-nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const sections = [...document.querySelectorAll('main section[id]')];
const toast = document.querySelector('#toast');
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 1800);
}

async function copyText(text, successMessage) {
  if (navigator.clipboard && window.isSecureContext) {
    const copied = await navigator.clipboard.writeText(text).then(() => true, () => false);
    if (copied) {
      showToast(successMessage);
      return;
    }
  }
  const previousFocus = document.activeElement;
  const input = document.createElement('textarea');
  input.value = text;
  input.setAttribute('readonly', '');
  input.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
  document.body.appendChild(input);
  let copied = false;
  try {
    input.select();
    copied = document.execCommand('copy');
  } catch {
    copied = false;
  } finally {
    input.remove();
    previousFocus?.focus({ preventScroll: true });
  }
  showToast(copied ? successMessage : '复制未成功，请手动选择文字复制');
}

function setNavOpen(open) {
  nav?.classList.toggle('open', open);
  navToggle?.setAttribute('aria-expanded', String(open));
  const label = navToggle?.querySelector('.sr-only');
  if (label) label.textContent = open ? '关闭导航' : '展开导航';
  if (nav) nav.inert = window.innerWidth <= 820 && !open;
}

navToggle?.addEventListener('click', () => {
  setNavOpen(navToggle.getAttribute('aria-expanded') !== 'true');
});
navLinks.forEach((link) => link.addEventListener('click', () => setNavOpen(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navToggle?.getAttribute('aria-expanded') === 'true') {
    setNavOpen(false);
    navToggle.focus();
  }
});
document.addEventListener('click', (event) => {
  if (!header?.contains(event.target)) setNavOpen(false);
});
setNavOpen(false);

let navigationFrame = 0;
function updateNavigation() {
  navigationFrame = 0;
  header?.classList.toggle('scrolled', window.scrollY > 12);
  if (!sections.length) return;
  const marker = (header?.offsetHeight || 0) + window.innerHeight * 0.2;
  let current = sections[0];
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= marker) current = section;
  });
  if (Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 2) {
    current = sections[sections.length - 1];
  }
  navLinks.forEach((link) => {
    const active = link.hash === `#${current.id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
window.addEventListener('scroll', () => {
  if (!navigationFrame) navigationFrame = requestAnimationFrame(updateNavigation);
}, { passive: true });
window.addEventListener('resize', () => {
  setNavOpen(false);
  updateNavigation();
});
updateNavigation();

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px -20px' });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

document.querySelector('#copy-phone')?.addEventListener('click', (event) => {
  copyText(event.currentTarget.dataset.copy, '手机号已复制');
});

const caseData = {
  entity: {
    query: '“继续围绕现在的核心补强，别换流派。”',
    context: '示例设定：当前为甲阵营·守卫流派；同名核心还有乙阵营·突袭流派版本，本局乙阵营不可用。',
    wrong: '推荐另一阵营的同名核心',
    wrongReason: '只匹配英雄名，忽略阵营、流派与禁用约束。',
    right: '先确认完整实体与可用范围',
    rightReason: '沿用玩家选定的阵营与流派，再依据现有棋子讨论补强。',
    rule: '推荐前同时核对英雄名、阵营、流派与局面约束；同名不代表可互换。'
  },
  strength: {
    query: '“三号位已经成型，我这一轮还能赢吗？”',
    context: '上下文：己方仍在补齐核心组件；对手强度较高。',
    wrong: '只分析对手战力',
    wrongReason: '只看到了对手，遗漏了“我能否取胜”的比较需求。',
    right: '比较双方战力',
    rightReason: '“还能赢吗”要求结合双方盘面说明风险。',
    rule: '先判断真实任务；明确询问胜负时，比较双方信息，并说明预测的不确定性。'
  },
  board: {
    query: '“刚拿到的守卫，能直接上场吗？”',
    context: '局面：人口 6 / 6；守卫在备战区，备战区仍有空位。',
    wrong: '直接上场',
    wrongReason: '混淆备战区空位与上场人口，建议无法执行。',
    right: '先替换，再上场',
    rightReason: '上场人口已满，应先下场一名单位，再讨论替换收益。',
    rule: '提出操作建议前，核对人口、资源和阵营等前置条件；“有这张牌”不代表“现在能上”。'
  },
  emotion: {
    query: '“这也太离谱了，为什么效果没有触发？”',
    context: '当前只知道效果未触发，具体触发规则与条件尚需核对。',
    wrong: '只安慰，不回答问题',
    wrongReason: '把强烈语气当成唯一意图，遗漏了机制询问。',
    right: '先核对机制，再承接情绪',
    rightReason: '核心需求是解释触发原因；信息不足时应追问，而不是编造。',
    rule: '明确事实询问优先得到处理；语气影响回复方式，但不能替代事实核对。'
  },
  fallback: {
    query: '“把提示关掉，以后别再弹出来。”',
    context: '示例标签集没有覆盖提醒设置；用户的动作对象和目标明确。',
    wrong: '判为意图模糊',
    wrongReason: '因为标签未覆盖，就误以为无法理解用户。',
    right: '其他（意图明确）',
    rightReason: '需求已经清楚，应归入明确兜底，并确认产品是否支持该操作。',
    rule: '标签未覆盖、意图不清、能力不支持是三个不同问题，不能用同一个兜底结论代替。'
  }
};

const caseElements = {
  query: document.querySelector('#case-query'),
  context: document.querySelector('#case-context'),
  wrong: document.querySelector('#case-wrong'),
  wrongReason: document.querySelector('#case-wrong-reason'),
  right: document.querySelector('#case-right'),
  rightReason: document.querySelector('#case-right-reason'),
  rule: document.querySelector('#case-rule')
};

function renderCase(key) {
  const item = caseData[key];
  if (!item) return;
  Object.entries(caseElements).forEach(([name, element]) => {
    if (element) element.textContent = item[name];
  });
}

function bindTabs(selector, panel, onSelect) {
  const buttons = [...document.querySelectorAll(selector)];
  if (!panel || !buttons.length) return;
  const activate = (button, focus = false) => {
    buttons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    panel.setAttribute('aria-labelledby', button.id);
    onSelect(button);
    if (focus) button.focus();
  };
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => activate(button));
    button.addEventListener('keydown', (event) => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + buttons.length) % buttons.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = buttons.length - 1;
      else return;
      event.preventDefault();
      activate(buttons[next], true);
    });
  });
  activate(buttons.find((button) => button.getAttribute('aria-selected') === 'true') || buttons[0]);
}

bindTabs('[data-case]', document.querySelector('#case-panel'), (button) => renderCase(button.dataset.case));

const datasetSamples = ['strength-001', 'emotion-005', 'context-017'];
const dataset = Array.isArray(window.GAMEAI_DATASET) ? window.GAMEAI_DATASET : [];
const sampleOutput = document.querySelector('#dataset-sample code');
bindTabs('[data-sample]', document.querySelector('#dataset-sample'), (button) => {
  if (!sampleOutput) return;
  const item = dataset.find((row) => row.case_id === datasetSamples[Number(button.dataset.sample)]);
  if (!item) {
    sampleOutput.textContent = '案例暂未加载，请刷新页面，或下载 Excel 查看。';
    return;
  }
  const rows = [
    ['案例编号', item.case_id],
    ['问题切片', item.slice_tags],
    ['示例问题', item.query],
    ['局面摘要', item.state_summary || '本例无盘面输入'],
    ['规则依据', item.rule_summary],
    ['参考标签', item.gold_label],
    ['判定证据', item.evidence],
    ['候选回复', item.candidate_response],
    ['参考结论', item.verdict === 'pass' ? '通过' : '需修复']
  ];
  if (item.root_cause) rows.push(['错误归因', item.root_cause]);
  if (item.recommended_fix) rows.push(['修复建议', item.recommended_fix]);
  sampleOutput.textContent = rows.map(([label, value]) => `${label}  ${value}`).join('\n\n');
});

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());
