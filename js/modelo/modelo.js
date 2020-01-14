/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.preguntaBorrarTodo = new Evento(this);
  this.sumarVotoRespuesta = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    var id;
    var totPreguntas= this.preguntas.length
    totPreguntas >0 ? id=totPreguntas :id= 0;
    return id;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    console.log("agregar Pregunta", respuestas);
    var id = this.obtenerUltimoId();
    id++;
    console.log('agregar pregunta', id);
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  borrarPregunta: function(id){
    var idBorrar= this.preguntas.map(pregunta => pregunta.id).indexOf(id); //busco el id la pregunta que voy a borrar y lo guardo en la variable
    this.preguntas.splice(idBorrar, 1);
    this.guardar();
    this.preguntaEliminada.notificar();
  },
  
  
  votar: function(pregunta, respuesta){

    if(respuesta!==undefined){
      const preguntaEncontrada = this.preguntas.find(Element => Element.textoPregunta === pregunta);
      // console.log(preguntaEncontrada)
      var index = this.preguntas.indexOf(preguntaEncontrada);
      if (index > -1) {
        const respuestaEncontrada = this.preguntas[index].cantidadPorRespuesta.find(Element => Element.textoRespuesta === respuesta);
  
        // console.log(respuestaEncontrada)
        respuestaEncontrada.cantidad++;
    this.sumarVotoRespuesta.notificar();
    this.guardar;
                   }
                                        }
                                        },

  editarPregunta: function(id, editada){
    this.preguntas.forEach(function(element){
      if (element.id===id){
        console.log(element.id,"element.id en modelo.js");
        console.log(id,"id");
        console.log(editada, "editada");
        element.textoPregunta=editada;
      }
    });
    this.guardar();
    this.preguntaEditada.notificar();
    console.log(this.preguntas,"this.preguntas");

  },

  borrarTodasLasPreguntas: function(){
     this.preguntas=[];
     this.guardar();// llamando a esta funcion aca no se vuelve a mostrar las preguntas de usuario a admin que quedaban en local storage
     this.preguntaBorrarTodo.notificar();
    
  },
  guardar: function(){
    localStorage.setItem("preguntas", JSON.stringify(this.preguntas));
  },

  cargarPreguntas: function(){ // hay que inicializarlo en la vista administrador asi se cargan las preguntas guardadas
    var preguntasGuardadas = JSON.parse(localStorage.getItem("preguntas"));
    if (preguntasGuardadas !== null){
      this.preguntas = preguntasGuardadas;
    }
  }
};
