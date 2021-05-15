// Objetos
class Producto {
    constructor(id, nombre, descripcion, precio, imagen, stock, cantidadCompra) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = imagen;
        this.stock = stock;
        this.cantidadCompra = cantidadCompra;
    }

    calcularPrecio() {
        return this.precio * this.cantidadCompra;
    }
}

// Variables
const seccionIngredientes = [];
let cardList = "";
let producto = "";
let carrito = [];
let storageValores = localStorage.storageCarrito;

// Cargar datos de productos que vende Planeta Deli en la sección Insumos de Repostería - Ingredientes
function inicializarDatos() {
    seccionIngredientes.push(new Producto (1, "Harina c/polvos", "10 unidades x 1Kg", 9000, "./imagenes/harina.jpg", 100, 0));
    seccionIngredientes.push(new Producto (2, "Mantequilla s/sal", "12 unidades x 250g", 20000, "./imagenes/mantequilla.jpg", 200, 0));
    seccionIngredientes.push(new Producto (3, "Chips de chocolate", "12 unidades x 200g", 8000, "./imagenes/chips-chocolate.jpg", 40, 0));
    seccionIngredientes.push(new Producto (4, "Chocolate Caravella", "10 unidades x 1Kg", 9000, "./imagenes/cobertura.jpg", 20, 0));
    seccionIngredientes.push(new Producto (5, "Pack de esencias", "4 unidades x 400ml", 7000, "./imagenes/esencia.jpg", 10, 0));
    seccionIngredientes.push(new Producto (6, "Manjar", "20 unidades x 100g", 12500, "./imagenes/manjar.jpg", 50, 0));
    seccionIngredientes.push(new Producto (7, "Chocolate Callebaut", "10 unidades x 1Kg", 10000, "./imagenes/callebaut.jpg", 25, 0));
    seccionIngredientes.push(new Producto (8, "Nutella", "Presentación de 3 kg", 12000, "./imagenes/nutella.jpg", 55, 0));
}

// CARDS
function renderizarProductos() {
    for (let i=0; i<seccionIngredientes.length; i++) {
        const producto = seccionIngredientes[i]; 
        if (producto.stock > 0) {
            cardList += `
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 text-center">
                <div class="card mb-5">
                    <img src=${producto.imagen} class="card-img-top propiedades-card" alt="${producto.nombre}">
                    <div class="card-body">
                        <h6 class="card-title">${producto.nombre}</h6>
                        <p class="card-text">${producto.descripcion}</p>
                        <p class="card-text">CLP ${producto.precio}</p>
                        <button type="submit" class="btn btn-info" onclick="identificarId(${producto.id})">Agregar al carrito</a>
                    </div>
                </div>
            </div>`;
        }
    }
}

// VALIDAR LOCAL STORAGE
const validarLocalStorage = () => {
    if(storageValores === undefined) {
        carrito = [];
        console.log('el storage se encuentra vacio');
    } else {
        carrito = JSON.parse(storageValores);
        console.log('Local storage: ', carrito);
    }
}

inicializarDatos();
renderizarProductos();
const ingredientes = document.getElementById('ingredientes');
ingredientes.innerHTML = cardList;
validarLocalStorage();

// IDENTIFICA ID DEL PRODUCTO Y AGREGA EL ID CARRITO
function identificarId(identificadorProducto) {
    console.log('id: ' + identificadorProducto);
    const productoBuscado = seccionIngredientes.find((producto) => producto.id === identificadorProducto);
    agregarAlCarrito(productoBuscado);
    const alerta = document.getElementById('alertaAgregarAlCarrito');
    alerta.innerHTML = 
        `<div class="mt-3 alert alert-success" role="alert">
            ¡Se ha agregado un producto al carrito de compras!
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`;
}

// VALIDAR SI EL PRODUCTO DEL CARRITO SE REPITE
function validarProductoCarrito (identificadorProducto) {
    const producto = carrito.find((item) => item.id === identificadorProducto);
    return producto;
}

// AGREGAR AL CARRITO
function agregarAlCarrito(producto) {
    const productoCarrito = validarProductoCarrito(producto.id);
    console.log('validando si existe en el carrito: ', productoCarrito);
    if (productoCarrito) {
        productoCarrito.cantidadCompra += 1; 
        console.log('carrito: ', carrito);
        localStorage.setItem('storageCarrito', JSON.stringify(carrito));
    } else {
        producto.cantidadCompra = 1;
        carrito.push(producto);
        console.log('carrito: ', carrito);
        localStorage.setItem('storageCarrito', JSON.stringify(carrito));
    }
}
