// Evento jQuery al seleccionar el input

var inputForm = $(".form-control");
var iconCarrito = $("#iconoCarrito");

$(document).ready(function(){
    inputForm.focus(function(){
        $(this).css("background-color", "#dbfdff");
    });

    inputForm.blur(function(){
        $(this).css("background-color", "white");
    });
});

iconCarrito.mouseenter(function(){
    $(this).animate({
        height: "50px",
        width: "50px"
    }, 'slow')
})

iconCarrito.mouseleave(function(){
    $(this).animate({
        height: "30px",
        width: "30px"
    }, 'fast')
})
