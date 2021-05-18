// VARIABLES
let productos = [];
let carrito = [];
let storageValores = localStorage.storageCarrito;

let categoriaIngredientes = 'ingredientes';
let categoriaDecoracion = 'decoracion';

let tabIngredientes = document.getElementById('ingredientes-tab');
let tabDecoracion = document.getElementById('decoracion-tab');

let seccionIngredientes = document.getElementById('seccionIngredientes');
let seccionDecoracion = document.getElementById('seccionDecoracion');

// Inicializar DATA
function buscarProductosEnBaseDeDatos() {
    let productosBD = [];
    $.ajax({
        async: false,
        global: false,
        url: "base-de-datos/productos.json",
        dataType: "json",
        success: (data) => {
            productosBD = data;
        },
        error: (error) => {
            console.log('Error AJAX: ', error);
        }
    });
    return productosBD;
}

productos = buscarProductosEnBaseDeDatos();

// FUNCION PARA MOSTRAR LAS CARDS 
function mostrarProductos(categoria){
    let cards = "";
    let productosAMostrar = productos.filter(elemento => elemento.categoria === categoria);
    productosAMostrar.forEach(element => {
        cards += `
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 text-center mt-5">
            <div class="card mb-3">
                <img src=${element.imagen} class="card-img-top propiedades-card" alt="${element.nombre}">
                <div class="card-body">
                    <h6 class="card-title">${element.nombre}</h6>
                    <p class="card-text">${element.descripcion}</p>
                    <p class="card-text">CLP ${element.precio}</p>
                    <button type="submit" class="btn btn-info" onclick="identificarId(${element.id})">Agregar al carrito</a>
                </div>
            </div>
        </div>`;
    });
    return cards;
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

// FUNCION PARA MOSTRAR SECCION SELECCIONADA
function renderizarSeccion(seccion, categoria) {
    seccion.innerHTML = mostrarProductos(categoria);
}

// LLAMAR FUNCIONES 
renderizarSeccion(seccionIngredientes, categoriaIngredientes);
validarLocalStorage();

// IDENTIFICA ID DEL PRODUCTO Y AGREGA EL ID CARRITO
function identificarId(identificadorProducto) {
    console.log('id: ' + identificadorProducto);
    const productoBuscado = productos.find((producto) => producto.id === identificadorProducto);
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

function eventoClick(tab, seccion, nombreCategoria) {
    tab.addEventListener("click", function(){
        seccion.innerHTML = mostrarProductos(nombreCategoria);
    });
}

//EVENTOS SECCION "INSUMOS DE REPOSTERIA"
eventoClick(tabIngredientes, seccionIngredientes, categoriaIngredientes);
eventoClick(tabDecoracion, seccionDecoracion, categoriaDecoracion);
