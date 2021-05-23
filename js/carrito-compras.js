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
    let botonIncremento = document.getElementById("incremento");
    let botonDecremento = document.getElementById("decremento");
    const alerta = document.getElementById('alerta');
    if (operacion === 'suma') {
        if (producto.cantidadCompra < 20) {
            producto.cantidadCompra += 1; 
            console.log('se suma');
        } else {
            botonIncremento.disabled = true;
            console.log('se deshabilita boton de incremento');
            alerta.innerHTML =
            `<div class="mt-2 alert alert-danger" role="alert">
                ¡Puedes ingresar máximo 20 unidades por producto!
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`;
        }
    } else {
        if (producto.cantidadCompra === 1) {
            botonDecremento.disabled = true;
            console.log('se deshabilita boton de decremento');
            alerta.innerHTML =
            `<div class="mt-2 alert alert-danger" role="alert">
                ¡La cantidad mínima por producto es 1!
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`;
        } else {
            producto.cantidadCompra -= 1;
            console.log('se resta');
        }
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
                <button class="button-incremento-decremento decrementoProducto" id="decremento" onclick="actualizarCantidad(${item.id}, 'resta')" type="button">-</button>
                <label class="labelCantidad">${item.cantidadCompra}</label>
                <button class="button-incremento-decremento incremento-producto" id="incremento" onclick="actualizarCantidad(${item.id}, 'suma')" type="button">+</button>
            </td>
            <td>${precioProducto}</td>
            <td><button class="deleteItem" onclick="eliminarProducto(${index})">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </button></td>
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

function eliminarProducto(item) {
    carrito.splice(item, 1);
    localStorage.setItem('storageCarrito', JSON.stringify(carrito));
    limpiarPantalla();
    actualizarPantalla();
    if (carrito.length === 0) {
        const alertaCarritoVacio = document.getElementById('mostrarCarritoDeCompras');
        alertaCarritoVacio.innerHTML =
        `<div class="mt-3 alert alert-danger" role="alert">
            ¡Tu carrito de compras se encuentra vacio!
        </div>`;
    };
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
