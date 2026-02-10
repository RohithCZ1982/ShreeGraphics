// Shree Graphics - JavaScript

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active navigation link on scroll (Main Menu)
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        // Only update active state for links that are hash links on the current page
        if (link.getAttribute('href').startsWith('#') || link.getAttribute('href').includes(window.location.pathname.split('/').pop() + '#')) {
            if (link.getAttribute('href').includes('#' + current)) {
                // Logic handled by static active class for active page, but for one-page scroll:
                // This existing logic might be too broad if we have cross-page links.
                // For now keeping it simple as per original, but focusing on sub-menu below.
            }
        }
    });
});

// Active Sub-Menu Link on Scroll (Services Page)
const subMenuLinks = document.querySelectorAll('.sub-menu-link');
const serviceSections = document.querySelectorAll('.service-category');

if (subMenuLinks.length > 0 && serviceSections.length > 0) {
    window.addEventListener('scroll', () => {
        let currentService = '';
        const scrollPosition = window.scrollY;

        // Calculate offset including header and submenu height
        let offset = 200; // ample buffer
        const subMenu = document.querySelector('.sub-menu-container');
        if (subMenu) {
            offset += subMenu.offsetHeight;
        }

        serviceSections.forEach(section => {
            const sectionTop = section.offsetTop - offset;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentService = section.getAttribute('id');
            }
        });

        subMenuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentService) {
                link.classList.add('active');

                // Auto-scroll the sub-menu on mobile to keep active item in view
                const subMenuContainer = document.querySelector('.sub-menu-container'); // or .sub-menu overflow container
                if (subMenuContainer && window.innerWidth <= 768) {
                    // logic to scroll horizontal menu could go here if needed
                }
            }
        });
    });
}


// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Calculate base offset (Main Navbar)
            let offset = 80;

            // Check if there is a sticky sub-menu and add its height to the offset
            const subMenu = document.querySelector('.sub-menu-container');
            if (subMenu && getComputedStyle(subMenu).display !== 'none') {
                offset += subMenu.offsetHeight;
            }

            const headerOffset = target.offsetTop - offset;
            const finalOffset = headerOffset < 0 ? 0 : headerOffset;

            window.scrollTo({
                top: finalOffset,
                behavior: 'smooth'
            });
        }
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Here you would typically send the data to a server
        console.log('Form submitted:', data);

        // Show success message
        alert('Thank you for your message! We will get back to you soon.');

        // Reset form
        contactForm.reset();
    });
}

// Placeholder images generation
function generatePlaceholderImage(elementId, text, bgColor1, bgColor2) {
    const element = document.getElementById(elementId);
    if (element && !element.src.includes('http')) {
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');

        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, bgColor1);
        gradient.addColorStop(1, bgColor2);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 48px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);

        // Set as image source
        element.src = canvas.toDataURL();
    }
}

// Generate client logo placeholders
function generateClientLogo(elementId, text) {
    const element = document.getElementById(elementId);
    if (element && !element.src.includes('http')) {
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');

        // Transparent background
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Add company name in dark color (will be inverted by CSS)
        ctx.fillStyle = '#0A2540';
        ctx.font = 'bold 32px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Handle long text
        const maxWidth = canvas.width - 40;
        const words = text.split(' ');
        let line = '';
        let y = canvas.height / 2;

        if (words.length > 2) {
            // Multi-line for long names
            ctx.font = 'bold 24px Inter, sans-serif';
            y = canvas.height / 2 - 15;
            for (let i = 0; i < words.length; i++) {
                const testLine = line + words[i] + ' ';
                const metrics = ctx.measureText(testLine);
                if (metrics.width > maxWidth && i > 0) {
                    ctx.fillText(line, canvas.width / 2, y);
                    line = words[i] + ' ';
                    y += 30;
                } else {
                    line = testLine;
                }
            }
            ctx.fillText(line, canvas.width / 2, y);
        } else {
            ctx.fillText(text, canvas.width / 2, y);
        }

        // Set as image source
        element.src = canvas.toDataURL();
    }
}

// Generate placeholder images
window.addEventListener('load', () => {
    generatePlaceholderImage('heroImage', 'Printing Excellence', '#0A2540', '#1A3A5C');
    generatePlaceholderImage('portfolioImage1', 'Brochures', '#FF8C42', '#FF6B35');
    generatePlaceholderImage('portfolioImage2', 'Catalogs', '#0A2540', '#1A3A5C');
    generatePlaceholderImage('portfolioImage3', 'Packaging', '#FF8C42', '#FF6B35');
    generatePlaceholderImage('portfolioImage4', 'Promotional', '#0A2540', '#1A3A5C');
    generatePlaceholderImage('portfolioImage5', 'Books & Magazines', '#FF8C42', '#FF6B35');
    generatePlaceholderImage('portfolioImage6', 'Custom Projects', '#0A2540', '#1A3A5C');
});

// Add scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe portfolio items and stat items
window.addEventListener('load', () => {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const statItems = document.querySelectorAll('.stat-item');

    portfolioItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    statItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
});
