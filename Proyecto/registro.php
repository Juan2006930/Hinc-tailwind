<?php 
// Incluir la conexión a la base de datos
include 'conexion.php';

// Inicializar variables
$nombre = $correo = $contraseña = $confirmarContraseña = "";
$errores = [];

// Verificar si el formulario fue enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Limpiar y validar los datos del formulario
    $nombre = trim($_POST['name']);
    $correo = trim($_POST['email']);
    $contraseña = trim($_POST['password']);
    $confirmarContraseña = trim($_POST['confirmPassword']);

    // Validaciones
    if (empty($nombre) || !preg_match("/^[a-zA-Z\s]+$/", $nombre)) {
        // Permitir solo letras y espacios
        $errores[] = "El nombre es requerido y solo debe contener letras y espacios.";
    }

    if (empty($correo) || !filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        $errores[] = "El correo electrónico es inválido.";
    }

    if (empty($contraseña)) {
        $errores[] = "La contraseña es requerida.";
    } elseif (strlen($contraseña) < 8 || !preg_match("/[A-Z]/", $contraseña) || !preg_match("/[0-9]/", $contraseña)) {
        $errores[] = "La contraseña debe tener al menos 8 caracteres, incluir al menos una letra mayúscula y un número.";
    }

    if ($contraseña !== $confirmarContraseña) {
        $errores[] = "Las contraseñas no coinciden.";
    }

    // Si no hay errores, proceder a la inserción
    if (empty($errores)) {
        $rol = 'Usuario'; // Asignar rol

        // Si deseas encriptar la contraseña, descomenta la siguiente línea
        // $contraseñaHash = password_hash($contraseña, PASSWORD_DEFAULT);

        // Si no deseas encriptar la contraseña, utiliza la variable $contraseña directamente
        $contraseñaHash = $contraseña; // Almacenar la contraseña sin encriptar

        // Preparar la consulta SQL
        $query = "INSERT INTO usuarios (nombre, correo, contraseña, rol) 
                  VALUES ('$nombre', '$correo', '$contraseñaHash', '$rol')";

        // Ejecutar la consulta
        if (mysqli_query($conexion, $query)) {
            echo "<script> 
                    alert('Registro exitoso'); 
                    window.location.href = 'login.php'; // Redirigir a login.php 
                  </script>";
        } else {
            echo "<script> 
                    alert('Error: " . mysqli_error($conexion) . "'); 
                    window.history.back(); // Volver a la página anterior 
                  </script>";
        }
    } else {
        // Mostrar errores
        foreach ($errores as $error) {
            echo "<script>alert('$error');</script>";
        }
    }

    // Cerrar la conexión
    mysqli_close($conexion);
}
?>
