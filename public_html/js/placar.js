var placar = $("#placar");

$("#btnPlacar").click(mostrarPlacar);
$("#btnSincronizar").click(sincronizarPlacar);
atualizarPlacar();

function mostrarPlacar(){
    placar.stop().slideToggle();
}

function scrollPlacar(){
    placar.slideDown(500);
    var posicao = placar.offset().top;
    $("html, body").animate(
    {
        scrollTop: posicao
    }, 1000);
}

function inserirPlacar(){
    var corpoDaTabela = placar.find("tbody");
    var usuario = "Marcelo Júnior";
    var n = contadorDePalavras.text();

    corpoDaTabela.prepend(novaLinhaDoPlacar(usuario, n));
    scrollPlacar();
}

function removerItemDoPlacar(){
    $(this).parent().parent().fadeOut(1000);
    setTimeout(function(){
        $(this).parent().parent().remove();
    }, 1000);
}

function novaLinhaDoPlacar(nomeUsuario, nPalavras){
        var linha = $("<tr>");
        var tdUsuario = $("<td>");
        var tdN = $("<td>");
        var tdRemover = $("<td>");
        var btnRemover = $("<buttom>");

        $(btnRemover).addClass("material-icons");
        $(btnRemover).text("delete");
        $(btnRemover).click(removerItemDoPlacar);

        $(tdUsuario).text(nomeUsuario);
        $(tdN).text(nPalavras);
        $(tdRemover).append(btnRemover);

        linha.append(tdUsuario);
        linha.append(tdN);
        linha.append(tdRemover);
        return linha;
}

function sincronizarPlacar(){
    var json = [];
    var linhas = placar.find("tbody tr");
    linhas.each(function(){
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();
        var score = {"usuario": usuario, "pontos": palavras};
        json.push(score);
    });
    console.log(json);
    // console.log(linhas);
    var dados = {"placar": json};
    $.post("http://localhost:3000/placar", dados);
}

function atualizarPlacar(){
    $.get("http://localhost:3000/placar", function(data){
        $(data).each(function() {
            var linha = novaLinhaDoPlacar(this.usuario, this.pontos);
            var corpoDaTabela = placar.find("tbody");
            corpoDaTabela.prepend(linha);
        });
    });
}
