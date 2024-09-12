let search = document.querySelector('.search-box');

document.querySelector('#search-icon').onclick = () => {
search.classList.toggle('active');
cart.classList.remove('active');
navbar.classList.remove('active');
}

let cart = document.querySelector('.cart');

document.querySelector('#cart-icon').onclick = () => {
cart.classList.toggle('active');
search.classList.remove('active');
navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-icon').onclick = () => {
navbar.classList.toggle('active');
cart.classList.remove('active');
search.classList.remove('active');
}

var swiper = new Swiper(".new-arrival", {
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    centeredSlides: true,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        425: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        1020: {
            slidesPerView: 3,
        },
    },
  
  });