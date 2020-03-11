
// * Obtém o número de palavras da frase *************************************//
var frase = $(".frase");
//console.log(frase);
//console.log(frase.text());
var palavrasFrase = frase.text().split(" ");
//console.log(palavras);
//console.log(palavras.length);
var spanTamanho = $("#tamanho");
spanTamanho.text(palavrasFrase.length);

// * Atualiza contadores da resposta *****************************************//
var contadorDeCaracteres = $("#contadorDeCaracteres");
var contadorDePalavras = $("#contadorDePalavras");

var campoDeDigitacao = $(".campoDeDigitacao");
campoDeDigitacao.on("input", function(){
    var conteudo = campoDeDigitacao.val();
    var palavras = conteudo.split(/\S+/);
    contadorDeCaracteres.text(conteudo.length);
    contadorDePalavras.text(palavras.length - 1);
});

