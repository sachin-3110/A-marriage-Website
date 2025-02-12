// GSAP Animations
gsap.from("#navbar", {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "power4.out"
});

gsap.from(".nav-link", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    stagger: 0.1,
    ease: "power2.out"
});

gsap.from("#logo", {
    scale: 0,
    rotation: 360,
    duration: 1,
    ease: "back.out(1.7)"
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileMenuBtn.innerHTML = isOpen ? 
        '<i class="fas fa-times text-2xl"></i>' : 
        '<i class="fas fa-bars text-2xl"></i>';
});

// Smooth Scroll with Locomotive
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Close mobile menu if open
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
            }
            
            // Smooth scroll to target
            scroll.scrollTo(targetSection);
        }
    });
});

// Active Section Detection
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveSection() {
    const scrollPosition = window.scrollY + 100; // Offset for navbar height

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Update active section on scroll
window.addEventListener('scroll', setActiveSection);

// Hide/Show Navbar on Scroll
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down - hide navbar
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up - show navbar
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Initial active section check
setActiveSection();

/* Navbar Transitions */

// RSVP Form Handling
document.getElementById('rsvpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const family = document.getElementById('family').value;
    
    document.getElementById('guestName').textContent = name;
    document.getElementById('familyName').textContent = family;
    
    // Hide form and show success message
    this.style.display = 'none';
    document.getElementById('successMessage').classList.remove('hidden');
});

// Audio Control
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('bgMusic');
    const audioControl = document.getElementById('audioControl');
    const audioIcon = document.getElementById('audioIcon');
    let isPlaying = true;

    // Function to play/pause audio
    function toggleAudio() {
        if (isPlaying) {
            audio.pause();
            audioIcon.classList.remove('fa-volume-up');
            audioIcon.classList.add('fa-volume-mute');
        } else {
            audio.play();
            audioIcon.classList.remove('fa-volume-mute');
            audioIcon.classList.add('fa-volume-up');
        }
        isPlaying = !isPlaying;
    }

    // Add click event listener to audio control button
    audioControl.addEventListener('click', toggleAudio);

    // Force play on all possible user interactions
    const forcePlay = () => {
        audio.play().then(() => {
            isPlaying = true;
            audioIcon.classList.remove('fa-volume-mute');
            audioIcon.classList.add('fa-volume-up');
        }).catch(e => console.log("Playback failed:", e));
    };

    // Try to play immediately
    forcePlay();

    // Try to play on various user interactions
    ['click', 'touchstart', 'scroll'].forEach(event => {
        document.addEventListener(event, function playOnInteraction() {
            forcePlay();
            // Remove the event listener after first interaction
            document.removeEventListener(event, playOnInteraction);
        }, { once: true });
    });

    // Additional attempt to play after a short delay
    setTimeout(forcePlay, 1000);
});
