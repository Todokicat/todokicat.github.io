const track = document.getElementById("track")
const dots = document.querySelectorAll(".dot")
const slides = document.querySelectorAll(".carousel-slide")
const carousel = document.getElementById("carousel")

let index = 0
let interval

function updateCarousel() {

    track.style.transform = `translateX(-${index * 100}%)`

    dots.forEach(dot => dot.classList.remove("active"))
    dots[index].classList.add("active")

}

function nextSlide() {

    index++

    if (index >= slides.length) {
        index = 0
    }

    updateCarousel()

}

function startAuto() {
    interval = setInterval(nextSlide, 4000)
}

function stopAuto() {
    clearInterval(interval)
}

dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        index = i
        updateCarousel()
    })
})

/* hover pause */

carousel.addEventListener("mouseenter", stopAuto)
carousel.addEventListener("mouseleave", startAuto)

/* swipe support */

let startX = 0

carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX
})

carousel.addEventListener("touchend", (e) => {

    let endX = e.changedTouches[0].clientX
    let diff = startX - endX

    if (Math.abs(diff) > 50) {

        if (diff > 0) {
            nextSlide()
        } else {
            index--
            if (index < 0) index = slides.length - 1
            updateCarousel()
        }

    }

})

startAuto()
