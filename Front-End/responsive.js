// ========================================
// HEADER SHRINK ON SCROLL & SCROLL TO TOP BUTTON
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  
  // ===== HEADER SCROLL BEHAVIOR =====
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      // Add 'is-scrolled' class when scrolled more than 50px
      if (window.scrollY > 50) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };

    // Initialize on load
    onScroll();
    
    // Listen to scroll events (passive for better performance)
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ===== SCROLL TO TOP BUTTON =====
  const scrollToTopBtn = document.querySelector('.scrollToTop');
  
  if (scrollToTopBtn) {
    // Show/hide button based on scroll position
    const toggleScrollButton = () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
      } else {
        scrollToTopBtn.classList.remove('show');
      }
    };

    // Initialize button state
    toggleScrollButton();

    // Listen to scroll events
    window.addEventListener('scroll', toggleScrollButton, { passive: true });

    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Smooth scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ===== FILTERS TOGGLE FOR MOBILE (Products page) =====
  const filtersToggleBtn = document.querySelector('.filters-toggle-btn');
  
  if (filtersToggleBtn) {
    filtersToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('filters-open');
      
      // Scroll to top when opening filters on mobile
      if (document.body.classList.contains('filters-open')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // Close filters when clicking on backdrop
  document.addEventListener('click', (e) => {
    if (document.body.classList.contains('filters-open') && 
        !e.target.closest('.prod-filters') && 
        !e.target.closest('.filters-toggle-btn')) {
      document.body.classList.remove('filters-open');
    }
  });
});