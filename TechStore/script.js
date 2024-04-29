function agregarAlCarrito(id, nombre, precio, cantidad) {
    let carrito = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];
    let productoIndex = carrito.findIndex(item => item.id === id);

    if (productoIndex !== -1) {
        // Si el producto ya está en el carrito, incrementa la cantidad
        carrito[productoIndex].cantidad += cantidad;
    } else {
        // Si el producto no está en el carrito, añádelo
        carrito.push({ id: id, nombre: nombre, precio: precio, cantidad: cantidad });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));

    console.log('Producto agregado al carrito:', id, nombre, precio, cantidad); // Agregar este console.log
    // Redirigir a la página del carrito
    window.location.href = 'carrito.html';
}


// Función para eliminar un producto del carrito
function eliminarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    let carritoActualizado = carrito.filter(item => item.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
    mostrarCarrito(); // Actualizar la vista del carrito después de eliminar un producto
}

// Función para mostrar el contenido del carrito
function mostrarCarrito() {
    let carrito = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];
    let carritoContainer = document.getElementById('carrito');

    if (carrito.length === 0) {
        carritoContainer.innerHTML = '<p>El carrito está vacío.</p>';
        return; // Salir de la función si el carrito está vacío
    }

    let total = 0;
    carritoContainer.innerHTML = ''; // Limpiar el contenido anterior del carrito

    carrito.forEach(producto => {
        total += producto.precio * producto.cantidad;
        carritoContainer.innerHTML += `
            <div class="producto-en-carrito">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio.toFixed(2)}</p>
                <p>Cantidad: ${producto.cantidad}</p>
            </div>
        `;
    });

    carritoContainer.innerHTML += `<p>Total: $${total.toFixed(2)}</p>`;
}

// Event listener para botones de agregar al carrito en la página de productos.html
document.addEventListener('DOMContentLoaded', () => {
    const agregarBotones = document.querySelectorAll('.agregar-al-carrito');
    agregarBotones.forEach(boton => {
        boton.addEventListener('click', () => {
            const id = boton.getAttribute('data-id');
            const nombre = boton.getAttribute('data-nombre');
            const precio = parseFloat(boton.getAttribute('data-precio'));
            const cantidad = parseInt(document.getElementById(`cantidad-${id}`).value); // Obtener la cantidad del producto
            agregarAlCarrito(id, nombre, precio, cantidad);
            mostrarCarrito(); // Actualizar la vista del carrito después de agregar un producto
        });
    });

    // Mostrar el carrito cuando se carga la página de carrito.html
    if (window.location.pathname === './carrito.html') {
        mostrarCarrito();
    }
});
