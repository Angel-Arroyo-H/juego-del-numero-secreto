let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = generarNumeroAleatorio();
let intentos = 1;

function exibirTextoEnLaPantalla(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'es-US'; 
        utterance.rate = 1.1; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensajeInicial() {
    exibirTextoEnLaPantalla('h1', 'Juego del número secreto');
    exibirTextoEnLaPantalla('p', `Digite un número entre 1 y ${numeroLimite}`);
}

exibirMensajeInicial();

function verificarCorazonada() {
    let corazonada = document.querySelector('input').value;
    
    if (corazonada == numeroSecreto) {
        exibirTextoEnLaPantalla('h1', 'Ganaste!');
        let palabraIntento = intentos > 1 ? 'intentos' : 'intento';
        let mensajeIntentos = `Descubriste el número secreto en ${intentos} ${palabraIntento}!`;
        exibirTextoEnLaPantalla('p', mensajeIntentos);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (corazonada > numeroSecreto) {
            exibirTextoEnLaPantalla('p', 'El número secreto es menor');
        } else {
            exibirTextoEnLaPantalla('p', 'El número secreto es mayor');
        }
        intentos++;
        limpiarCampo();
    }
}

function generarNumeroAleatorio() {
    let numeroGenerado = parseInt(Math.random() * numeroLimite + 1);
    let cantidadDeElementosEnLaLista = listaDeNumerosSorteados.length;

    if (cantidadDeElementosEnLaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroGenerado)) {
        return generarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroGenerado);
        console.log(listaDeNumerosSorteados)
        return numeroGenerado;
    }
}

function limpiarCampo() {
    corazonada = document.querySelector('input');
    corazonada.value = '';
}

function reiniciarJuego() {
    numeroSecreto = generarNumeroAleatorio();
    limpiarCampo();
    intentos = 1;
    exibirMensajeInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}







