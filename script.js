// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Close mobile menu if open
            document.getElementById('mobile-menu').classList.add('hidden');
        }
    });
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Animated code typing effect
const codeLines = [
    '// Building innovative solutions',
    'const developer = {',
    '  name: "Amil Julius G. Recio",',
    '  role: "UI & UX Designer, Web Developer, Mobile App Developer",',
    '  skills: ["HTML/CSS", "JavaScript", "SQL", "Flask"],',
    '  passion: "Problem-solving & teamwork"',
    '};',
    '',
    'await startAwesomeProject();'
];

let typingTimeout = null;
let isTyping = false;

function typeCode() {
    if (isTyping) return; // Prevent overlapping animations
    
    isTyping = true;
    const codeElement = document.getElementById('code-animation');
    codeElement.textContent = '';
    let lineIndex = 0;
    let charIndex = 0;
    let currentText = '';

    function typeCharacter() {
        if (lineIndex < codeLines.length) {
            const line = codeLines[lineIndex];
            
            if (charIndex < line.length) {
                currentText += line[charIndex];
                codeElement.textContent = currentText;
                charIndex++;
                typingTimeout = setTimeout(typeCharacter, 50);
            } else {
                currentText += '\n';
                codeElement.textContent = currentText;
                lineIndex++;
                charIndex = 0;
                typingTimeout = setTimeout(typeCharacter, 500);
            }
        } else {
            isTyping = false; // Animation complete
        }
    }

    typeCharacter();
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    typeCode();
});

// Restart animation every 8 seconds
setInterval(() => {
    typeCode();
}, 8000);

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            // Optional: remove observer after animation
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.skill-card, .project-card, .experience-card, .stat-card, .cert-card').forEach(element => {
    observer.observe(element);
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-cyan-400');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('text-cyan-400');
        }
    });
});

// Contact form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Validate form
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Here you would typically send the form data to a backend service
        // For now, we'll just show a success message
        console.log('Form Data:', { name, email, subject, message });
        
        // Show success notification
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Optional: Send email via third-party service (like EmailJS)
        // sendEmailViaEmailJS(name, email, subject, message);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-4 rounded-lg font-semibold text-white z-50 animate-slideInFromTop ${
        type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto remove notification after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Scroll-based animations for skill meters
const skillBars = document.querySelectorAll('.skill-meter-fill');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.dataset.fill || '0%';
            bar.style.width = '0%';

            setTimeout(() => {
                bar.style.width = width;
            }, 100);
            
            skillObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// Parallax effect for background blobs
const blobs = document.querySelectorAll('.animate-blob');
window.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    blobs.forEach((blob, index) => {
        const moveX = x * (index + 1) * 20;
        const moveY = y * (index + 1) * 20;
        blob.style.transform = `translate(${moveX}px, ${moveY}px) scale(1)`;
    });
});

// Dark mode toggle (optional)
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
if (prefersDark.matches) {
    document.documentElement.style.colorScheme = 'dark';
}

// Number counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-card');
    
    counters.forEach(counter => {
        const target = counter.querySelector('.text-3xl');
        if (target) {
            const text = target.textContent;
            const number = parseInt(text);
            
            if (!isNaN(number)) {
                let current = 0;
                const increment = number / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        target.textContent = text;
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(current) + '+';
                    }
                }, 30);
            }
        }
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stat-card');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-card').forEach(card => {
        statsObserver.observe(card);
    });
}

// Add click ripple effect
function addRippleEffect(event) {
    const button = event.currentTarget;
    
    if (button.classList.contains('relative') === false) {
        button.classList.add('relative', 'overflow-hidden');
    }

    const rect = button.getBoundingClientRect();
    const radius = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - radius / 2;
    const y = event.clientY - rect.top - radius / 2;

    const ripple = document.createElement('span');
    ripple.style.width = ripple.style.height = radius + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.className = 'absolute bg-white opacity-50 rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-ping';
    ripple.style.animation = 'pulse 0.6s ease-out';

    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

// Add ripple effect to buttons
document.querySelectorAll('button, a[href*="#"]').forEach(element => {
    if (element.classList.contains('px-8') && element.classList.contains('py-4')) {
        element.addEventListener('click', addRippleEffect);
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        document.getElementById('mobile-menu').classList.add('hidden');
    }
});

// Page visibility API for performance optimization
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when tab is visible
        document.body.style.animationPlayState = 'running';
    }
});

// Performance optimization - Lazy load images (if any)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('opacity-0');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Smooth page load animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loading class on page start
document.body.classList.add('loading');

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search (or custom action)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Add your action here
    }
});

// Prevent right-click context menu on production (optional)
// document.addEventListener('contextmenu', (e) => {
//     e.preventDefault();
// });

// Add animation to elements on scroll
const scrollRevealElements = document.querySelectorAll('[data-scroll]');
if (scrollRevealElements.length > 0) {
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    scrollRevealElements.forEach(element => scrollObserver.observe(element));
}

// Print page info to console for developers
console.log('%c Welcome to my portfolio! ', 'background: #06b6d4; color: #fff; font-size: 16px; padding: 10px;');
console.log('%c Built with HTML, CSS, and JavaScript - No frameworks needed! ', 'color: #06b6d4; font-size: 14px;');
console.log('%c Check out the source code - it\'s clean and well-organized! ', 'color: #06b6d4; font-size: 14px;');

// Utility function to get URL parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Example: Handle URL parameters for dynamic content
const section = getQueryParam('section');
if (section) {
    const element = document.getElementById(section);
    if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 500);
    }
}

// Add touch feedback for mobile
let isTouchDevice = () => {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
};

if (isTouchDevice()) {
    document.body.classList.add('touch-device');
}

// Prevent FOUC (Flash of Unstyled Content)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        document.body.style.opacity = '1';
    });
} else {
    document.body.style.opacity = '1';
}

// Service Worker registration (optional - for PWA capabilities)
if ('serviceWorker' in navigator) {
    // window.addEventListener('load', () => {
    //     navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW registration failed:', err));
    // });
}

// Analytics tracking example (replace with your own analytics)
function trackEvent(eventName, eventData) {
    console.log('Event:', eventName, eventData);
    // Send to your analytics service here
}

// Track section views
document.addEventListener('scroll', () => {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            trackEvent('section_view', { section: section.id });
        }
    });
});

// Export utilities
window.PortfolioUtils = {
    showNotification,
    getQueryParam,
    isTouchDevice,
    trackEvent
};

console.log('Portfolio loaded successfully! Total elements animated:', document.querySelectorAll('[class*="animate"]').length);
