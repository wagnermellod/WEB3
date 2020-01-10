$(document).ready(function() {
    var db = null;
    var tx;
    var cadastroStore;
    var objBanco;
    var request;
    var v_cadastro;

    var btn_salvar = document.getElementById("btn_salvar");
    var btn_cancelar = document.getElementById("btn_cancelar");
    var txt_nome = document.getElementById("txt_nome");
    var txt_sobrenome = document.getElementById("txt_sobrenome");
    var txt_email = document.getElementById("txt_email");
    var txt_usuario = document.getElementById("txt_usuario");
    var txt_senha = document.getElementById("txt_senha");
    var txt_conf_senha = document.getElementById("txt_conf_senha");
    var tbl_lista = document.getElementById("list");

    var btn_ok = document.getElementById("btn_ok");
    var txt_alerta = document.getElementById("txt_alerta");
    var tbl_lista = document.getElementById("userList");
    var btn_editar = document.getElementById("btn_editar");

    if (window.indexedDB) {
        var v_dados = [];
        objBanco = window.indexedDB.open("CadastroApp", 1);
        objBanco.onsuccess = function(evento) {
            console.log("Conexão realizada com sucesso!");
            db = evento.target.result;
            tx = db.transaction(["cadastro"], "readwrite");
            cadastroStore = tx.objectStore("cadastro");
            request = cadastroStore.openCursor();
            request.onerror = function(evento) {
                console.log("Erro na consulta");
            }


            objBanco.onerror = function(evento) {
                console.log("Erro na conexão com banco de dados");
            }

            objBanco.onupgradeneeded = function(evento) {
                db = evento.target.result;
                var objCadastro = db.createObjectStore("cadastro", { keyPath: "codigo", autoIncrement: true });
            }

            request.onsuccess = function(evento) {
                var cursor = evento.target.result;

                if (cursor) {

                    var linha = tbl_lista.insertRow(-1);
                    var celCodigo = linha.insertCell(0);
                    var celNome = linha.insertCell(1);
                    var celSobrenome = linha.insertCell(2);
                    var celUsuario = linha.insertCell(3);
                    var celEmail = linha.insertCell(4);
                    var celBotoes = linha.insertCell(5);

                    var cadastroDB = cursor.value;
                    celCodigo.innerHTML = cadastroDB.codigo;
                    celNome.innerHTML = cadastroDB.nome;
                    celSobrenome.innerHTML = cadastroDB.sobrenome;
                    celUsuario.innerHTML = cadastroDB.usuario;
                    celEmail.innerHTML = cadastroDB.email;
                    celBotoes.innerHTML = "<a href='editar.html?codigo=" + cadastroDB.codigo + "'><type='button' class='btn btn-primary'><i class='fas fa-edit'></button></i></a> | <a href='excluir.html?codigo=" + cadastroDB.codigo + "'><type='button' class='btn btn-danger'><i class='fas fa-user-times'></i></a>";


                    cursor.continue();

                } else {
                    console.log("sem dados");


                }

            }


        }



    }

    mensagem_erro = function(v_msg) {
        console.log('Campo ' + v_msg + ' é obrigatório');
        txt_alerta.text = 'Campo ' + v_msg + ' é obrigatório';

        $("#form_alerta").show();

    }


    $("#form_alerta").hide();

    btn_cancelar.onclick = function() {
        txt_nome.value == "";
        txt_sobrenome.value = "";
        txt_email.value = "";
        txt_usuario.value = "";
        txt_senha.value = "";
        txt_conf_senha.value = "";
        txt_nome.focus();

    }



    btn_salvar.onclick = function() {

        v_cadastro = false;
        if (txt_nome.value == "") {
            mensagem_erro('Nome');


        } else if (txt_sobrenome.value == "") {
            mensagem_erro('Sobrenome');

        } else if (txt_email.value == "") {
            mensagem_erro('Email');

        } else if (txt_usuario.value == "") {
            mensagem_erro('Usuário');

        } else if (txt_senha.value == "") {
            mensagem_erro('Senha');

        } else if (txt_conf_senha.value == "") {
            mensagem_erro('Confirmar Senha');

        } else {
            $("#form_alerta").hide();
            if (txt_senha.value != txt_conf_senha.value) {
                txt_alerta.text = 'Senha não confere, por favor, redigitar';

                $("#form_alerta").show();
            } else {
                v_cadastro = true;
            }

            //JSON
            if (v_cadastro == true) {

                tx = db.transaction(["cadastro"], "readwrite");
                cadastroStore = tx.objectStore("cadastro");
                var cadastro = {
                    nome: txt_nome.value,
                    sobrenome: txt_sobrenome.value,
                    email: txt_email.value,
                    usuario: txt_usuario.value,
                    senha: txt_senha.value
                };


                cadastroStore.put(cadastro);
                window.location.href = "index.html";
            }


        }

    }
    btn_ok.onclick = function() {
        $("#form_alerta").hide();

        if (txt_nome.value == "") {
            txt_nome.focus();


        } else if (txt_sobrenome.value == "") {
            txt_sobrenome.focus();


        } else if (txt_email.value == "") {
            txt_email.focus();

        } else if (txt_usuario.value == "") {
            txt_usuario.focus();

        } else if (txt_senha.value == "") {
            txt_senha.focus();

        } else if (txt_conf_senha.value == "") {
            txt_conf_senha.focus();

        } else {
            if (txt_senha.value != txt_conf_senha.value) {
                txt_senha.value = null;
                txt_conf_senha.value = null;
                txt_senha.focus();

            }

        }


    }

});