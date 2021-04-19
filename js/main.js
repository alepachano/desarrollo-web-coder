//Objetos
class Producto {
    constructor(id, nombre, descripcion, precio, stock, cantidadCompra) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.cantidadCompra = cantidadCompra;
    }

    calcularPrecio() {
        return this.precio * this.cantidadCompra;
    }
}

//Productos que vende Planeta Deli en la sección Insumos de Repostería - Ingredientes
const producto1 = new Producto (1, "Harina c/polvos", "10 unidades x 1Kg", 9000, 100, 0);
const producto2 = new Producto (2, "Mantequilla s/sal", "12 unidades x 250g", 20000, 200, 0);
const producto3 = new Producto (3, "Chips de chocolate", "12 unidades x 200g", 8000, 40, 0);
const producto4 = new Producto (4, "Cobertura de chocolate Caravella", "10 unidades x 1Kg", 9000, 20, 0);
const producto5 = new Producto (5, "Pack de esencias", "4 unidades x 400ml", 7000, 10, 0);
const producto6 = new Producto (6, "Manjar", "20 unidades x 100g", 12500, 50, 0);
const producto7 = new Producto (7, "Cobertura de chocolate Callebaut", "10 unidades x 1Kg", 10000, 25, 0);
const producto8 = new Producto (8, "Nutella", "3 kg", 12000, 55, 0);

//Variables
const carrito=[];
let totalCarrito = 0;
let pregunta = "s";
let producto = "";
let cantidadCompra = 0;

//Paso 1: Funcion BUSCAR PRODUCTO
function buscarProducto(nombre) {
    if(nombre != "") {
        switch(nombre) {
            case "1" :
                return producto1;
            case "2" :
                return producto2;
            case "3" :
                return producto3;
            case "4" :
                return producto4;
            case "5" :
                return producto5;
            case "6" :
                return producto6;
            case "7" :
                return producto7;
            case "8" :
                return producto8;
            default:
                return undefined;
        }
    } else {
        return undefined;
    }
}

//Paso 2: FUNCION VALIDAR STOCK Y AGREGAR PRODUCTO AL CARRITO
function validarStock(producto, cantidad) {
    if(producto) {
        if ((cantidad != 0) && (cantidad <= producto.stock)) {
            console.log(`Si se encuenta disponible el producto ${producto.nombre} en bodega.`);
            producto.cantidadCompra = cantidad;
            carrito.push(producto);
            console.log(`Se ha agregado un nuevo producto a tu carrito de compra: ${producto.nombre} x ${cantidadCompra} unidades`);
        } else {
            console.log(`Stock insuficiente. La cantidad disponible del producto ${producto.nombre} es ${producto.stock} unidades.`);
        }
    } else {
        alert('Debe ingresar un producto valido');
    }
}

//PASO 3: VER CARRITO
function verCarrito(){
    console.log(`Tu carrito de compra contiene ${carrito.length} producto(s)`);
    console.log('Detalle de productos del carrito de compras: ');
    for (let i=0; i<carrito.length; i++) {
        console.log(`Producto: ${carrito[i].nombre}`);
        console.log(`Cantidad: ${carrito[i].cantidadCompra}`);
        console.log(`Precio unitario: ${carrito[i].precio}`);
        const totalProducto = carrito[i].calcularPrecio();
        console.log(`Total: CLP ${totalProducto}`);
        totalCarrito += totalProducto;
    }
    console.log(`Total a pagar: CLP ${totalCarrito}`);
}

//Ingreso de informacion por parte del cliente + acumulacion de productos en el carrito
while (pregunta == "s") {
    producto = prompt('Indiqué el número de producto que desea comprar, escriba del 1 al 8');
    cantidadCompra = Number(prompt('¿Que cantidad desea comprar?'));
    const productoAComprar = buscarProducto(producto);
    validarStock(productoAComprar, cantidadCompra);
    pregunta = prompt('¿Desea agregar otro producto? Si: s No: n');
}

verCarrito();

if (totalCarrito > 0) {
    alert(`Total a pagar: CLP ${totalCarrito}. Gracias por tu compra!!!`);
} else {
    alert('¡Vuelve pronto!');
}
