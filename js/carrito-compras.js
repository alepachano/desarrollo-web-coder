let carrito = [];
let cartList = "";
let totalCompra = 0;

function validarLocalStorage(){
    if (localStorage && localStorage.storageCarrito) {
        carrito = JSON.parse(localStorage.storageCarrito);
        let botonesOpcionesCarrito = $('#botonesOpcionesCarrito');
        botonesOpcionesCarrito.html(`<button type="button" class="btn btn-info" onclick="vaciarCarrito()">Vaciar carrito</button>
                                     <button type="button" class="btn btn-info" onclick="mercadoPago()">Continuar compra</button>`);
    } else if (carrito.length === 0) {
            const alertaCarritoVacio = document.getElementById('mostrarCarritoDeCompras');
            alertaCarritoVacio.innerHTML =
            `<div class="mt-3 alert alert-danger" role="alert">
                ¡Tu carrito de compras se encuentra vacio!
            </div>`;
    }
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
    if (respuesta && respuesta.carritoHTML === '') {
        return;
    }
    cartList = respuesta.carritoHTML;
    const mostrarCarrito = document.getElementById('tablaCarrito');
    mostrarCarrito.innerHTML = cartList;
    totalPedido = document.getElementById('totalPedido');
    totalPedido.innerHTML = `${respuesta.totalCompra}`;
}

function vaciarCarrito(){
    localStorage.clear();
    carrito = [];
    validarLocalStorage();
}

validarLocalStorage();
actualizarPantalla();

// API MERCADO PAGO
async function mercadoPago() {
    const items = [];
    carrito.forEach((element) => {
        items.push({
            title: element.nombre,
            description: element.descripcion,
            picture_url: element.imagen,
            category_id: element.categoria,
            quantity: element.cantidadCompra,
            currency_id: "CLP",
            unit_price: element.precio
        });
    });
    const json = {
        items: items,
    };
    console.log('items', items);

    let data = await fetch("https://api.mercadopago.com/checkout/preferences", {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer TEST-824207342989446-051521-a447416bb4ec99211f1f5dba129648dc-335000586'
        },
        body: JSON.stringify(json)
    });
    let responseMP = await data.json();
    window.open(responseMP.init_point);
}; 
