/**
 * Arctic Edge Group - Main JavaScript
 * Handles Navigation, Animations, Scrolling, and Interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initMobileMenu();
    initSmoothScroll();
});

/**
 * 1. Visual Scroll Animations (Fade In Up)
 * Uses Intersection Observer to trigger animations when elements enter viewport
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => observer.observe(el));
}

/**
 * 2. Mobile Navigation Toggle
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link'); 
    const partnerBtn = document.querySelector('.mobile-nav-btn');

    if (!menuToggle || !nav) return;

    // Toggle Menu
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when a link is clicked
    const closeMenu = () => {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
    };

    navLinks.forEach(link => link.addEventListener('click', closeMenu));
    if (partnerBtn) partnerBtn.addEventListener('click', closeMenu);
}

/**
 * 3. Smooth Scrolling for Anchor Links
 * Adds offset for fixed header
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 100; // Height of fixed header + buffer
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
}
