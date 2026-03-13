/* ===================================
   THE HOUSE HUNTER - Main JavaScript
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

  // --- Pinterest Save Buttons ---
  // Inject "Save to Pinterest" hover buttons on all product images and post card images
  document.querySelectorAll('.product-rec-img, .post-card-img, .product-mini-card-img').forEach(el => {
    // Skip if it only contains an emoji placeholder (no real image yet)
    if (el.querySelector('img')) {
      const saveBtn = document.createElement('a');
      const img     = el.querySelector('img');
      const pageUrl = encodeURIComponent(window.location.href);
      const imgUrl  = encodeURIComponent(img.src);
      const desc    = encodeURIComponent(
        document.querySelector('h1')?.textContent?.trim() ||
        document.title
      );

      saveBtn.href        = `https://pinterest.com/pin/create/button/?url=${pageUrl}&media=${imgUrl}&description=${desc}`;
      saveBtn.target      = '_blank';
      saveBtn.rel         = 'noopener noreferrer';
      saveBtn.className   = 'pinterest-save-btn';
      saveBtn.setAttribute('aria-label', 'Save to Pinterest');
      saveBtn.innerHTML   = `<svg width="14" height="14" fill="white" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg> Save`;

      el.style.position = 'relative';
      el.appendChild(saveBtn);
    }
  });

  // --- Active Nav Link ---
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) link.classList.add('active');
  });

});
