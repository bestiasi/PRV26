// --- Timer ---
const timer = document.getElementById("timer");
if (timer) {
    // Set target to March 30, 2026
    const PRV = new Date("March 30, 2026 00:00:00").getTime();
    
    const updateTimer = () => {
        const now = new Date().getTime();
        const duration = (PRV - now) / 1000;

        if (duration <= 0) {
            if (typeof timerId !== 'undefined') clearInterval(timerId);
            timer.textContent = "00:00:00:00";
            return;
        }

        const days = Math.floor(duration / 86400); 
        const hours = Math.floor((duration % 86400) / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = Math.floor(duration % 60);

        const pad = (num) => num.toString().padStart(2, '0');
        timer.textContent = `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };

    updateTimer(); 
    const timerId = setInterval(updateTimer, 1000);
}

// --- 1. HEADER OBSERVER (Restored Original Logic) ---
const headerTrigger = document.querySelector('#scroll-trigger');
const header = document.querySelector('.header');

const headerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // This specific check ensures it only triggers when you scroll PAST the landing page
    if (entry.boundingClientRect.top <= 0) {
        header.classList.add('is_visible');
     } else {
        // Optional: Remove this else block if you want the header to stay visible 
        // even if they scroll back up. Your original code only had the 'add'.
        header.classList.remove('is_visible'); 
     }
  });
});

if(headerTrigger && header) {
    headerObserver.observe(headerTrigger);
}


// --- 2. GENERAL ANIMATION OBSERVER (Optimized) ---
// We keep this separate and efficient for the fade-in elements
const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Logic for generic animations
            if (entry.target.classList.contains('animate-on-scroll')) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); 
            }
            // Logic for Cafeluta
            if (entry.target.classList.contains('cafeluta_dialog')) {
                entry.target.classList.add('is_visible');
                observer.unobserve(entry.target);
            }
        }
    });
}, {
    threshold: 0.2
});

// Attach observer to animations
document.querySelectorAll('.animate-on-scroll').forEach((element) => {
    animationObserver.observe(element);
});

// Attach observer to cafeluta
const cafeluta = document.querySelector('.cafeluta_dialog');
if(cafeluta) {
    animationObserver.observe(cafeluta);
}


// --- Lightbox / Image Zoom ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-btn');

if (lightbox && lightboxImg) {
    const openLightbox = (e) => {
        let source = "";
        if (e.target.tagName === 'IMG') {
            source = e.target.src;
        } else {
            // Handle div background images
            const style = window.getComputedStyle(e.target);
            const bgImage = style.backgroundImage;
            if (bgImage && bgImage !== 'none') {
                source = bgImage.slice(5, -2).replace(/['"]/g, ""); 
            }
        }

        if (source) {
            lightboxImg.src = source;
            lightbox.classList.add('active');
        }
    }

    const zoomables = document.querySelectorAll('.zoomable');
    zoomables.forEach(item => {
        item.addEventListener('click', openLightbox);
        item.style.cursor = 'zoom-in';
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
    }

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
}

// --- Optimized Testimonial Carousel (Event Delegation) ---
const testimonialContainer = document.querySelector('.testimoniale');
const slides = document.querySelectorAll('.testimonial');

if (testimonialContainer && slides.length > 0) {
    let currentSlide = 0;

    const showSlide = (index) => {
        slides.forEach(slide => slide.classList.remove('active-testimonial'));
        slides[index].classList.add('active-testimonial');
    };

    // Initialize first slide
    showSlide(currentSlide);

    // ONE listener for all buttons instead of multiple loops
    testimonialContainer.addEventListener('click', (e) => {
        // Check if the clicked element is a Next button
        if (e.target.classList.contains('next') || e.target.closest('.next')) {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        // Check if the clicked element is a Prev button
        else if (e.target.classList.contains('prev') || e.target.closest('.prev')) {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }
    });
}
// --- Probe Tabs ---
const probeButtons = document.querySelectorAll('.detalii_probe button');
const probeDescriptions = document.querySelectorAll('.descriere');

if (probeButtons.length > 0 && probeDescriptions.length > 0) {
    function switchProbe(index) {
        probeDescriptions.forEach(desc => desc.classList.remove('active-descriere'));
        probeButtons.forEach(btn => btn.classList.remove('active-btn'));

        if(probeDescriptions[index]) probeDescriptions[index].classList.add('active-descriere');
        if(probeButtons[index]) probeButtons[index].classList.add('active-btn');
    }

    // Initialize
    switchProbe(0);

    probeButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            switchProbe(index);
            if(probeDescriptions[index]) {
                probeDescriptions[index].scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
        });
    });
}

// --- Mobile Hamburger Menu ---
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.header_links');
const navLinks = document.querySelectorAll('.header_link');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}