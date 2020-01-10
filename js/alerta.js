//Só carrega quando o HTML estiver pronto.
//window.onload = function() {
$(document).ready(function() {
    var botao = document.getElementById("btn_ok");



    botao.onclick = function() {
        $("#form_alerta").hide();
        //console.log("Alô mundo!");
        //window.location.href = "index.html";
    }

});