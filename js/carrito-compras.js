let carrito = [];
let cartList = "";
let totalCompra = 0;

if (localStorage && localStorage.storageCarrito) {
    carrito = JSON.parse(localStorage.storageCarrito);
    console.log(carrito);
    let botonContinuarCompra = document.getElementById('botonContinuarCompra');
    botonContinuarCompra.innerHTML = `<button type="button" class="btn btn-info" id="botonContinuarCompra">Continuar compra</button>`;
}

if (carrito.length === 0) {
    const alertaCarritoVacio = document.getElementById('mostrarCarritoDeCompras');
    alertaCarritoVacio.innerHTML =
    `<div class="mt-3 alert alert-danger" role="alert">
        ¡Tu carrito de compras se encuentra vacio!
    </div>`;
}

function actualizarCantidad(identificador, operacion) {
    let producto = carrito.find((producto) => producto.id === identificador);
    if (operacion === 'suma') {
        producto.cantidadCompra += 1; 
    } else {
        producto.cantidadCompra -= 1;
    }
    limpiarPantalla();
    actualizarPantalla();
    localStorage.setItem('storageCarrito', JSON.stringify(carrito));
}

function renderizarCarrito() {
    let carritoHTML = '';
    let calcularTotal = 0;
    for (const [index, item] of carrito.entries()) {
        const precioProducto = item.cantidadCompra * item.precio;
        calcularTotal += precioProducto;
        carritoHTML += 
        `<tr>
            <th scope="row">${index+1}</th>
            <td>${item.nombre}</td>
            <td>
                <button class="button-incremento-decremento decrementoProducto" onclick="actualizarCantidad(${item.id}, 'resta')" type="button">-</button>
                <label>${item.cantidadCompra}</label>
                <button class="button-incremento-decremento incremento-producto" onclick="actualizarCantidad(${item.id}, 'suma')" type="button">+</button>
            </td>
            <td>${precioProducto}</td>
        </tr>`
    }
    return { carritoHTML: carritoHTML, totalCompra: calcularTotal };
}

function limpiarPantalla() {
    const mostrarCarrito = document.getElementById('tablaCarrito');
    mostrarCarrito.textContent = '';
    totalPedido = document.getElementById('totalPedido');
    totalPedido.textContent = '';
}

function actualizarPantalla() {
    const respuesta = renderizarCarrito();
    cartList = respuesta.carritoHTML;
    const mostrarCarrito = document.getElementById('tablaCarrito');
    mostrarCarrito.innerHTML = cartList;
    totalPedido = document.getElementById('totalPedido');
    console.log('imprimiendo card list');
    totalPedido.innerHTML = `${respuesta.totalCompra}`;
}

actualizarPantalla();


