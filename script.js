const diccionario = new Map([
    ["a", "ai"], 
    ["e", "enter"],
    ["i", "imes"],
    ["o", "ober"],
    ["u", "ufat"]
]);  

function inicial(){
    ocultarElemento("id_copiar");
    document.getElementById("id_text_area").focus();
}

window.onload = inicial;

function ocultarImagenCss(nombreElemento){
    document.getElementById(nombreElemento).style.backgroundImage = "none";
}

function MostrarImagenCss(nombreElemento){
    document.getElementById(nombreElemento).style.backgroundImage = "url('./imagenes/Muneco.png')";
}

function mostrarElemento(nombreElemento) {
    document.getElementById(nombreElemento).style.visibility = "visible";
}

function ocultarElemento(nombreElemento) {
    document.getElementById(nombreElemento).style.visibility = "hidden";
}

function validacionCampo(cadena) {
    return cadena === "" ? true : false;
}

function valorCampoTexto(nombreElemento, valor) {
    document.getElementById(nombreElemento).value = valor; 
}

function deshabilitarElemento(nombreElemento) {
    document.getElementById(nombreElemento).disabled = true;
}

function habilitarElemento(nombreElemento) {
    document.getElementById(nombreElemento).disabled = false;
}

function soloLetras(e) {
    key = e.keyCode || e.which;

    tecla = String.fromCharCode(key).toLowerCase();
    
    

    especiales = [32,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122];
  
    tecla_especial = false
    for(var i in especiales) {
        if(key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }
    if(tecla_especial) {
        desbloquea();
    } else {
        alert("Solo se aceptan letras minúsculas y sin acentos")
        return false;
    }
}

function desbloquea(){
    habilitarElemento("id_btn_encriptar");
    habilitarElemento("id_btn_desencriptar");
}

function encriptarCadena(cadena) {
    var cadenaCompleta = "";
    for(var i=0; i < cadena.length; i++){
        cadenaCompleta = cadenaCompleta + recorreDiccionario(cadena.charAt(i));
    }
    return cadenaCompleta;
}

function recorreDiccionario(letra) {
    resultado = diccionario.get(letra);
    if (typeof resultado === 'undefined') {
        resultado = letra;
    }
    return resultado;
}

function recorrePalabraDesencriptar(palabra){
    for (var [key, value] of diccionario) {
        var bloqueCadena = palabra.split(value);
        for(i = 0; i<bloqueCadena.length; i++) {
            palabra = palabra.replace(value, key);
        }
    }
    return palabra;
}

function copy() {
    let copyText = document.querySelector("#id_mensaje");
    copyText.select();
    document.execCommand("copy");
    valorCampoTexto("id_text_area", "");
    document.getElementById("id_text_area").focus();
}

function funcionEncriptar() {
    valorCampoTexto("id_mensaje" , "");
    
    var cadenaEncriptar = document.getElementById("id_text_area").value; 
    
    if(validacionCampo(cadenaEncriptar)) {
        mostrarElemento("imagen_muneco");
        mostrarElemento("mensaje_muneco");
        ocultarElemento("id_copiar");
    } else {
        resultadoEncriptado = cadenaEncriptar.toLowerCase();
        resultadoEncriptado = encriptarCadena(resultadoEncriptado);
        valorCampoTexto("id_mensaje" , resultadoEncriptado);
        ocultarImagenCss("id_mensaje");
        mostrarElemento("id_copiar");
        ocultarElemento("imagen_muneco");
        ocultarElemento("mensaje_muneco");
    }
}

function funcionDesencriptar() {
    var cadenaDesencriptar = document.getElementById("id_mensaje").value; 

    if (validacionCampo(cadenaDesencriptar)) {
        cadenaDesencriptar = document.getElementById("id_text_area").value;
    }

    if(validacionCampo(cadenaDesencriptar)) {
        MostrarImagenCss("id_mensaje");
    } else {
        var palabraDesencriptada = recorrePalabraDesencriptar(cadenaDesencriptar);
        valorCampoTexto("id_mensaje" , palabraDesencriptada);
        mostrarElemento("id_mensaje");
        ocultarImagenCss("id_mensaje");
        mostrarElemento("id_copiar");
    }
}