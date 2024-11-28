// Espera a que el DOM se cargue completamente
document.addEventListener("DOMContentLoaded", function () {

    // Datos de productos (puedes ampliarlo según tus necesidades)
    const products = [
        { id: 1, name: "Producto 1", price: 50.00 },
        { id: 2, name: "Producto 2", price: 60.00 },
        // Puedes agregar más productos aquí
    ];

    let cart = []; // Arreglo para almacenar los productos agregados al carrito

    // Función para actualizar el carrito
    function updateCart() {
        const cartItemsContainer = document.getElementById("cart-items");
        const totalPriceElement = document.getElementById("total-price");

        cartItemsContainer.innerHTML = ""; // Limpiar el carrito antes de mostrar los productos

        let totalPrice = 0;

        // Agregar los productos al carrito
        cart.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `${item.name} - $${item.price.toFixed(2)} <button class="remove-from-cart" data-id="${item.id}">Eliminar</button>`;
            cartItemsContainer.appendChild(li);
            totalPrice += item.price;
        });

        totalPriceElement.innerHTML = `Total: $${totalPrice.toFixed(2)}`;

        // Agregar el evento de eliminar para cada producto
        document.querySelectorAll(".remove-from-cart").forEach(button => {
            button.addEventListener("click", (event) => {
                const productId = parseInt(event.target.getAttribute("data-id"));
                removeFromCart(productId);
            });
        });
    }

    // Función para agregar un producto al carrito
    function addToCart(productId) {
        // Buscar el producto por ID
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push(product); // Agregar el producto al carrito
            updateCart(); // Actualizar la vista del carrito
        }
    }

    // Función para eliminar un producto del carrito
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId); // Eliminar el producto del carrito
        updateCart(); // Actualizar la vista del carrito
    }

    // Manejar el clic en los botones "Agregar al carrito"
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (event) => {
            const productId = parseInt(event.target.closest(".carousel-item").getAttribute("data-id"));
            addToCart(productId); // Agregar el producto al carrito
        });
    });

});



