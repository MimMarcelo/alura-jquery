$("#btnTrocarFrase").click(fraseAleatoria);

function fraseAleatoria(){
    $.get(
        "http://localhost:3000/frases",
        trocaFrase
    );
}

function trocaFrase(data) {
    var random = Math.floor(Math.random()*data.length);
    frase.text(data[random].texto);
    setTamanhoFrase(frase.text());
    setTempo(data[random].tempo);
}
