
 
document.getElementById('year').textContent = new Date().getFullYear();

// 1. Sticky Header & Scroll Effects
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('bg-slate-900/90', 'backdrop-blur-md', 'shadow-lg', 'py-4');
        header.classList.remove('bg-transparent', 'py-6');
    } else {
        header.classList.add('bg-transparent', 'py-6');
        header.classList.remove('bg-slate-900/90', 'backdrop-blur-md', 'shadow-lg', 'py-4');
    }
});

// 2. Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
});

// 3. Scroll Spy (Highlight active section)
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-cyan-400');
        link.classList.add('text-slate-300');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.remove('text-slate-300');
            link.classList.add('text-cyan-400');
        }
    });
});

// 4. Smooth Scroll implementation
const allNavLinks = document.querySelectorAll('a[href^="#"]');
allNavLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            
            if (!mobileMenu.classList.contains('hidden')) {
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
        }
    });
});

// --- NEW INTERACTIVE SCRIPTS ---

// 5. Typing Effect for Hero Section
const phrases = ["I build things for the web.", "I craft digital experiences.", "I write elegant code."];
let currentPhraseIndex = 0;
let isDeleting = false;
let charIndex = 0;
const typedTextSpan = document.getElementById("typed-text");

function typeEffect() {
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isDeleting) {
        typedTextSpan.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextSpan.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    // Pause at the end of typing
    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } 
    // Pause before typing next phrase
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start typing effect slightly after load
setTimeout(typeEffect, 1000);


// 6. Intersection Observer for Scroll Reveals
const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            // Stop observing once revealed
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


// 7. 3D Tilt Effect on Project Cards / Profile Image
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top;  // y position within the element
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
        const rotateY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        // Reset card position smoothly
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
});

// 8. Copy to Clipboard Toast Notification
function copyEmail() {
    const email = "tramuthu@gmail.com";
    
    // Modern copy to clipboard using execCommand for better iFrame support
    const tempInput = document.createElement("input");
    tempInput.value = email;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    
    // Show toast
    const toast = document.getElementById("toast");
    toast.classList.add("show");
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}
