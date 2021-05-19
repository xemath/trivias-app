class Pregunta{
    constructor(pregunta,respuestas, correcta){
        this.pregunta = pregunta;
        this.respuestas = respuestas;
        this.correcta = correcta;
    }

    obtenerRespuesta() {
        return this.respuestas[this.correcta];
    }
}
//------------- preguntas
const pregunta1 = new Pregunta('¿Cuanto dura un partido de futbol?',['90 minutos','80 minutos','120 minutos','2 horas'],0)
const pregunta2 = new Pregunta('¿Cual fue el primer equipo en ganar la copa mundial de futbol en 1934?',['Brasil','Chile','Uruguay','Italia'],2)
const pregunta3 = new Pregunta('¿Cuantos titulos de motociclismo ha conseguido valentino Rossi?',['10','50','4','9'],3)
const pregunta4 = new Pregunta('¿Qué tipo de competición es el Giro de Italia?',['Futbol','Ciclismo','Automovilismo','Tennis'],1)
const pregunta5 = new Pregunta('¿Si juegas en la NFL que deporte practicas?',['Futbol Americano','Hockey','Basketball','Golf'],0)
const pregunta6 = new Pregunta('¿Qué nadador de elite ganó cuatro medallas en de oro y dos de plata en las olimpiadas de Londres de 2012?',['Michael Phelps','Caterine Ibarguen','Usain Bolt','Jesse Owens'],0)
const pregunta7 = new Pregunta('¿De que deporte se tomo la expresion "tirar la toalla"?',['Golf','Esgrima','Boxeo','Tiro con Arco'],2)
const pregunta8 = new Pregunta('¿En qué país se encuentra el circuito de Le Mans??',['Roma','Italia','Francia','Colombia'],2)
const pregunta9 = new Pregunta('¿En qué país se inventó el voleibol?',['Alemania','Estados Unidos','Mexio','Grecia'],1)
const pregunta10 = new Pregunta('¿Quién ganó el mundial de fútbol de 2010?',['España','Uruguay','Alemania','Francia'],0)
const pregunta11 = new Pregunta('¿Cómo se llama el deporte en el cual se levantan pesas?',['Hipertrofismo','Fuerza Bruta','Levantamiento de pesas','Halterofilia'],3)
const pregunta12 = new Pregunta('¿De qué color es la camiseta titular de la selección de Nigeria?',['Amarillo y Blanco','Blanco y Verde','Rojo y Verde','Negro y Rojo'],1)
const pregunta13 = new Pregunta('¿Dónde se inventó el tenis de mesa?',['China','Inglaterra','Alemania','Trinidad y Tobago'],1)
const pregunta14 = new Pregunta('En la década de los 90, Pelé fue ministro de deportes. ¿En qué país?',['España','Portugal','Colombia','Brasil'],3)
const pregunta15 = new Pregunta('¿Cuál es el deporte nacional en Japón?',['Video Juegos','Sumo','Baseball','Basketball'],1)
const pregunta16 = new Pregunta('¿Qué famoso jugador de fútbol fue expulsado del mundial 1994 por dar positivo en la prueba de doping?',['El gordo Ronaldo','Romario','Maradona','Zinedine Zidane'],2)
const pregunta17 = new Pregunta('¿Quién inventó el fútbol?',['Sudafricanos','Brasileños','Los Chinos','Ingleses'],2)
const pregunta18 = new Pregunta('¿Cuántos tiempos tiene un partido de baloncesto?',['2 de 20 minutos ','4 de 10 minutos','4 de 15 minutos','2 de media hora'],1)
const pregunta19 = new Pregunta('¿Cómo se llama la anotación de un tanto en fútbol americano?',['Punto','Goal','Dunk','Touchdowm'],3)
const pregunta20 = new Pregunta('¿Quién ganó cuatro mundiales consecutivos de Fórmula 1?',['Sebastian Vettel','Michael Schumaher','Juan Pablo Montoya','Ayrton Senna'],0)


var arrelogPreguntas = [pregunta1, pregunta2,pregunta3,pregunta4,pregunta5,pregunta6,pregunta7,pregunta8,pregunta9,pregunta10,pregunta11,pregunta12,pregunta13,pregunta14,pregunta15,pregunta16,pregunta17,pregunta18,pregunta19,pregunta20]


//------------- metodos y obtener elementos del dom
var puntaje = 0




botones = document.getElementsByTagName('button');


function mostrarBotones(pregunta1) {
    respuesta = pregunta1.obtenerRespuesta();
    document.getElementById('pregunta').innerHTML = pregunta1.pregunta;
    controladorClick = false;
    for(let i=0; i<botones.length; i++){
        botones[i].innerHTML = pregunta1.respuestas[i];
        
    }
}
//-------------------------

 function reiniciar(){
     for(let i = 0; i<botones.length; i++){
         botones[i].setAttribute('class', 'btn btn-primary');
     }
 }   


 var contador  = 0;
for(let i = 0; i<botones.length; i++){
    botones[i].addEventListener('click',()=>{
        if(botones[i].innerHTML == respuesta && controladorClick==false){
            contador++
            botones[i].setAttribute('class','btn btn-success')
            puntaje++
            controladorClick = true;
            console.log(`el contador vale ${contador} y el puntaje es ${puntaje}`)
            
            setTimeout(()=>{
                if(contador<arrelogPreguntas.length){
                    mostrarBotones(arrelogPreguntas[contador])
                    reiniciar()

                }
                else{
                    console.log('terminaaste')
                }

            },500)

        }
        else if(botones[i].innerHTML != respuesta && controladorClick==false){
            contador++
            botones[i].setAttribute('class', 'btn btn-danger')
            console.log(`el contador vale ${contador} y el puntaje es ${puntaje}`)

            setTimeout(()=>{                   
                if(contador<arrelogPreguntas.length){
                    mostrarBotones(arrelogPreguntas[contador])
                    reiniciar()

                }
                else{
                    console.log('terminaaste')
                }

            },500)

        }
    });
}



mostrarBotones(pregunta1);




