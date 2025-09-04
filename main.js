// ===== GLOBAL VARIABLES =====
let cursor = null;
let cursorFollower = null;
let isLoading = true;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ===== INITIALIZE APPLICATION =====
function initializeApp() {
    // Initialize all components
    initLoader();
    initCustomCursor();
    initNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initProjectLinks();
    initContactLinks();
    
    // Start loader sequence
    setTimeout(() => {
        hideLoader();
    }, 2500);
}

// ===== LOADER FUNCTIONALITY =====
function initLoader() {
    const loader = document.querySelector('.loader');
    if (!loader) return;
    
    // Animate loader text
    const loaderText = loader.querySelector('.loader-text');
    if (loaderText) {
        loaderText.style.animation = 'pulse 2s ease-in-out infinite';
    }
}

function hideLoader() {
    const loader = document.querySelector('.loader');
    if (!loader) return;
    
    loader.classList.add('hidden');
    isLoading = false;
    
    // Enable scrolling after loader
    document.body.style.overflow = 'auto';
    
    // Trigger hero animations
    setTimeout(() => {
        triggerHeroAnimations();
    }, 500);
}

// ===== CUSTOM CURSOR =====
function initCustomCursor() {
    // Skip on mobile devices
    if (window.innerWidth <= 768) return;
    
    cursor = document.querySelector('.cursor');
    cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    // Mouse move event
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Smooth follower animation
    function animateFollower() {
        const speed = 0.1;
        followerX += (mouseX - followerX) * speed;
        followerY += (mouseY - followerY) * speed;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card, .nav-link');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.2)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
}

// ===== NAVIGATION =====
function initNavigation() {
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Navbar scroll effect
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const buttons = document.querySelectorAll('.btn[data-scroll]');

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('data-scroll');
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                smoothScrollTo(targetElement);
            }
        });
    });
}

function smoothScrollTo(element) {
    const navHeight = document.querySelector('.nav').offsetHeight;
    const elementPosition = element.offsetTop - navHeight - 20;
    
    window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Elements to animate
    const animateElements = document.querySelectorAll(
        '.section-title, .about-content, .experience-item, .project-card, ' +
        '.skills-category, .achievement-item, .cert-category, .contact-item'
    );
    
    animateElements.forEach((element, index) => {
        // Add animation classes based on position
        if (index % 3 === 0) {
            element.classList.add('fade-in');
        } else if (index % 3 === 1) {
            element.classList.add('slide-in-left');
        } else {
            element.classList.add('slide-in-right');
        }
        
        observer.observe(element);
    });
}

// ===== HERO ANIMATIONS =====
function triggerHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero-name, .hero-tagline, .hero-location, .hero-buttons');
    
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Start background animation
    animateHeroBackground();
}

function animateHeroBackground() {
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        // Random movement animation
        setInterval(() => {
            const randomX = Math.random() * 100;
            const randomY = Math.random() * 100;
            const randomScale = 0.8 + Math.random() * 0.4;
            
            orb.style.transform = `translate(${randomX}px, ${randomY}px) scale(${randomScale})`;
        }, 3000 + index * 1000);
    });
}

// ===== PROJECT LINKS =====
function initProjectLinks() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            if (projectId) {
                window.location.href = `${projectId}.html`; // Navigate to the new page
            }
        });
    });
}

// ===== CONTACT LINKS =====
function initContactLinks() {
    // Email link
    const emailLink = document.querySelector('a[href*="mailto"]');
    if (emailLink) {
        emailLink.addEventListener('click', (e) => {
            // Add click animation
            emailLink.style.transform = 'scale(0.95)';
            setTimeout(() => {
                emailLink.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    // External links
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
        
        link.addEventListener('click', (e) => {
            // Add click animation
            link.style.transform = 'scale(0.95)';
            setTimeout(() => {
                link.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Throttle scroll events
let ticking = false;

function updateOnScroll() {
    // Update any scroll-dependent animations here
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// ===== RESIZE HANDLER =====
window.addEventListener('resize', debounce(() => {
    // Reinitialize cursor on resize
    if (window.innerWidth > 768 && !cursor) {
        initCustomCursor();
    } else if (window.innerWidth <= 768 && cursor) {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    }
}, 250));

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Focus management for modal
document.addEventListener('keydown', (e) => {
    const modal = document.querySelector('.modal.active');
    if (!modal) return;
    
    if (e.key === 'Tab') {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
});

// ===== CONSOLE WELCOME MESSAGE =====
console.log('%c🚀 Portfolio Website Loaded Successfully!', 'color: #ff4500; font-size: 16px; font-weight: bold;');
console.log('%cDeveloped by Mruthyunjaya S', 'color: #ffffff; font-size: 12px;');
console.log('%cContact: s.mruthyunjaya05@gmail.com', 'color: #cccccc; font-size: 10px;');

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
});