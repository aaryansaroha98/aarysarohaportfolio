// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavbar();
    initMobileMenu();
    initTypingEffect();
    initScrollAnimations();
    initCursorGlow();
    initSkillBars();
    initSmoothScroll();
    initFormValidation();
});

// Navbar scroll effect
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// Typing effect for hero section
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-effect');
    const phrases = [
        'Web Developer',
        'Frontend Developer',
        'Full Stack Developer',
        'UI/UX Enthusiast',
        'Problem Solver'
    ];
    
    if (typingElement) {
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;
        
        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typeSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500;
            }
            
            setTimeout(type, typeSpeed);
        }
        
        setTimeout(type, 1000);
    }
}

// Scroll reveal animations
function initScrollAnimations() {
    const reveals = document.querySelectorAll('section');
    
    reveals.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease-out';
    });
    
    const revealOnScroll = function() {
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (elementTop < windowHeight - revealPoint) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
    
    setTimeout(revealOnScroll, 100);
}

// Cursor glow effect
function initCursorGlow() {
    const cursorGlow = document.getElementById('cursor-glow');
    
    if (cursorGlow) {
        document.addEventListener('mousemove', function(e) {
            const x = e.clientX;
            const y = e.clientY;
            
            cursorGlow.style.left = x + 'px';
            cursorGlow.style.top = y + 'px';
        });
    }
}

// Animated skill bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const animateSkillBars = function() {
        skillBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (barTop < windowHeight - 100) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            }
        });
    };
    
    window.addEventListener('scroll', animateSkillBars);
    setTimeout(animateSkillBars, 100);
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form validation
function initFormValidation() {
    const form = document.querySelector('form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ef4444';
                } else {
                    input.style.borderColor = '#334155';
                }
                
                if (input.type === 'email' && input.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        isValid = false;
                        input.style.borderColor = '#ef4444';
                    }
                }
            });
            
            if (isValid) {
                alert('Thank you for your message! I will get back to you soon.');
                form.reset();
            } else {
                alert('Please fill in all required fields correctly.');
            }
        });
        
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '#334155';
            });
        });
    }
}

// Active navigation highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navbarHeight = document.getElementById('navbar').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.classList.remove('text-primary');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('text-primary');
                }
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(function() {
        document.body.style.opacity = '1';
    }, 100);
});

// Console welcome message
console.log('%c Welcome to my Portfolio! ', 'background: #6366f1; color: white; font-size: 20px; padding: 10px;');
console.log('%c Feel free to explore ', 'color: #8b5cf6; font-size: 14px;');

