<?php
$conexion = mysqli_connect("localhost", "root", "", "hincprovisional");

// Verificar la conexión
if (!$conexion) {
    die("Conexión fallida: " . mysqli_connect_error());
}
?>