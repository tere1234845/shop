<?php
// Conexión a la base de datos
$servername = "localhost";
$username = "root";  // Cambiar si es necesario
$password = "";      // Cambiar si es necesario
$dbname = "usuarios"; // Nombre de la base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Comprobar conexión
if ($conn->connect_error) {
  die("Conexión fallida: " . $conn->connect_error);
}

// Recibir datos del formulario
$user = $_POST['username'];
$pass = $_POST['password'];

// Encriptar la contraseña antes de guardarla
$hashedPassword = password_hash($pass, PASSWORD_DEFAULT);

// Insertar el nuevo usuario en la base de datos
$sql = "INSERT INTO users (username, password) VALUES ('$user', '$hashedPassword')";

if ($conn->query($sql) === TRUE) {
  echo "Nuevo usuario creado con éxito";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

// Cerrar conexión
$conn->close();
?>
