let navbar = document.querySelector('.navbar');

document.querySelector('#menu-icon').onclick = () => {
navbar.classList.toggle('active');
cart.classList.remove('active');
search.classList.remove('active');
}

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






function validateForm() {
    let isValid = true;

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const messageError = document.getElementById('messageError');

    
    nameError.style.display = 'none';
    emailError.style.display = 'none';
    phoneError.style.display = 'none';
    messageError.style.display = 'none';

    
    if (name.trim() === '') {
        nameError.style.display = 'block';
        isValid = false;
    }


    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        emailError.style.display = 'block';
        isValid = false;
    }

    
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phone)) {
        phoneError.style.display = 'block';
        isValid = false;
    }


    if (message.trim() === '') {
        messageError.style.display = 'block';
        isValid = false;
    }

    return isValid;
}