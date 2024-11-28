-- Crear base de datos
CREATE DATABASE usuarios;

-- Usar la base de datos
USE usuarios;

-- Crear tabla de usuarios
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);
