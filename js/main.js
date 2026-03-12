/* ===================================
   HOME HAVEN - Main JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Menu ---
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav     = document.querySelector('.mobile-nav');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const mobileClose   = document.querySelector('.mobile-close-btn');

  function openMobileNav() {
    mobileNav?.classList.add('open');
    mobileOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav?.classList.remove('open');
    mobileOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  mobileMenuBtn?.addEventListener('click', openMobileNav);
  mobileClose?.addEventListener('click', closeMobileNav);
  mobileOverlay?.addEventListener('click', closeMobileNav);

  // --- Search Overlay ---
  const searchBtns    = document.querySelectorAll('.search-btn');
  const searchOverlay = document.querySelector('.search-overlay');
  const searchInput   = document.querySelector('.search-box input');

  function openSearch() {
    searchOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput?.focus(), 100);
  }

  function closeSearch() {
    searchOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  searchBtns.forEach(btn => btn.addEventListener('click', openSearch));

  searchOverlay?.addEventListener('click', (e) => {
    if (e.target === searchOverlay) closeSearch();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSearch();
      closeMobileNav();
    }
  });

  // --- Sticky Header Shadow ---
  const header = document.querySelector('.site-header');

  window.addEventListener('scroll', () => {
    if (header) {
      header.style.boxShadow = window.scrollY > 10
        ? '0 2px 20px rgba(44,37,34,0.12)'
        : '0 1px 4px rgba(44,37,34,0.07)';
    }
  });

  // --- Category Pills Active State ---
  const categoryPills = document.querySelectorAll('.category-pill');

  categoryPills.forEach(pill => {
    pill.addEventListener('click', function () {
      categoryPills.forEach(p => p.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // --- Smooth Scroll for TOC ---
  document.querySelectorAll('.toc-list a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 90;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll(
    '.post-card, .product-mini-card, .comparison-table-wrapper, .product-rec-card'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

  // --- Newsletter Form ---
  const newsletterForm = document.querySelector('.newsletter-form');

  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const btn        = newsletterForm.querySelector('button');
    const email      = emailInput?.value.trim();

    if (!email || !email.includes('@')) {
      emailInput?.focus();
      return;
    }

    if (btn) {
      btn.textContent = '✓ You\'re in!';
      btn.style.background = '#7B9E87';
      btn.disabled = true;
    }

    if (emailInput) emailInput.value = '';

    setTimeout(() => {
      if (btn) {
        btn.textContent = 'Subscribe Free';
        btn.style.background = '';
        btn.disabled = false;
      }
    }, 4000);
  });

  // --- Amazon Button Tracking (placeholder for analytics) ---
  document.querySelectorAll('.btn-amazon').forEach(btn => {
    btn.addEventListener('click', function () {
      const productName = this.closest('[data-product]')?.dataset.product
        || this.closest('.comparison-table tr')?.querySelector('.product-cell-info strong')?.textContent
        || 'Unknown Product';

      // Replace with real analytics tracking (e.g., Google Analytics event)
      console.log(`[The House Hunter] Amazon click: ${productName}`);
    });
  });

  // --- Active Nav Link ---
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) link.classList.add('active');
  });

});
