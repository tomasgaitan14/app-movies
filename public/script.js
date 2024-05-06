function signup()
{
    console.log('Click en boton registrarse');
    document.querySelector(".login-form-container").style.cssText = "display: none;";
    document.querySelector(".signup-form-container").style.cssText = "display: block;";
    document.querySelector(".container").style.cssText = "background: linear-gradient(to bottom, rgb(56, 189, 149),  rgb(28, 139, 106));";
    document.querySelector(".button-1").style.cssText = "display: none";
    document.querySelector(".button-2").style.cssText = "display: block";
    document.querySelector('body').style.cssText = 'background-color: rgb(56, 189, 149);'

};

function login()
{
    console.log('Click en boton login')
    document.querySelector(".signup-form-container").style.cssText = "display: none;";
    document.querySelector(".login-form-container").style.cssText = "display: block;";
    document.querySelector(".container").style.cssText = "background: linear-gradient(to bottom, rgb(6, 108, 224),  rgb(14, 48, 122));";
    document.querySelector(".button-2").style.cssText = "display: none";
    document.querySelector(".button-1").style.cssText = "display: block";
    document.querySelector('body').style.cssText = 'background-color: rgb(56, 102, 189);'

}

document.addEventListener('DOMContentLoaded', function() {
    // Event listener for the login form
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        console.log('LOGEO')
        e.preventDefault();

        // Extract username and password from the form
        var email = document.getElementById('email-login').value;
        var password = document.getElementById('password-login').value;

        // Create form data object
        var formData = {
            email: email,
            password: password
        };

        console.log(formData.email,formData.password)

        // Convert form data to JSON
        var jsonData = JSON.stringify(formData);

        // Send login request
        fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Usuario o contraseña incorrecto');
            }
            return response.json();
        })
        .then(function(data) {
            Swal.fire({
                title: `${data.message}`,
                text: `Token (10min): ${data.token}`,
                icon: "success"
              });
        })
        .catch(function(error) {
            console.error('Error:', error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `${error.message}`
              });
        });
    });

    // Event listener for the signup form
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        console.log('REGISTRO')
        e.preventDefault();

        // Extract username, email, and password from the form
        var username = document.getElementById('username-register').value;
        var email =  document.getElementById('email-register').value;
        var password = document.getElementById('password-register').value;

        // Create form data object
        var formData = {
            username: username,
            email: email,
            password: password
        };

        // Convert form data to JSON
        var jsonData = JSON.stringify(formData);

        // Send signup request
        fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Error al registrar usuario');
            }
            return response.json();
        })
        .then(function(data) {
            Swal.fire({
                title: `${data.message}`,
                text: `Usuario registrado correctamente`,
                icon: "success"
              });
        })
        .catch(function(error) {
            console.error('Error:', error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `${error.message}`
              });
        });
    });
});