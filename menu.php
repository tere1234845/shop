<?php
// Obtener imágenes de las carpetas
$hombres_images = glob('hombres/*.jpg');
$mujeres_images = glob('mujeres/*.jpg');
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menú</title>
    <style>
        body {
            font-family: 'Roboto', sans-serif;
            background-color: #f0f0f0;
        }

        .image-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
        }

        .image-container img {
            width: 200px;
            height: auto;
            border-radius: 10px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
        }
    </style>
</head>
<body>
    <div class="image-container">
        <h2>Imágenes de Hombres</h2>
        <?php foreach ($hombres_images as $image): ?>
            <img src="<?= $image ?>" alt="Imagen de Hombre" />
        <?php endforeach; ?>

        <h2>Imágenes de Mujeres</h2>
        <?php foreach ($mujeres_images as $image): ?>
            <img src="<?= $image ?>" alt="Imagen de Mujer" />
        <?php endforeach; ?>
    </div>
</body>
</html>
