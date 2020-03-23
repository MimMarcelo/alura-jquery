// * Obtém referência para os elementos da página ****************************//
var frase = $(".frase");
var spanTempo = $("#tempo");
var contadorDeCaracteres = $("#contadorDeCaracteres");
var contadorDePalavras = $("#contadorDePalavras");
var campoDeDigitacao = $(".campoDeDigitacao");
var btnReiniciar = $("#btnReiniciar");

// * Variáveis auxiliares à lógica da aplicação ******************************//
var tempoTotal = spanTempo.text();
var tempo = 0;
var cronometro = null;

// * Configura valores e comportamentos dos elementos da página **************//
setTamanhoFrase(frase.text())

campoDeDigitacao.on("input", digitar);

btnReiniciar.on("click", reiniciar);

// * Funções da aplicação ****************************************************//

function setTamanhoFrase(frase){
    var palavrasFrase = frase.split(" ");
    $("#tamanho").text(palavrasFrase.length);
}

function setTempo(novoTempo){
    spanTempo.text(novoTempo);
    tempoTotal = novoTempo;
}

function iniciarCronometro(){
    tempo = spanTempo.text();
    cronometro = setInterval(function(){
        tempo--;
        spanTempo.text(tempo);
        if(tempo < 1){
            campoDeDigitacao.attr("disabled", true);
            encerrarCronometro();
        }
    }, 1000);
}

function encerrarCronometro(){
    clearInterval(cronometro);
    cronometro = null;
    campoDeDigitacao.addClass("campoDesabilitado");
    inserirPlacar();
}

function digitar(){
    if(cronometro === null){
        iniciarCronometro();
    }
    var conteudo = campoDeDigitacao.val();
    var palavras = conteudo.split(/\S+/);
    contadorDeCaracteres.text(conteudo.length);
    contadorDePalavras.text(palavras.length - 1);

    verificarResposta(conteudo);
}

function verificarResposta(conteudo) {
    if(frase.text().startsWith(conteudo)){
        campoDeDigitacao.addClass("sucesso");
        campoDeDigitacao.removeClass("erro");
    }
    else{
        campoDeDigitacao.addClass("erro");
        campoDeDigitacao.removeClass("sucesso");
    }
}

function reiniciar() {
    if(cronometro != null){
        encerrarCronometro();
    }
    campoDeDigitacao.removeClass("campoDesabilitado");
    campoDeDigitacao.removeClass("sucesso");
    campoDeDigitacao.removeClass("erro");
    campoDeDigitacao.attr("disabled", false);
    campoDeDigitacao.val("");
    campoDeDigitacao.focus();
    contadorDeCaracteres.text(0);
    contadorDePalavras.text(0);
    spanTempo.text(tempoTotal);
}
