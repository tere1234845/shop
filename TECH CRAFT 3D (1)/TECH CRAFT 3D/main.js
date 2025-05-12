// Array para almacenar los productos añadidos al carrito
let cart = [];

// Función para agregar productos al carrito
function addToCart(productName, productPrice) {
  const product = {
    name: productName,
    price: productPrice
  };

  cart.push(product);
  updateCartCount();
  updateCartItems();
}

// Función para actualizar el contador del carrito
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = cart.length;
}

// Función para actualizar los productos en el modal
function updateCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  
  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach((product, index) => {
    const productElement = document.createElement('div');
    productElement.classList.add('cart-item');
    productElement.innerHTML = `
      <p>${product.name} - $${product.price}</p>
      <button class="remove-btn" data-index="${index}">Eliminar</button>
    `;
    cartItemsContainer.appendChild(productElement);
    total += product.price;
  });

  // Asignar eventos a botones "Eliminar"
  cartItemsContainer.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', function () {
      const index = parseInt(this.getAttribute('data-index'));
      cart.splice(index, 1);         // Eliminar del array
      updateCartItems();             // Actualizar vista
      updateCartCount();             // Actualizar contador
    });
  });

  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Función para abrir el carrito (mostrar el modal)
document.getElementById('cart-icon').addEventListener('click', function() {
  const cartModal = document.getElementById('cart-modal');
  cartModal.classList.remove('hidden');
});

// Función para cerrar el carrito
function closeCart() {
  const cartModal = document.getElementById('cart-modal');
  cartModal.classList.add('hidden');
}

// Función para proceder con el pago
function checkout() {
  if (cart.length === 0) {
    showNotification("El carrito está vacío");
    return;
  }

  const paymentMethod = document.getElementById('modal-payment-method').value;

  setTimeout(() => {
    const ticketId = Date.now().toString().slice(-6);
    const ticketData = {
      id: ticketId,
      date: new Date().toLocaleString(),
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price, 0),
      method: paymentMethod
    };

    generateTicket(ticketData);
    cart = [];
    updateCart();
    document.getElementById('cart-modal').classList.add('hidden');
    showNotification("Compra exitosa. Ticket generado");
  }, 1500);
}

// Generar ticket con código de barras
function generateTicket(ticket) {
  const itemsHTML = ticket.items.map(item =>
    `<p>${item.name} - $${item.price}</p>`
  ).join('');

  const ticketHtml = `
    <div id="ticket-content" class="ticket" style="text-align:left; padding:1rem; font-size:14px;">
      <h3 style="text-align:center;">TECH CRAFT 3D</h3>
      <p><strong>Ticket #${ticket.id}</strong></p>
      <p>${ticket.date}</p>
      <p><strong>Método de pago:</strong> ${ticket.method}</p>
      <hr>
      ${itemsHTML}
      <hr>
      <p><strong>TOTAL: $${ticket.total.toLocaleString()}</strong></p>
      <svg id="barcode"></svg>
      <p style="text-align:center;">¡Gracias por su compra!</p>
    </div>
  `;

  Swal.fire({
    title: 'Ticket de Compra',
    html: `
      ${ticketHtml}
      <div style="text-align:center; margin-top:1rem;">
        <button onclick="printTicket()" style="margin:0.5rem;">🖨 Imprimir</button>
        <button onclick="downloadTicketPDF()" style="margin:0.5rem;">⬇ Descargar PDF</button>
      </div>
    `,
    showConfirmButton: false,
    background: '#1a1a2e',
    color: '#fff',
    width: 600,
    didOpen: () => {
      JsBarcode("#barcode", ticket.id, {
        format: "CODE128",
        lineColor: "#fff",
        background: "#1a1a2e",
        width: 2,
        height: 50,
        displayValue: false
      });
    }
  });
}

// Imprimir ticket
function printTicket() {
  const ticketElement = document.getElementById('ticket-content');
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`<html><head><title>Ticket</title></head><body>${ticketElement.outerHTML}</body></html>`);
  printWindow.document.close();
  printWindow.print();
}

// Descargar ticket como PDF
function downloadTicketPDF() {
  const ticketElement = document.getElementById('ticket-content');
  html2pdf()
    .set({
      margin: 0.5,
      filename: `ticket_techcraft_${Date.now().toString().slice(-6)}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    })
    .from(ticketElement)
    .save();
}

// Notificación flotante
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('fade-out');
    setTimeout(() => notification.remove(), 500);
  }, 3000);
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  updateCart();

  document.querySelector('.cart-icon').addEventListener('click', () => {
    document.getElementById('cart-modal').classList.toggle('hidden');
  });
});

function updateCart() {
  updateCartItems();
  updateCartCount();
}

function openGuide() {
  document.getElementById('guide-modal').classList.remove('hidden');
}

function closeGuide() {
  document.getElementById('guide-modal').classList.add('hidden');
}

