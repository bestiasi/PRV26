
//timer
const timer = document.getElementById("timer")

let Id = setInterval(UpdateTimer, 1000);

function UpdateTimer(){
    let now = new Date();
    let PRV = new Date("March 30, 2026 00:00:00");
    let duration = (PRV - now) / 1000;

    if(duration <= 0)
    {
        clearInterval(Id);
        timer.textContent = `00:00:00:00`;
        return;
    }

    let days = Math.floor(duration / 60 / 60 / 24);
    let hours = Math.floor(duration / 60 / 60) % 24;
    let minutes = Math.floor(duration / 60) % 60;
    let seconds = Math.floor(duration) % 60;

    let days_t = days.toString().padStart(2, 0);
    let hours_t = hours.toString().padStart(2, 0);
    let minutes_t = minutes.toString().padStart(2, 0);
    let seconds_t = seconds.toString().padStart(2, 0);

    timer.textContent = `${days_t}:${hours_t}:${minutes_t}:${seconds_t}`;

    
}


//header appear
const trigger = document.querySelector('#scroll-trigger');
const header = document.querySelector('.header');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.boundingClientRect.top <= 0) {
        header.classList.add('is_visible');
     }
  });
});

//animatii de appear
observer.observe(trigger);

const appearanceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            appearanceObserver.unobserve(entry.target); 
        }
    });
}, {
    threshold: 0.25
});

const elementsToWatch = document.querySelectorAll('.animate-on-scroll');


elementsToWatch.forEach((element) => {
    appearanceObserver.observe(element);
});

const trigger_cafeluta = document.querySelector('.cafeluta_dialog');

const observer_cafeluta = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add('is_visible')
        observer_cafeluta.unobserve(entry.target); 
     }
  });
}, {
    threshold: 0.3
});

if(trigger)
observer_cafeluta.observe(trigger_cafeluta);


//image zoomer

// 1. Select the lightbox elements
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-btn');

// 2. Function to open lightbox
function openLightbox(e) {
    let source = "";

    // Check if clicked element is an <img> tag
    if (e.target.tagName === 'IMG') {
        source = e.target.src;
    } 
    // Check if it's a <div> with a background-image
    else {
        const style = window.getComputedStyle(e.target);
        const bgImage = style.backgroundImage;
        
        // Clean up the URL (remove 'url("...")')
        if (bgImage && bgImage !== 'none') {
            source = bgImage.slice(5, -2); 
        }
    }

    if (source) {
        lightboxImg.src = source;
        lightbox.classList.add('active');
    }
}

// 3. Add event listeners to all "zoomable" items
const zoomables = document.querySelectorAll('.zoomable');

zoomables.forEach(item => {
    item.addEventListener('click', openLightbox);
    item.style.cursor = 'zoom-in'; // UX: show pointer
});

// 4. Close functions
closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

// Close when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});

//testimonial carousel

// --- Sequential Fade Carousel ---

// --- Testimonial Carousel Logic (Smooth Height) ---

// --- Testimonial Carousel (CSS Grid Method) ---

const slides = document.querySelectorAll('.testimonial');
const nextButtons = document.querySelectorAll('.next');
const prevButtons = document.querySelectorAll('.prev');

let currentSlide = 0;

function showSlide(index) {
    // 1. Remove active class from ALL slides
    slides.forEach(slide => {
        slide.classList.remove('active-testimonial');
    });

    // 2. Add active class to the CURRENT slide
    slides[index].classList.add('active-testimonial');
}

// Initialize
if (slides.length > 0) {
    showSlide(currentSlide);
}

// Next Buttons
nextButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });
});

// Prev Buttons
prevButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });
});

//detalii probe

// --- PROBE TABS LOGIC ---

// 1. Select all buttons and descriptions
const probeButtons = document.querySelectorAll('.detalii_probe button');
const probeDescriptions = document.querySelectorAll('.descriere');

function switchProbe(index) {
    // 1. Hide all descriptions
    probeDescriptions.forEach(desc => {
        desc.classList.remove('active-descriere');
    });

    // 2. Reset all buttons (remove highlight)
    probeButtons.forEach(btn => {
        btn.classList.remove('active-btn');
    });

    // 3. Show the selected description
    if(probeDescriptions[index]) {
        probeDescriptions[index].classList.add('active-descriere');
    }

    // 4. Highlight the clicked button
    if(probeButtons[index]) {
        probeButtons[index].classList.add('active-btn');
    }
}

// Initialize: Show the first probe (index 0) by default
if (probeDescriptions.length > 0) {
    switchProbe(0);
}

// Add click listeners to buttons
probeButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        switchProbe(index);
        probeDescriptions[index].scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' // Centers the text on the screen
        });
    });
});