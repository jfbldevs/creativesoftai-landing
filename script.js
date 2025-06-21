// CREATIVE SOFT AI Landing Page JavaScript
// Modern, clean, and optimized for performance

'use strict';

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Main App Initialization
function initializeApp() {
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initButtonInteractions();
    initContactForms();
    initIntersectionObserver();
    initKeyboardNavigation();
    initPremiumEffects();
    initMobileOptimizations();
    
    // Initialize after DOM is ready
    setTimeout(() => {
        initScrollToTopButton();
        initLazyLoading();
        if (!isMobile()) {
            initParallaxEffects();
        }
    }, 100);
}

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!mobileMenuButton || !mobileMenu) return;
    
    mobileMenuButton.addEventListener('click', function() {
        const isOpen = !mobileMenu.classList.contains('hidden');
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    
    // Close mobile menu when clicking on links
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
}

function openMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const button = document.getElementById('mobile-menu-button');
    
    mobileMenu.classList.remove('hidden');
    button.setAttribute('aria-expanded', 'true');
    
    // Animation
    mobileMenu.style.opacity = '0';
    mobileMenu.style.transform = 'translateY(-10px)';
    
    requestAnimationFrame(() => {
        mobileMenu.style.transition = 'all 0.2s ease-out';
        mobileMenu.style.opacity = '1';
        mobileMenu.style.transform = 'translateY(0)';
    });
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const button = document.getElementById('mobile-menu-button');
    
    mobileMenu.style.transition = 'all 0.2s ease-in';
    mobileMenu.style.opacity = '0';
    mobileMenu.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
        mobileMenu.classList.add('hidden');
        button.setAttribute('aria-expanded', 'false');
    }, 200);
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash
                history.pushState(null, null, href);
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    // Header background on scroll
    const header = document.querySelector('header');
    
    function updateHeaderOnScroll() {
        if (window.scrollY > 50) {
            header.classList.add('bg-white/95');
            header.classList.remove('bg-white/80');
        } else {
            header.classList.add('bg-white/80');
            header.classList.remove('bg-white/95');
        }
    }
    
    window.addEventListener('scroll', throttle(updateHeaderOnScroll, 10));
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('section');
    
    function parallaxEffect() {
        if (!heroSection) return;
        
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (scrolled < window.innerHeight) {
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    }
    
    window.addEventListener('scroll', throttle(parallaxEffect, 16));
}

// Button Interactions
function initButtonInteractions() {
    const buttons = document.querySelectorAll('button, .btn');
    
    buttons.forEach(button => {
        // Add ripple effect
        button.addEventListener('click', function(e) {
            if (this.classList.contains('no-ripple')) return;
            
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Add hover effects
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Contact Form Handling
function initContactForms() {
    // Modern button selectors
    const demoButtons = document.querySelectorAll('button');
    
    demoButtons.forEach(button => {
        const buttonText = button.textContent.trim();
        if (buttonText.includes('Solicitar Demo') || 
            buttonText.includes('Agendar Reunión') || 
            buttonText.includes('Explore projects')) {
            button.addEventListener('click', function() {
                showContactModal();
            });
        }
    });
    
    // Email links
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track email click
            trackEvent('email_click', {
                email: this.getAttribute('href').replace('mailto:', ''),
                source: 'landing_page'
            });
        });
    });
}

// Contact Modal (Simple implementation)
function showContactModal() {
    // Create enhanced modal with premium design
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4 opacity-0 transition-all duration-300';
    modal.innerHTML = `
        <div class="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-100 transform scale-95 transition-all duration-300">
            <div class="text-center mb-8">
                <div class="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                </div>
                <h3 class="text-2xl font-light text-slate-900 mb-2 tracking-tight">Let's talk about your project</h3>
                <p class="text-slate-600 font-light">Tell us your vision and let's create something exceptional together</p>
            </div>
            
            <form id="contact-form" class="space-y-6">
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-2">Full name</label>
                    <input type="text" name="name" required class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-light">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-2">Professional email</label>
                    <input type="email" name="email" required class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-light">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-2">Company</label>
                    <input type="text" name="company" class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-light">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-2">Tell us about your project</label>
                    <textarea name="message" rows="4" required class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-light resize-none"></textarea>
                </div>
                
                <!-- Formspree honeypot field -->
                <input type="text" name="_gotcha" style="display:none">
                
                <p class="text-xs text-slate-500 text-center mt-4">
                    By submitting, you consent to us contacting you about our services.
                </p>
                
                <div class="flex gap-3 pt-4">
                    <button type="button" onclick="closeContactModal()" class="flex-1 px-6 py-3 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-200 font-light">
                        Cancel
                    </button>
                    <button type="submit" class="flex-1 px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all duration-200 font-medium">
                        Send message
                    </button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
        modal.querySelector('.bg-white').style.transform = 'scale(1)';
    });
    
    // Handle form submission
    const form = modal.querySelector('#contact-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        button.textContent = 'Sending...';
        button.disabled = true;
        
        // Get form data
        const formData = new FormData(form);
        
        // Send to Formspree with better error handling
        fetch('https://formspree.io/f/xldnwkpr', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            console.log('Response status:', response.status);
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(err => Promise.reject(err));
            }
        })
        .then(data => {
            console.log('Success:', data);
            closeContactModal();
            showSuccessMessage();
        })
        .catch(error => {
            console.error('Error details:', error);
            showErrorMessage();
            button.textContent = originalText;
            button.disabled = false;
        });
    });
    
    // Close on backdrop click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeContactModal();
        }
    });
    
    // Focus first input
    setTimeout(() => {
        modal.querySelector('input').focus();
    }, 300);
}

function closeContactModal() {
    const modal = document.querySelector('.fixed.inset-0');
    if (modal) {
        modal.style.opacity = '0';
        modal.querySelector('.bg-white').style.transform = 'scale(0.95)';
        setTimeout(() => modal.remove(), 300);
    }
}

function showSuccessMessage() {
    const toast = document.createElement('div');
    toast.className = 'fixed top-6 right-6 bg-white border border-slate-200 text-slate-900 px-6 py-4 rounded-2xl shadow-2xl z-50 transform translate-x-full transition-all duration-300';
    toast.innerHTML = `
        <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
            <div>
                <div class="font-medium text-sm">Message sent!</div>
                <div class="text-slate-600 text-xs">We will contact you soon</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

function showErrorMessage() {
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform';
    toast.textContent = 'Error sending message. Please try again.';
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 100);
    
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Intersection Observer for Animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements
    const elementsToAnimate = document.querySelectorAll(
        '.bg-white.p-8.rounded-2xl, .flex.items-start.space-x-4, .stats-grid > div'
    );
    
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });
}

// Keyboard Navigation
function initKeyboardNavigation() {
    // Tab navigation for buttons
    const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                if (this.tagName === 'BUTTON' || this.hasAttribute('onclick')) {
                    e.preventDefault();
                    this.click();
                }
            }
        });
    });
}

// Scroll to Top Button
function initScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'fixed bottom-6 right-6 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 opacity-0 pointer-events-none z-40';
    scrollButton.setAttribute('aria-label', 'Back to top');
    
    document.body.appendChild(scrollButton);
    
    function toggleScrollButton() {
        if (window.scrollY > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.pointerEvents = 'auto';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.pointerEvents = 'none';
        }
    }
    
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', throttle(toggleScrollButton, 100));
}

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('loading-skeleton');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.classList.add('loading-skeleton');
        imageObserver.observe(img);
    });
}

// Utility Functions
function throttle(func, wait) {
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

// Analytics Tracking
function trackEvent(eventName, properties = {}) {
    // Placeholder for analytics tracking
    console.log('Track Event:', eventName, properties);
    
    // Example for Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    // Example for other analytics platforms
    if (typeof analytics !== 'undefined') {
        analytics.track(eventName, properties);
    }
}

// Performance Monitoring
function initPerformanceMonitoring() {
    // Monitor page load time
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        trackEvent('page_load_time', { load_time: loadTime });
    });
    
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
        import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
            getCLS(console.log);
            getFID(console.log);
            getFCP(console.log);
            getLCP(console.log);
            getTTFB(console.log);
        });
    }
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    trackEvent('javascript_error', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno
    });
});

// Initialize performance monitoring
initPerformanceMonitoring();

// Premium Effects Initialization
function initPremiumEffects() {
    // Add floating animation to hero elements
    const heroElements = document.querySelectorAll('.hero-float');
    heroElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
        element.classList.add('float');
    });
    
    // Enhanced button hover effects
    const premiumButtons = document.querySelectorAll('.group');
    premiumButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Text gradient animation
    const gradientTexts = document.querySelectorAll('.text-gradient-premium');
    gradientTexts.forEach(text => {
        text.style.backgroundSize = '200% 200%';
        text.style.animation = 'gradient-flow 4s ease-in-out infinite';
    });
}

// Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    function updateParallax() {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    window.addEventListener('scroll', throttle(updateParallax, 16));
}

// Enhanced Scroll Reveal
function initEnhancedScrollReveal() {
    const revealElements = document.querySelectorAll('.slide-in-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(60px)';
        observer.observe(element);
    });
}



// Initialize enhanced scroll reveal
setTimeout(() => {
    initEnhancedScrollReveal();
}, 500);

// Mobile Detection and Optimizations
function isMobile() {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
}

function initMobileOptimizations() {
    if (isMobile()) {
        // Disable parallax on mobile for performance
        document.querySelectorAll('[data-parallax]').forEach(element => {
            element.removeAttribute('data-parallax');
        });
        
        // Reduce animation complexity on mobile
        document.querySelectorAll('.animate-pulse-soft').forEach(element => {
            element.style.animationDuration = '4s';
        });
        
        // Optimize touch interactions
        document.addEventListener('touchstart', function() {}, { passive: true });
        document.addEventListener('touchmove', function() {}, { passive: true });
        
        // Prevent zoom on double tap for buttons
        document.querySelectorAll('button, .btn').forEach(button => {
            button.addEventListener('touchend', function(e) {
                e.preventDefault();
                this.click();
            }, { passive: false });
        });
        
        // Add mobile-specific classes
        document.body.classList.add('mobile-device');
        
        // Optimize modal for mobile
        const originalShowModal = showContactModal;
        showContactModal = function() {
            originalShowModal();
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        };
        
        const originalCloseModal = closePremiumContactModal;
        closePremiumContactModal = function() {
            originalCloseModal();
            // Restore body scroll
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        };
    }
    
    // Handle orientation changes
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Recalculate heights and positions after orientation change
            window.scrollTo(0, window.scrollY + 1);
            window.scrollTo(0, window.scrollY - 1);
        }, 100);
    });
    
    // Optimize for tablets
    if (isTablet()) {
        document.body.classList.add('tablet-device');
        
        // Adjust touch targets for tablets
        document.querySelectorAll('button, a').forEach(element => {
            if (!element.style.minHeight) {
                element.style.minHeight = '48px';
            }
        });
    }
}

// Enhanced Mobile Menu with better touch support
function initEnhancedMobileMenu() {
    const mobileMenuButton = document.querySelector('[data-mobile-menu-toggle]');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!mobileMenuButton || !mobileMenu) return;
    
    let isMenuOpen = false;
    
    mobileMenuButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.style.maxHeight = '0';
            mobileMenu.style.overflow = 'hidden';
            
            // Animate in
            requestAnimationFrame(() => {
                mobileMenu.style.transition = 'max-height 0.3s ease-out';
                mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
            });
            
            // Prevent body scroll
            if (isMobile()) {
                document.body.style.overflow = 'hidden';
            }
        } else {
            mobileMenu.style.maxHeight = '0';
            
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                mobileMenu.style.maxHeight = '';
                mobileMenu.style.transition = '';
                
                // Restore body scroll
                if (isMobile()) {
                    document.body.style.overflow = '';
                }
            }, 300);
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
            mobileMenuButton.click();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            mobileMenuButton.click();
        }
    });
}

// Add CSS for ripple effect and premium animations
const premiumStyles = document.createElement('style');
premiumStyles.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    /* Premium text selection */
    ::selection {
        background-color: rgba(59, 130, 246, 0.1);
        color: #1e293b;
    }
    
    /* Enhanced scrollbar for webkit browsers */
    ::-webkit-scrollbar {
        width: 6px;
    }
    
    ::-webkit-scrollbar-track {
        background: transparent;
    }
    
    ::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 3px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: #94a3b8;
    }
`;
document.head.appendChild(premiumStyles);

// Legal Modals Functions
function showPrivacyModal() {
    createLegalModal('Privacy Policy', getPrivacyContent());
}

function showTermsModal() {
    createLegalModal('Terms of Service', getTermsContent());
}

function showRefundModal() {
    createLegalModal('Refund Policy', getRefundContent());
}

function createLegalModal(title, content) {
    // Remove existing modal if any
    const existingModal = document.getElementById('legal-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.id = 'legal-modal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.style.backdropFilter = 'blur(8px)';
    
    modal.innerHTML = `
        <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div class="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
                <h2 class="text-2xl font-light text-slate-900">${title}</h2>
                <button onclick="closeLegalModal()" class="text-slate-400 hover:text-slate-600 transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <div class="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Close on escape key
    document.addEventListener('keydown', handleEscapeKey);
    
    // Close on backdrop click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeLegalModal();
        }
    });
}

function closeLegalModal() {
    const modal = document.getElementById('legal-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEscapeKey);
    }
}

function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        closeLegalModal();
    }
}

function getPrivacyContent() {
    return `
        <div class="prose prose-slate max-w-none">
            <h3 class="text-lg font-medium text-slate-900 mb-4">Information We Collect</h3>
            <p class="text-slate-600 mb-4">We collect information you provide directly to us, such as when you contact us through our website forms, subscribe to our newsletter, or communicate with us.</p>
            
            <h3 class="text-lg font-medium text-slate-900 mb-4">How We Use Your Information</h3>
            <p class="text-slate-600 mb-4">We use the information we collect to:</p>
            <ul class="list-disc pl-6 text-slate-600 mb-4">
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send you updates about our services and industry insights</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
            </ul>
            
            <h3 class="text-lg font-medium text-slate-900 mb-4">Information Sharing</h3>
            <p class="text-slate-600 mb-4">We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
            
            <h3 class="text-lg font-medium text-slate-900 mb-4">Data Security</h3>
            <p class="text-slate-600 mb-4">We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            
            <h3 class="text-lg font-medium text-slate-900 mb-4">Contact Information</h3>
            <p class="text-slate-600 mb-4">If you have any questions about this Privacy Policy, please contact us through our website contact form.</p>
            
                         <p class="text-sm text-slate-500 mt-8">Last updated: January 2025</p>
         </div>
     `;
 }
 
 function getTermsContent() {
    return `
        <div class="prose prose-slate max-w-none">
            <h3 class="text-lg font-medium text-slate-900 mb-4">Website Usage</h3>
            <p class="text-slate-600 mb-4">By accessing this website, you agree to use it for informational purposes only. This website serves to showcase our services and capabilities.</p>
            
            <h3 class="text-lg font-medium text-slate-900 mb-4">Service Inquiries</h3>
            <p class="text-slate-600 mb-4">Information provided on this website is for general reference. Specific service terms, pricing, and conditions will be discussed and agreed upon individually for each potential project through direct consultation.</p>
            
            <h3 class="text-lg font-medium text-slate-900 mb-4">No Binding Commitments</h3>
            <p class="text-slate-600 mb-4">Pricing and service descriptions on this website are indicative only. No binding agreement is created until a separate, formal contract is signed by both parties.</p>
            
            <h3 class="text-lg font-medium text-slate-900 mb-4">Intellectual Property</h3>
            <p class="text-slate-600 mb-4">All content on this website, including design, text, and graphics, is owned by Creative Soft AI and protected by applicable intellectual property laws.</p>
            
            <h3 class="text-lg font-medium text-slate-900 mb-4">Contact and Consultation</h3>
            <p class="text-slate-600 mb-4">For actual service agreements, please contact us directly. All business arrangements require separate consultation and formal agreement.</p>
            
                         <p class="text-sm text-slate-500 mt-8">Last updated: January 2025</p>
         </div>
     `;
 }
 
 function getRefundContent() {
    return `
        <div class="prose prose-slate max-w-none">
            <h3 class="text-lg font-medium text-slate-900 mb-4">Website Services</h3>
            <p class="text-slate-600 mb-4">This website serves as an informational platform and portfolio showcase. No direct sales or transactions occur through this website.</p>
            
            <h3 class="text-lg font-medium text-slate-900 mb-4">Service Agreements</h3>
            <p class="text-slate-600 mb-4">All actual services are provided through separate, individual contracts. Refund terms and conditions will be specified in each individual service agreement as applicable.</p>
            
            <h3 class="text-lg font-medium text-slate-900 mb-4">No Website Transactions</h3>
            <p class="text-slate-600 mb-4">Since no payments are processed through this website, website-specific refunds do not apply. All financial arrangements are handled through separate business agreements.</p>
            
            <h3 class="text-lg font-medium text-slate-900 mb-4">Contact for Information</h3>
            <p class="text-slate-600 mb-4">For questions about potential services or to discuss project-specific terms including payment and refund policies, please contact us directly through our contact form.</p>
            
            <h3 class="text-lg font-medium text-slate-900 mb-4">Future Service Terms</h3>
            <p class="text-slate-600 mb-4">When engaging our services, specific refund policies will be clearly outlined in the individual service contract provided for each project.</p>
            
                         <p class="text-sm text-slate-500 mt-8">Last updated: January 2025</p>
         </div>
     `;
 } 