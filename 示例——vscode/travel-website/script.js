// ===== 导航栏滚动效果 =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

  // 数字滚动动画触发
  animateStats();
});

// ===== 汉堡菜单 =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// 点击移动菜单链接后关闭菜单
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// ===== 数字递增动画 =====
let statsAnimated = false;

function animateStats() {
  const statsSection = document.querySelector('.stats');
  if (!statsSection || statsAnimated) return;

  const rect = statsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    statsAnimated = true;
    document.querySelectorAll('.stat-number').forEach(el => {
      const target = parseInt(el.dataset.target);
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current).toLocaleString();
      }, 16);
    });
  }
}

// ===== 搜索处理 =====
function handleSearch() {
  const keyword = document.getElementById('searchInput').value.trim();
  const type = document.getElementById('searchType').value;

  if (!keyword && !type) {
    showToast('请输入目的地或选择行程类型');
    return;
  }

  const msg = keyword
    ? `正在为您搜索"${keyword}"的相关行程...`
    : `正在为您筛选${document.getElementById('searchType').options[document.getElementById('searchType').selectedIndex].text}行程...`;

  showToast(msg);
}

// ===== 表单提交 =====
function handleSubmit(event) {
  event.preventDefault();
  showToast('提交成功！我们的旅行顾问将在24小时内联系您。');
  event.target.reset();
}

// ===== Toast 提示 =====
function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 90px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: #1a1a2e;
    color: #fff;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 0.92rem;
    box-shadow: 0 4px 20px rgba(0,0,0,0.25);
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s, transform 0.3s;
    max-width: 90vw;
    text-align: center;
  `;

  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ===== 回到顶部 =====
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== 卡片入场动画 =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.tour-card, .feature-item, .testimonial-card, .dest-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// 平滑滚动（兼容旧浏览器）
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// 初始检查（页面加载时如果已经在 stats 位置）
animateStats();
