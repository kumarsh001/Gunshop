function validateForm() {
    let isValid = true;

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    // Reset errors
    usernameError.style.display = 'none';
    emailError.style.display = 'none';
    passwordError.style.display = 'none';
    confirmPasswordError.style.display = 'none';

    // Validate username
    if (username.trim() === '') {
        usernameError.style.display = 'block';
        isValid = false;
    }

    // Validate email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        emailError.style.display = 'block';
        isValid = false;
    }

    // Validate password
    if (password.trim() === '') {
        passwordError.style.display = 'block';
        isValid = false;
    }

    // Validate confirm password
    if (confirmPassword.trim() === '' || password !== confirmPassword) {
        confirmPasswordError.style.display = 'block';
        isValid = false;
    }

    return isValid;
}