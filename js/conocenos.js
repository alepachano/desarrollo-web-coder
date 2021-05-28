let storageValores = localStorage.storageCarrito;
let carrito = [];

// FUNCION PARA MOSTRAR CANTIDAD DE PRODUCTOS EN EL ICONO DE CARRITO DE COMPRAS, SEGUN LOCAL STORAGE Y CARRITO.LENGTH
const validarLocalStorage = () => {
    if(storageValores === undefined) {
        carrito = [];
    } else {
        carrito = JSON.parse(storageValores);
    }
}

validarLocalStorage();
