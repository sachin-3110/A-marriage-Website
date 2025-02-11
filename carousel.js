document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    let slideInterval;

    // Initialize first slide
    slides[0].classList.add('opacity-100');

    function goToSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('opacity-100');
            slide.classList.add('opacity-0');
        });
        
        // Show selected slide
        slides[index].classList.remove('opacity-0');
        slides[index].classList.add('opacity-100');

        // Update dots
        dots.forEach(dot => dot.classList.remove('bg-white', 'active'));
        dots[index].classList.add('bg-white', 'active');

        currentSlide = index;
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }

    function prevSlide() {
        goToSlide((currentSlide - 1 + slides.length) % slides.length);
    }

    // Event Listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetInterval();
        });
    });

    // Auto-advance slides
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startSlideShow();
    }

    // Start the slideshow
    startSlideShow();

    // Pause on hover
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
    carousel.addEventListener('mouseleave', startSlideShow);

    // GSAP Animation for text
    gsap.from('.carousel h1', {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
    });

    gsap.from('.carousel p', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });
});
// venuecarousel
document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.getElementById('mainVenueImage');
    const thumbnails = document.querySelectorAll('.venue-thumb');
    const prevBtn = document.getElementById('venueCarouselPrev');
    const nextBtn = document.getElementById('venueCarouselNext');
    let currentIndex = 0;
    let isAnimating = false;

    // Function to update main image with GSAP animation
    function updateMainImage(newSrc, direction = 1) {
        if (isAnimating) return;
        isAnimating = true;

        // Create temporary image for cross-fade
        const tempImg = document.createElement('img');
        tempImg.src = newSrc;
        tempImg.className = 'w-full h-full object-cover absolute inset-0';
        tempImg.style.opacity = '0';
        mainImage.parentElement.insertBefore(tempImg, mainImage.nextSibling);

        // Animate out current image and in new image
        gsap.to(mainImage, {
            opacity: 0,
            x: -100 * direction,
            duration: 0.5,
            ease: 'power2.inOut'
        });

        gsap.to(tempImg, {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: 'power2.inOut',
            onComplete: () => {
                mainImage.src = newSrc;
                mainImage.style.opacity = '1';
                mainImage.style.transform = 'translateX(0)';
                tempImg.remove();
                isAnimating = false;
            }
        });
    }

    // Update active thumbnail
    function updateActiveThumbnail(index) {
        thumbnails.forEach((thumb, i) => {
            const border = thumb.querySelector('div > div');
            if (i === index) {
                gsap.to(border, {
                    borderColor: '#fcd34d',
                    duration: 0.3
                });
                thumb.classList.add('active');
            } else {
                gsap.to(border, {
                    borderColor: 'transparent',
                    duration: 0.3
                });
                thumb.classList.remove('active');
            }
        });
    }

    // Add click events to thumbnails
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            if (currentIndex === index) return;
            const direction = index > currentIndex ? 1 : -1;
            updateMainImage(thumb.dataset.img, direction);
            updateActiveThumbnail(index);
            currentIndex = index;
        });
    });

    // Navigation buttons
    prevBtn?.addEventListener('click', () => {
        const newIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
        updateMainImage(thumbnails[newIndex].dataset.img, -1);
        updateActiveThumbnail(newIndex);
        currentIndex = newIndex;
    });

    nextBtn?.addEventListener('click', () => {
        const newIndex = (currentIndex + 1) % thumbnails.length;
        updateMainImage(thumbnails[newIndex].dataset.img, 1);
        updateActiveThumbnail(newIndex);
        currentIndex = newIndex;
    });

    // Auto advance
    let autoAdvanceTimer = setInterval(() => {
        const newIndex = (currentIndex + 1) % thumbnails.length;
        updateMainImage(thumbnails[newIndex].dataset.img, 1);
        updateActiveThumbnail(newIndex);
        currentIndex = newIndex;
    }, 5000);

    // Pause auto-advance on hover
    const carouselContainer = document.getElementById('venueImageCarousel');
    carouselContainer?.addEventListener('mouseenter', () => {
        clearInterval(autoAdvanceTimer);
    });

    carouselContainer?.addEventListener('mouseleave', () => {
        autoAdvanceTimer = setInterval(() => {
            const newIndex = (currentIndex + 1) % thumbnails.length;
            updateMainImage(thumbnails[newIndex].dataset.img, 1);
            updateActiveThumbnail(newIndex);
            currentIndex = newIndex;
        }, 5000);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });
});