<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id_producto = $_POST['id_producto'];
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $categoria = $_POST['categoria'];
    $precio = $_POST['precio'];
    $cantidad = $_POST['cantidad'];

    // Actualizar imagen si se sube una nueva
    if ($_FILES['imagen']['name']) {
        $imagen = $_FILES['imagen']['name'];
        $target = "imagenes/" . basename($imagen);
        move_uploaded_file($_FILES['imagen']['tmp_name'], $target);
    } else {
        $imagen = $_POST['imagen_actual'];  // Si no se sube nueva imagen, mantener la existente
    }

    // Aquí puedes agregar el código para actualizar el producto en tu base de datos
    // ejemplo:
    // $conn = new mysqli("localhost", "usuario", "contraseña", "base_de_datos");
    // $query = "UPDATE productos SET nombre='$nombre', descripcion='$descripcion', categoria='$categoria', precio='$precio', cantidad='$cantidad', imagen='$imagen' WHERE id='$id_producto'";
    // $conn->query($query);

    echo "Producto actualizado exitosamente!";
}
?>
