let storageValores = localStorage.storageCarrito;
let carrito = [];
let formulario = document.getElementById('formulario');
let inputForm = $(".form-control");
let iconCarrito = $("#iconoCarrito");

// FUNCION PARA MOSTRAR CANTIDAD DE PRODUCTOS EN EL ICONO DE CARRITO DE COMPRAS, SEGUN LOCAL STORAGE Y CARRITO.LENGTH
const validarLocalStorage = () => {
    if(storageValores === undefined) {
        carrito = [];
    } else {
        carrito = JSON.parse(storageValores);
    }
}

// Evento usando jQuery al seleccionar el input
$(document).ready(function() {
    inputForm.focus(function() {
        $(this).css("background-color", "#dbfdff");
    });

    inputForm.blur(function() {
        $(this).css("background-color", "white");
    });
});

// VALIDACION AL HACER CLICK EN EL BUTTON TYPE SUBMIT "ENVIAR"
let botonEnviar = document.getElementById('enviarFormulario');
botonEnviar.addEventListener("click", function() {
    let formulario = {
    nombre: document.getElementById('txtNombre').value,
    apellido: document.getElementById('txtApellido').value,
    telefono: document.getElementById('txtTelefono').value,
    correo: document.getElementById('correo').value,
    region: document.getElementById('region').value,
    comuna: document.getElementById('comuna').value,
    mensaje: document.getElementById('mensaje').value
    }
    validarCamposTexto(formulario);
});

// FUNCION PARA MODAL DE BOTON 
function mostrarModal() {
    $("#miModal").modal("show");
}

// ALERTAS DE VALIDACION
function enviarAlertaExitoso() {
    let alertaFormulario = document.getElementById('alertaFormulario');
    alertaFormulario.innerHTML = 
    `<div class="alert alert-success mt-2" role="alert">
        ¡Se han ingresado correctamente sus datos!
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>`;
}

function enviarAlertaError(campoFormulario) {
    let alertaFormulario = document.getElementById('alertaFormulario');
    alertaFormulario.innerHTML = 
    `<div class="alert alert-danger alert-dismissible fade show mt-2" role="alert">
        Estimado usuario: debe ingresar informacion correcta en el campo <strong>${campoFormulario}</strong>.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>`;
}

// VALIDACION DE CAMPOS DE FORMULARIO
function validarCamposTexto(formulario) {
    if ((formulario.nombre.trim() == null) || (formulario.nombre.trim().length === 0)) {
        enviarAlertaError('nombre');
    } else if ((formulario.apellido.trim() == null) || (formulario.apellido.trim().length === 0)) {
        enviarAlertaError('apellido');
    } else if ((formulario.telefono.trim() == null) || (formulario.telefono.trim().length != 9) || (isNaN(formulario.telefono))) {
        enviarAlertaError('teléfono');
    } else if ((formulario.correo.trim() == null) || (formulario.correo.trim().length === 0) || (formulario.correo.indexOf('@') === -1) || formulario.correo.indexOf('.com') === -1) {
        enviarAlertaError('correo');
    } else if (formulario.region === 'Selecciona') {
        enviarAlertaError('region');
    } else if (formulario.comuna === 'Selecciona') {
        enviarAlertaError('comuna');
    } else if ((formulario.mensaje.trim() == null) || (formulario.mensaje.trim().length === 0)) {
        enviarAlertaError('mensaje');
    } else {
        enviarAlertaExitoso();
        mostrarModal();
        form.reset();
    }
}

validarLocalStorage();
