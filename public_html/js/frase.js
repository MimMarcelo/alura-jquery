$("#btnTrocarFrase").click(fraseAleatoria);
$("#btnFraseId").click(frasePorId);

function frasePorId(){
    var fraseId = $("#fraseId").val();
    var dados = { id: fraseId};
    $("#spinner").show();
    $.get(
        "http://localhost:3000/frases",
        dados,
        function(data){
            frase.text(data.texto);
            setTamanhoFrase(frase.text());
            setTempo(data.tempo);
        }
    )
    .fail(function(){
        $("p.erro").show();
        $("p.erro").fadeOut(2000);

        setTimeout(function(){
            $("p.erro").hide();
        }, 2000);
    })
    .always(function(){
        $("#spinner").hide();
    });
}

function fraseAleatoria(){
    $("#spinner").show();
    $.get(
        "http://localhost:3000/frases",
        trocaFrase
    )
    .fail(function(){
        $("p.erro").show();
        $("p.erro").fadeOut(2000);

        setTimeout(function(){
            $("p.erro").hide();
        }, 2000);
    })
    .always(function(){
        $("#spinner").hide();
    });
}

function trocaFrase(data) {
    var random = Math.floor(Math.random()*data.length);
    frase.text(data[random].texto);
    setTamanhoFrase(frase.text());
    setTempo(data[random].tempo);
}
