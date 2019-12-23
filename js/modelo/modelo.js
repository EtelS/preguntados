/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
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
    var id = this.obtenerUltimoId();
    id++;
    console.log('agregar pregunta', id);
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  borrarPregunta: function(id){
    var idBorrar= this.preguntas.find(fruta => fruta.id ===id); //busco la pregunta que voy a borrar y lo guardo en la variable
    console.log('idBorrar :',idBorrar);
    console.log('arreglor de preguntas: ',modelo.preguntas);
    var indiceBorrar= this.preguntas.indexOf(idBorrar); //busco la posicion en la matriz y la guardo
    console.log('indiceBorrar: ',indiceBorrar)
        if  (indiceBorrar != undefined){ //me fijo que realmente el id sea valido
                modelo.preguntas.splice(indiceBorrar,1);
    };
    this.guardar();
    this.preguntaEliminada.notificar();

  },

  //se guardan las preguntas
  guardar: function(){
  },
};
