
var frase = $(".frase");

console.log(frase);
console.log(frase.text());

var palavras = frase.text().split(" ");

console.log(palavras);
console.log(palavras.length);

var spanTamanho = $("#tamanho");
spanTamanho.text(palavras.length);
