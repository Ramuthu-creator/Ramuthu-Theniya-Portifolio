
document.getElementById('year').textContent = new Date().getFullYear();

// ============ INTERSECTION OBSERVER FOR ANIMATION ============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('entrance-animation');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for entrance animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ============ STICKY HEADER & SCROLL EFFECTS ============
const header = document.getElementById('header');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    // Sticky header with blur effect
    if (currentScroll > 50) {
        header.classList.add('bg-slate-900/90', 'backdrop-blur-md', 'shadow-lg', 'py-4');
        header.classList.remove('bg-transparent', 'py-6');
    } else {
        header.classList.add('bg-transparent', 'py-6');
        header.classList.remove('bg-slate-900/90', 'backdrop-blur-md', 'shadow-lg', 'py-4');
    }
    
    // Hide header on scroll down, show on scroll up
    if (currentScroll > lastScrollY && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    lastScrollY = currentScroll;
    
    // Parallax effect on hero decorative elements
    const parallaxElements = document.querySelectorAll('[class*="animate-float"]');
    parallaxElements.forEach((el, index) => {
        el.style.transform = `translateY(${currentScroll * 0.5 + index * 20}px)`;
    });
});

// ============ MOBILE MENU TOGGLE ============
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
    
    // Add animation
    if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.style.animation = 'slideDown 0.3s ease-out';
    }
});

// Close menu when a link is clicked
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    });
});

// ============ SCROLL SPY (Highlight active section) ============
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link:not(.logo-link)');

const updateActiveNav = () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-cyan-400', 'active');
        link.classList.add('text-slate-300');
        
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.remove('text-slate-300');
            link.classList.add('text-cyan-400', 'active');
        }
    });
};

window.addEventListener('scroll', updateActiveNav);

// ============ SMOOTH SCROLL WITH CUSTOM ANIMATION ============
const allNavLinks = document.querySelectorAll('a[href^="#"]');

allNavLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            }

            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            
            // Add visual feedback
            targetElement.style.animation = 'pulse 0.5s ease-out';
        }
    });
});

// ============ MOUSE PARALLAX ON HERO SECTION ============
const heroSection = document.querySelector('#home');

if (heroSection) {
    document.addEventListener('mousemove', (e) => {
        if (window.scrollY < heroSection.offsetHeight) {
            const floatingElements = heroSection.querySelectorAll('[class*="animate-float"]');
            const mouseX = (e.clientX / window.innerWidth - 0.5) * 30;
            const mouseY = (e.clientY / window.innerHeight - 0.5) * 30;
            
            floatingElements.forEach((el, index) => {
                el.style.transform = `translate(${mouseX * (index + 1) * 0.1}px, ${mouseY * (index + 1) * 0.1}px)`;
            });
        }
    });
}

// ============ INTERACTIVE CARD HOVER EFFECTS ============
document.querySelectorAll('[class*="group"]').forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Add glow effect on hover
        if (this.classList.contains('group-hover')) {
            this.style.boxShadow = '0 0 30px rgba(6, 182, 212, 0.3)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

// ============ SCROLL PROGRESS INDICATOR ============
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 z-50';
    progressBar.style.width = '0%';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createScrollProgress();

// ============ TYPING EFFECT FOR HERO TEXT ============
const typeWriter = (element, text, speed = 50) => {
    if (!element) return;
    element.textContent = '';
    let index = 0;
    
    const type = () => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    };
    
    type();
};

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    // Add entrance animations to key elements
    document.querySelectorAll('h1, h2, p').forEach((el, index) => {
        el.style.opacity = '1';
    });
});

// ============ BUTTON RIPPLE EFFECT ============
document.querySelectorAll('a, button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255,255,255,0.5);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple-animation 600ms ease-out;
        `;
        
        if (this.style.position !== 'absolute' && this.style.position !== 'fixed') {
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
        }
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// CSS animation for ripple effect
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ============ SMOOTH HEADER TRANSITION ============
header.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
