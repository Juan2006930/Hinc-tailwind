(function () {
    'use strict';

    // Activa la validación en tiempo real para los formularios con la clase 'needs-validation'
    var forms = document.querySelectorAll('.needs-validation');

    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            // Evitar el comportamiento por defecto en el submit para agregar validaciones
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);

            // Agregar validaciones en tiempo real para inputs dentro del formulario
            form.addEventListener('input', function(event) {
                var target = event.target;

                // Validación para cada campo
                if (target.classList.contains('form-control')) {
                    // Validación de nombre
                    if (target.id === 'name') {
                        // Verificar que solo contiene letras y espacios
                        const nameRegex = /^[a-zA-Z\s]+$/;
                        if (nameRegex.test(target.value)) {
                            target.classList.remove('is-invalid');
                            target.classList.add('is-valid');
                        } else {
                            target.classList.remove('is-valid');
                            target.classList.add('is-invalid');
                        }
                    }

                    // Validación de correo electrónico
                    if (target.id === 'email') {
                        if (target.checkValidity()) {
                            target.classList.remove('is-invalid');
                            target.classList.add('is-valid');
                        } else {
                            target.classList.remove('is-valid');
                            target.classList.add('is-invalid');
                        }
                    }

                    // Validación de contraseña
                    if (target.id === 'password') {
                        const passwordValue = target.value;
                        const minLength = 8;
                        const hasUpperCase = /[A-Z]/.test(passwordValue);
                        const hasNumber = /[0-9]/.test(passwordValue);

                        if (passwordValue.length >= minLength && hasUpperCase && hasNumber) {
                            target.classList.remove('is-invalid');
                            target.classList.add('is-valid');
                        } else {
                            target.classList.remove('is-valid');
                            target.classList.add('is-invalid');
                        }
                    }

                    // Validación de confirmación de contraseña
                    if (target.id === 'confirmPassword') {
                        const password = document.getElementById('password').value;
                        const confirmPassword = target.value;
                        if (password === confirmPassword) {
                            target.classList.remove('is-invalid');
                            target.classList.add('is-valid');
                        } else {
                            target.classList.remove('is-valid');
                            target.classList.add('is-invalid');
                        }
                    }
                }
            });
        });
})();

// Validación de coincidencia de contraseñas en tiempo real
document.getElementById('confirmPassword').addEventListener('input', function () {
    const password = document.getElementById('password').value;
    const confirmPassword = this.value;
    const confirmPasswordField = document.getElementById('confirmPassword');
    
    if (password !== confirmPassword) {
        confirmPasswordField.setCustomValidity('Las contraseñas no coinciden.');
        confirmPasswordField.classList.remove('is-valid');
        confirmPasswordField.classList.add('is-invalid');
    } else {
        confirmPasswordField.setCustomValidity('');
        confirmPasswordField.classList.remove('is-invalid');
        confirmPasswordField.classList.add('is-valid');
    }
});

// Validación del campo de correo electrónico
document.getElementById('email').addEventListener('input', function () {
    const emailField = this;
    const emailValue = emailField.value;

    // Verificar si el correo es válido
    if (emailField.checkValidity()) {
        emailField.classList.remove('is-invalid');
        emailField.classList.add('is-valid');
    } else {
        emailField.classList.remove('is-valid');
        emailField.classList.add('is-invalid');
    }
});

// Validación de contraseña en tiempo real (longitud, mayúsculas y números)
document.getElementById('password').addEventListener('input', function () {
    const passwordField = this;
    const passwordValue = passwordField.value;

    const minLength = 8; // Longitud mínima de la contraseña
    const hasUpperCase = /[A-Z]/.test(passwordValue); // Al menos una mayúscula
    const hasNumber = /[0-9]/.test(passwordValue); // Al menos un número

    // Si no cumple con los requisitos, marcar el campo como inválido
    if (passwordValue.length >= minLength && hasUpperCase && hasNumber) {
        passwordField.setCustomValidity(''); // Limpiar mensaje de error
        passwordField.classList.remove('is-invalid');
        passwordField.classList.add('is-valid');
    } else {
        passwordField.setCustomValidity('La contraseña debe tener al menos 8 caracteres, incluir al menos una letra mayúscula y un número.');
        passwordField.classList.remove('is-valid');
        passwordField.classList.add('is-invalid');
    }
});