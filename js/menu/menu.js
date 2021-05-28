let cantidadProductosCarrito = document.getElementById('cantidadProductosCarrito');

// FUNCION PARA MOSTRAR CANTIDAD DE PRODUCTOS EN CARRITO DE COMPRAS
function numeroCarrito() {
    cantidadProductosCarrito.innerHTML = carrito.length;
};

numeroCarrito();
