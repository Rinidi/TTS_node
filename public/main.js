$(document).ready(function(){
    $('.btn_cadastrar').on('click',function(){
      var jsonObjeto = [{comentario:$('#text-area').val()}];
        $.ajax({
          url: '/send', //selecionando o endereço que iremos acessar no backend
          type: 'POST', //selecionando o tipo de requesição, PUT,GET,POST,DELETE
          dataType: "json",//Tipo de dado que será enviado ao servidor
          data: {itens: JSON.stringify(jsonObjeto) },
          sucess: function(){
          },
          error: function(err){
            console.log(err);
          }
        }).done(function(){
          console.log('Dados enviados');
        });
    });
  });