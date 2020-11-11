function requerido(input) {
    // let elemento = document.getElementById("nombre");
    if (input.value != "") {
        input.className = "form-control is-valid";
        return true;
    } else {
        input.className = "form-control is-invalid";
        return false;
    }
}

function revisaremail(input) {
    let expresionRegular = /\w+@\w+\.+[a-z]/
    if (input.value != "" && expresionRegular.test(input.value)) {
        input.className = "form-control is-valid";
        return true;
    } else {
        input.className = "form-control is-invalid";
        return false;
    }
}

function revisartelefono(input) {
    if (input.value != "" && !isNaN(input.value)) {
        input.className = "form-control is-valid";
        return true;
    } else {
        input.className = "form-control is-invalid";
        return false;
    }
}

function revisarpedido(pedido) {
    if (pedido.value.length >= 10) {
        pedido.className = "form-control is-valid";
        return true;
    } else {
        pedido.className = "form-control is-invalid";
        return false;
    }
}

// agragr un evento a un objeto html
let checkTerminos = document.getElementById("terminos");
// este metodo tiene 2 parametros, el primero, frente a que evento actua,
//el segundo, cual function.
checkTerminos.addEventListener("change", revisarterminos)
function revisarterminos() {
    if (checkTerminos.checked) {
        checkTerminos.className = "form-check-input is-valid";
        return true;
    } else {
        checkTerminos.className = "form-check-input is-invalid";
        return false;
    }
}

function validarGeneral() {
    event.preventDefault();
    console.log("desde la funcion validar general" + event);
    if (requerido(document.getElementById("nombre")) &&
        revisaremail(document.getElementById("email")) &&
        revisartelefono(document.getElementById("telefono")) &&
        revisarpedido(document.getElementById("pedido")) &&
        revisarterminos()) {
        enviarEmail();
    } else {
        document.getElementById("msjEnvio").className = "alert alert-danger my-4";
        document.getElementById("msjEnvio").innerText = "Ocurrio un error en el envio";
    }
}

function enviarEmail() {
    let template_params = {
        from_name: document.getElementById("nombre").value,
        to_name: "Administrador",
        message_html: `Telefono: ${document.getElementById("telefono").value} - 
        Email: ${document.getElementById("email").value} - 
        Consulta/Pedido: ${document.getElementById("pedido").value}`
    }

    let service_id = "default_service";
    let template_id = "template_MeHMf7Af";
    emailjs.send(service_id, template_id, template_params).then(
       function(response) {
       // esto se ejecutara si se envio el mail correctamente
       console.log(response);
       document.getElementById("msjEnvio").className = "alert alert-warning my-4";
       document.getElementById("msjEnvio").innerText = "Su consulta fue enviada";
       },
       // dentro de los() ponemos lo que quiero que se ejecute "entomces"
       // nosotros pusimos una "funcion anonima", al no tener nombre, solo funciona donde estay no se la puede llamar
       function(error){
        console.log("error", error);
        document.getElementById("msjEnvio").className = "alert alert-danger my-4";
        document.getElementById("msjEnvio").innerText = "Ocurrio un error en el envio";
        }
    );  
}