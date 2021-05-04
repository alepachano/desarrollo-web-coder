let carrito = [];
let cartList = "";
let totalCompra = 0;

if (localStorage && localStorage.storageCarrito) {
    carrito = JSON.parse(localStorage.storageCarrito);
    console.log(carrito);
}

if (carrito.length === 0) {
    const alertaCarritoVacio = document.getElementById('mostrarCarritoDeCompras');
    alertaCarritoVacio.innerHTML =
    `<div class="mt-3 alert alert-danger" role="alert">
        ¡Tu carrito de compras se encuentra vacio!
    </div>`;
}

for (const [index, item] of carrito.entries()) {
    console.log('probando for', item);
    console.log('probando index', index);
    const precioProducto = item.cantidadCompra * item.precio;
    totalCompra += precioProducto;
    cartList += 
    `<tr>
        <th scope="row">${index+1}</th>
        <td>${item.nombre}</td>
        <td>${item.cantidadCompra}</td>
        <td>${precioProducto}</td>
    </tr>`
}

const mostrarCarrito = document.getElementById('tablaCarrito');
mostrarCarrito.innerHTML = cartList;

totalPedido = document.getElementById('totalPedido');
totalPedido.innerHTML = `${totalCompra}`;