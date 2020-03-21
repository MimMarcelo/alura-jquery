// * Obtém referência para os elementos da página ****************************//
var frase = $(".frase");
var spanTamanho = $("#tamanho");
var spanTempo = $("#tempo");
var contadorDeCaracteres = $("#contadorDeCaracteres");
var contadorDePalavras = $("#contadorDePalavras");
var campoDeDigitacao = $(".campoDeDigitacao");
var btnReiniciar = $("#btnReiniciar");

// * Variáveis auxiliares à lógica da aplicação ******************************//
var palavrasFrase = frase.text().split(" ");
var tempoTotal = spanTempo.text();
var tempo = 0;
var cronometro = null;

// * Configura valores e comportamentos dos elementos da página **************//
spanTamanho.text(palavrasFrase.length);

campoDeDigitacao.on("input", digitar);

btnReiniciar.on("click", reiniciar);

// * Funções da aplicação ****************************************************//

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
    var comparavel = frase.text().substr(0, conteudo.length);
    if(conteudo === comparavel){
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
