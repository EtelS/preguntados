/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });
  this.modelo.preguntaEliminada.suscribir(function(){
    contexto.reconstruirLista();
  });
  this.modelo.preguntaEditada.suscribir(function(){
    contexto.reconstruirLista();
  });
  this.modelo.preguntaBorrarTodo.suscribir(function(){
    contexto.reconstruirLista();
  });
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    this.reconstruirLista();
    this.configuracionDeBotones();
    validacionDeFormulario();
  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    var nuevoItem=nuevoItem = $('<li>', { 'class': 'list-group-item', 'id': pregunta.id, 'textoPregunta': pregunta.textoPregunta })
     //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      console.log("resp", resp);
      return " " + resp.respuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      var respuestas = [];

      $('[name="option[]"]').each(function() {
        if ($(this).val() != false) {
          let respuestaObj = { respuesta: $(this).val(), cantidad: 0 };
          console.log("respuestaObj",respuestaObj);//aca va bien
          respuestas.push(respuestaObj);
      }
      })
      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });
    //asociar el resto de los botones a eventos
    e.botonBorrarPregunta.click(function(){
      console.log ($('.list-group-item.active').attr('id'));
      let id= parseInt($('.list-group-item.active').attr('id'));
      console.log('entre al borrar', id);
      contexto.controlador.borrarPregunta(id);
    });
    e.botonEditarPregunta.click(function(){
      let id= parseInt($('.list-group-item.active').attr('id'));
      console.log (id);
      if (!isNaN(id)){
        let editada= prompt("Re escriba la pregunta: ");
        console.log(editada, "editada en vistaadministrador.js")
        contexto.controlador.editarPregunta (id, editada);
        }
        else{
          alert("Elija una pregunta para editar");
        }
    });
    e.borrarTodo.click(function(){
      contexto.controlador.borrarTodasLasPreguntas();
    })
  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
