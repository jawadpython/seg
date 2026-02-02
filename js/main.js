// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        const menuIcon = document.getElementById('menu-icon');
        const closeIcon = document.getElementById('close-icon');
        
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icon between bars and X
            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            } else {
                menuIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu?.querySelectorAll('a');
    if (mobileMenuLinks) {
        const menuIcon = document.getElementById('menu-icon');
        const closeIcon = document.getElementById('close-icon');
        
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            });
        });
    }
    
    // Enhanced smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const navbarHeight = 64; // Navbar height
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = targetPosition - navbarHeight;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Smooth scrolling for same-page navigation
    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Handle anchor links on same page
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    e.preventDefault();
                    const navbarHeight = 64;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = targetPosition - navbarHeight;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Contact Form Handling
    const contactFormSection = document.getElementById('contact-form');
    const contactForm = contactFormSection ? contactFormSection.querySelector('form') : null;
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                company: document.getElementById('company').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Show success message (since there's no backend)
            const formMessage = document.getElementById('form-message');
            if (formMessage) {
                formMessage.classList.remove('hidden', 'bg-red-100', 'text-red-700', 'border-red-300');
                formMessage.classList.add('bg-green-100', 'text-green-700', 'border', 'border-green-300');
                formMessage.innerHTML = `
                    <div class="flex items-center">
                        <svg class="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>Thank you for your consultation request! Our team will contact you within 24 hours to schedule your free consultation.</span>
                    </div>
                `;
                
                // Scroll to message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.classList.add('hidden');
                }, 5000);
            }
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 30) {
            navbar.classList.add('scrolled');
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
            navbar.style.backdropFilter = 'blur(24px)';
            navbar.style.webkitBackdropFilter = 'blur(24px)';
            navbar.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.webkitBackdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Add animation on scroll (fade in effect)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    document.querySelectorAll('section > div').forEach(section => {
        observer.observe(section);
    });
    
    // Hide map placeholder when map loads
    const mapIframe = document.getElementById('google-map-embed');
    const mapPlaceholder = document.getElementById('map-placeholder');
    
    if (mapIframe && mapPlaceholder) {
        mapIframe.addEventListener('load', function() {
            if (mapPlaceholder) {
                mapPlaceholder.style.display = 'none';
            }
        });
        
        // If iframe src is empty, show placeholder
        if (!mapIframe.src || mapIframe.src === '') {
            mapPlaceholder.style.display = 'flex';
        } else {
            mapPlaceholder.style.display = 'none';
        }
    }
    
    // Smooth scroll to top when navigating to new page
    window.addEventListener('beforeunload', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scroll to top on page load if coming from another page
    if (performance.navigation.type === 1 || performance.navigation.type === 2) {
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        });
    }
    
    // Smooth scroll restoration for browser back/forward
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    
    // Handle page load with smooth scroll to top
    window.addEventListener('load', function() {
        // Only scroll to top if not an anchor link
        if (!window.location.hash) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // If there's a hash, scroll to it smoothly
            const hash = window.location.hash;
            const target = document.querySelector(hash);
            if (target) {
                setTimeout(() => {
                    const navbarHeight = 64;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = targetPosition - navbarHeight;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }
    });
});
