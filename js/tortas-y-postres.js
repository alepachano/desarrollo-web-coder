// VARIABLES
let productos = [];

let categoriaTortasClasicas = 'tortas-clasicas';
let categoriaTortasPremium = 'tortas-premium';
let categoriaPostres = 'candybar'; 

let tortasClasicas = document.getElementById('tortasClasicas-tab');
let tortasPremium = document.getElementById('tortasPremium-tab');
let postresCandybar = document.getElementById('postresCandybar-tab');

let seccionTortasClasicas = document.getElementById('tortasClasicas');
let seccionTortasPremium = document.getElementById('tortasPremium');
let seccionPostresCandybar = document.getElementById('postresCandybar');

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
            console.log('Error AJAX: ', error)
        }
    });
    return productosBD;
}

productos = buscarProductosEnBaseDeDatos();

// FUNCION CARDS 
function renderizarProductos(categoria){
    let cards = "";
    let productosAMostrar = productos.filter(elemento => elemento.categoria === categoria);
    productosAMostrar.forEach(element => {
        cards += `
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 text-center">
            <div class="card mb-5">
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

// MOSTRAR PAGINA
function renderizarSeccion(categoria){
    seccionTortasClasicas.innerHTML = renderizarProductos(categoria);
}

// EVENTOS
tortasClasicas.addEventListener("click", function(){
    seccionTortasClasicas.innerHTML = renderizarProductos(categoriaTortasClasicas);
});

tortasPremium.addEventListener("click", function(){
    seccionTortasPremium.innerHTML = renderizarProductos(categoriaTortasPremium);
});

postresCandybar.addEventListener("click", function(){
    seccionPostresCandybar.innerHTML = renderizarProductos(categoriaPostres);
});

renderizarSeccion(categoriaTortasClasicas);
