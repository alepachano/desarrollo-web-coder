// Evento jQuery al seleccionar el input

$(document).ready(function(){
    $(".form-control").focus(function(){
        $(this).css("background-color", "#dbfdff");
    });

    $(".form-control").blur(function(){
        $(this).css("background-color", "white");
    });
});
