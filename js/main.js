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
const carrito=[];
let totalCarrito = 0;
let cantidadCompra = 0;
let cardList = "";
const seccionIngredientes = [];
let producto = "";

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
                        <input id="cantidadProducto-${producto.id}" value="${producto.cantidadCompra}" type="number" class="input-cantidad text-center" min="1" max="${producto.stock}">
                        <button type="submit" class="btn btn-info" onclick="agregarProductoAlCarrito(${producto.id})">Agregar al carrito</a>
                    </div>
                </div>
            </div>`;
        }
    }
}

inicializarDatos();
renderizarProductos();
document.getElementById('ingredientes').innerHTML = cardList;

// BUSCAR PRODUCTO (STOCK) Y AGREGAR AL CARRITO 

function agregarProductoAlCarrito(identificadorProducto) {
    console.log('mi id es: ' + identificadorProducto);
    const inputContador = `cantidadProducto-${identificadorProducto}`;
    if(document.getElementById(inputContador).value >= 1) {
        console.log('la cantidad es mayor a 1');
        document.getElementById('alertaAgregarProductoAlCarrito').innerHTML = 
            `<div class="mt-3 alert alert-success" role="alert">
                ¡Se ha agregado un producto al carrito de compras! El total a pagar es CLP ${totalCarrito}.
            </div>`;
    } else {
        document.getElementById('alertaAgregarProductoAlCarrito').innerHTML = 
            `<div class="alert alert-danger" role="alert">
                Para agregar el producto al carrito la cantidad del producto debe ser mayor o igual a 1
            </div>`;
    }
}
