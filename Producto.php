<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $categoria = $_POST['categoria'];
    $precio = $_POST['precio'];
    $cantidad = $_POST['cantidad'];

    // Subir la imagen
    $imagen = $_FILES['imagen']['name'];
    $target = "imagenes/" . basename($imagen);
    move_uploaded_file($_FILES['imagen']['tmp_name'], $target);

    // Aquí puedes agregar el código para guardar el producto en tu base de datos
    // ejemplo:
    // $conn = new mysqli("localhost", "usuario", "contraseña", "base_de_datos");
    // $query = "INSERT INTO productos (nombre, descripcion, categoria, precio, cantidad, imagen) VALUES ('$nombre', '$descripcion', '$categoria', '$precio', '$cantidad', '$imagen')";
    // $conn->query($query);

    echo "Producto agregado exitosamente!";
}
?>
