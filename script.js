// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
let lastScrollY = 0;

function handleNavbarScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY;
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });

// ===== Mobile Navigation Toggle =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
});

navMenu.addEventListener('click', function(e) {
    if (e.target.classList.contains('nav-link')) {
        navMenu.classList.remove('active');
    }
});

// ===== Smooth Scroll for Nav Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Lightbox =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

function openLightbox(element) {
    const img = element.querySelector('img');
    if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// ===== Portfolio Filter =====
const portfolioTabs = document.querySelectorAll('.portfolio-tab');
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        // Update active tab
        portfolioTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        // Filter items
        const filter = this.dataset.filter;
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.dataset.type === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// ===== Contact Form Validation =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();

    let isValid = true;
    let errorMessage = '';

    if (!name) {
        errorMessage += '请输入您的姓名\n';
        isValid = false;
    }

    if (!phone) {
        errorMessage += '请输入联系电话\n';
        isValid = false;
    } else if (!/^1[3-9]\d{9}$/.test(phone)) {
        errorMessage += '请输入正确的手机号码\n';
        isValid = false;
    }

    if (isValid) {
        alert('感谢您的咨询！我们会尽快与您联系。');
        contactForm.reset();
    } else {
        alert(errorMessage);
    }
});

// ===== Scroll Animation (Fade In) =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const fadeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .portfolio-item, .stat-item, .contact-item, .advantage-item, .quality-item, .process-item, .business-item').forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
});

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', function() {
    handleNavbarScroll();
});
