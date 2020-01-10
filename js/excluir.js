//Só carrega quando o HTML estiver pronto.
//window.onload = function(){
$(document).ready(function() {
    if (window.indexedDB) {
        var iCodigo = parseInt(getUrlParameter("codigo"));
        var db = null;
        var objBanco = window.indexedDB.open("CadastroApp", 1);
        objBanco.onsuccess = function(evento) {
            console.log("Conexão realizada com sucesso!");
            db = evento.target.result;



            console.log(iCodigo);


        };

        //Atualizar no banco de dados
        $("#btn_Nao").click(function() {
            window.location.href = "index.html";
        });

        $("#btn_Sim").click(function() {

            var tx = db.transaction(["cadastro"], "readwrite");
            var cadastroStore = tx.objectStore("cadastro");
            cadastroStore.delete(iCodigo);
            window.location.href = "index.html";
        });
    }
});