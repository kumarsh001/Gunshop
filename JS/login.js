document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

   
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';

   
    var valid = true;

   
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        valid = false;
    }

 
    if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters long';
        valid = false;
    }

    if (valid) {
        alert('Login successful!');
       
    }
});
