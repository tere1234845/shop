<?php
include 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM usuarios WHERE username='$username' AND password='$password'";
    $resultado = $conn->query($sql);

    if ($resultado->num_rows > 0) {
        echo "success";
    } else {
        echo "error";
    }
}
?>
