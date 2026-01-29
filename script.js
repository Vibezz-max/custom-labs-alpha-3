// script.js - Updated for multi-page site
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinkElements = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close mobile menu when clicking a link
    navLinkElements.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (menuToggle) {
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-container') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (menuToggle) {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for empty hashes or just "#"
            if (href === '#' || href === '') {
                return;
            }
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                const navHeight = document.querySelector('.main-nav')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll effect to navigation on scroll
    let lastScroll = 0;
    const mainNav = document.querySelector('.main-nav');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (mainNav && mainNav.classList.contains('fixed')) {
            if (currentScroll > lastScroll && currentScroll > 100) {
                // Scrolling down
                mainNav.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                mainNav.style.transform = 'translateY(0)';
            }
        }
        
        lastScroll = currentScroll;
    });
    
    // Add transition to nav
    if (mainNav) {
        mainNav.style.transition = 'transform 0.3s ease';
    }
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements with fade-in class
    document.querySelectorAll('.featured-card, .benefit-card, .value-card, .team-member, .product-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Hero section animations (home page)
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const scrollPercentage = Math.min(scrollPosition / windowHeight, 1);
            
            if (scrollIndicator) {
                scrollIndicator.style.opacity = 1 - (scrollPercentage * 3);
            }
        });
    }
});