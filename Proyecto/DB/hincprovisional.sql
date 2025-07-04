CREATE DATABASE hincprovisional;

CREATE TABLE hincprovisional.usuarios(
id_usuario MEDIUMINT PRIMARY KEY AUTO_INCREMENT,    
nombre VARCHAR(100) NOT NULL,
correo VARCHAR(100) NOT NULL,
contraseña VARCHAR(100) NOT NULL,
rol ENUM('Usuario', 'Administrador') DEFAULT 'Usuario'
);
