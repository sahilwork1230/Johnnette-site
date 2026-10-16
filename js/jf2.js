// Initialize Swiper 
var swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    spaceBetween: 0,
    effect: "fade",
    // cssMode: true,
    mousewheel: true,
    mousewheel: {
        releaseOnEdges: true,
    },
    keyboard: {
        enabled: true,
    },
    touchReleaseOnEdges: true,
});
var swiper2 = new Swiper(".mySwiper2", {
    spaceBetween: 0,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    touchReleaseOnEdges: true,
});