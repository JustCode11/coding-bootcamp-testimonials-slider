const attribution = document.getElementById("attribution");
const attributionButton = document.getElementById('attributionButton');
const attributionArrowImg = document.getElementById('attributionArrowImg');

attributionButton.addEventListener('click', () => {
    if (attribution.classList.contains('go-up')) {
        attribution.classList.remove('go-up');
        attribution.classList.add('go-down');
        attributionArrowImg.classList.remove('rotate-arrow-down');
        attributionArrowImg.classList.add('rotate-arrow-up');
    } else {
        attribution.classList.remove('go-down');
        attribution.classList.add('go-up');
        attributionArrowImg.classList.remove('rotate-arrow-up');
        attributionArrowImg.classList.add('rotate-arrow-down');
    }
})

// Tilt Effect on Images
const tiltEffectOptions = {
    max: 15,
    perspective: 800,
    scale: 1.1,
    speed: 500,
    easing: "cubic-bezier(.03,.98,.52,.99)"
};

const images = document.querySelectorAll(".profileImg");
const desktopView = window.matchMedia("(min-width: 900px)");

images.forEach(img => {
    img.addEventListener("mouseenter", imgMouseEnter);

    img.addEventListener("mousemove", imgMouseMove);

    img.addEventListener("mouseleave", imgMouseLeave);
});

function imgMouseEnter(event) {
    setTransition(event);
}

function imgMouseMove(event) {
    const img = event.currentTarget;
    const imgWidth = img.offsetWidth;
    const imgHeight = img.offsetHeight;
    const centerX = img.offsetLeft + imgWidth / 2;
    let centerY = null;
    if (desktopView.matches) {
        centerY = img.offsetTop + imgHeight / 2;
    } else {
        centerY = img.offsetTop + imgHeight;
    }
    let mouseX = null;
    if (desktopView.matches) {
        mouseX = (event.clientX - centerX) - 650;
    } else {
        mouseX = event.clientX - centerX;
    }
    let mouseY = null;
    if (desktopView.matches) {
        mouseY = (event.clientY - centerY) - 100;
    } else {
        mouseY = (event.clientY - centerY) - 50;
    }
    const rotateXUncapped = (+1) * tiltEffectOptions.max * mouseY / (imgHeight / 2);
    const rotateYUncapped = (-1) * tiltEffectOptions.max * mouseX / (imgWidth / 2);
    const rotateX = rotateXUncapped < -tiltEffectOptions.max ? -tiltEffectOptions.max : (rotateXUncapped > tiltEffectOptions.max ? tiltEffectOptions.max : rotateXUncapped);
    const rotateY = rotateYUncapped < -tiltEffectOptions.max ? -tiltEffectOptions.max : (rotateYUncapped > tiltEffectOptions.max ? tiltEffectOptions.max : rotateYUncapped);
    img.style.transform = `perspective(${tiltEffectOptions.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)
    
    scale3d(${tiltEffectOptions.scale}, ${tiltEffectOptions.scale}, ${tiltEffectOptions.scale})`;
}

function imgMouseLeave(event) {
    event.currentTarget.style.transform = `perspective(${tiltEffectOptions.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    setTransition(event);
}

function setTransition(event) {
    const img = event.currentTarget;
    clearTimeout(img.transitionTimeoutId);
    img.style.transition = `transform ${tiltEffectOptions.speed}ms ${tiltEffectOptions.easing}`;
    img.transitionTimeoutId = setTimeout(() => {
        img.style.transition = "";
    }, tiltEffectOptions.speed);
}

// Slider

const prevButton = document.querySelector('.prevButton');
const nextButton = document.querySelector('.nextButton');
//const slide = document.querySelector('.slide');
let currentSlide = 0;

prevButton.addEventListener('click', () => {
    changeSlide();
    setTimeout(() => { }, 1000);
});
nextButton.addEventListener('click', (event) => {
    changeSlide();
    const button = event.currentTarget;
    button.disabled = true;
    setTimeout(() => {
        button.disabled = false;
    }, 1000);
});;

function changeSlide() {
    const images = document.querySelectorAll('.profileImg');
    const textBoxes = document.querySelectorAll('.slide__text-container__text');
    let shadowElement = document.querySelector('.slide__image-container__shadow');
    let currentImg = images[currentSlide];
    let currentText = textBoxes[currentSlide];
    currentSlide = currentSlide === 0 ? 1 : 0;
    let nextImg = images[currentSlide];
    let nextText = textBoxes[currentSlide];
    // remove current Slide
    currentImg.classList.add('image-slide-right-outside');
    currentText.classList.add('text-slide-left-outside');
    shadowElement.classList.add('fade-out');
    setTimeout(() => {
        currentImg.classList.add('hide');
        currentText.classList.add('hide');
        currentImg.classList.remove('image-slide-right-outside');
        currentText.classList.remove('text-slide-left-outside');
        // add next Slide
        nextImg.classList.remove('hide');
        nextText.classList.remove('hide');
        nextImg.classList.add('image-slide-left-inside');
        nextText.classList.add('text-slide-right-inside');
        shadowElement.classList.remove('fade-out');
        shadowElement.classList.add('fade-in');
        setTimeout(() => {
            nextImg.classList.remove('image-slide-left-inside');
            nextText.classList.remove('text-slide-right-inside');
            shadowElement.classList.remove('fade-in');
        }, 500);
    }, 500);
}
