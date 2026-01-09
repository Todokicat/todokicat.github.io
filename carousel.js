
    const track = document.querySelector('.carousel-track');
    const images = document.querySelectorAll('.carousel-image');
    const prevBtn = document.querySelector('.carousel-button.prev');
    const nextBtn = document.querySelector('.carousel-button.next');
    const dotContainer = document.querySelector('.carousel-dots');
    const carouselContainer = document.getElementById('carousel');
    let currentIndex = 0;
    let autoplayInterval;

    // Create navigation dots
    images.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
            stopAutoplay();
            currentIndex = index;
            updateCarousel();
            startAutoplay();
        });
        dotContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.carousel-dots .dot');

    function updateCarousel() {
        const slideWidth = images[0].clientWidth;
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel();
    }

    function startAutoplay() {
        autoplayInterval = setInterval(nextImage, 4000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    prevBtn.addEventListener('click', () => {
        stopAutoplay();
        prevImage();
        startAutoplay();
    });

    nextBtn.addEventListener('click', () => {
        stopAutoplay();
        nextImage();
        startAutoplay();
    });

    // Pause on hover
    carouselContainer.addEventListener('mouseenter', stopAutoplay);
    carouselContainer.addEventListener('mouseleave', startAutoplay);

    // Init
    window.addEventListener('resize', updateCarousel); // Keep layout responsive
    updateCarousel();
    startAutoplay();
