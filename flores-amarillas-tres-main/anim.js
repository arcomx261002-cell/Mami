// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Array de objetos que contiene cada línea y su tiempo de aparición en segundos
var lyricsData = [
  { text: "Las manos que yo quiero, las manos que venero,", time: 11 },
  { text: "no son color de rosa, ni tienen palidez;", time: 17 },
  { text: "sus dedos no parecen diez gemas nacaradas,", time: 23 },
  { text: "tampoco están pintadas, ni tienen altivez.", time: 28 },
  { text: "Son manos arrugadas, tal vez las más humildes,", time: 34 },
  { text: "y están cual hojas secas de tanto trabajar;", time: 40 },
  { text: "son estas manos santas, las manos de mi madre,", time: 48 },
  { text: "aquellas que me dieron con todo amor el pan.", time: 53 },
  { text: "Las manos que yo quiero, las manos de mi madre,", time: 61 },
  { text: "ligeras como aves, volando siempre van;", time: 66 },
  { text: "las manos de mi madre, vorágines dichosas,", time: 71 },
  { text: "si no hacen siempre algo, tranquilas nunca están.", time: 76 },
  { text: "Por rústicas y viejas, ¡qué bellas son sus manos!", time: 84 },
  { text: "Lavando tanta ropa, cortando tanto pan,", time: 89 },
  { text: "corriendo por la casa, la mesa acariciando,", time: 94 },
  { text: "buscando en el descanso la aguja y el dedal.", time: 99 },
  { text: "Las manos que trajeron la lámpara a mi cama,", time: 107 },
  { text: "tapándome la espalda en el invierno cruel,", time: 112 },
  { text: "que cuando estuve triste, mis lágrimas secaron,", time: 117 },
  { text: "que cuando estuve enferma, acariciaronme.", time: 122 },
  { text: "¡Oh, manos adoradas!, ¡oh, manos llenas de alma!,", time: 130 },
  { text: "en ellas hoy quisiera mi frente refugiar;", time: 135 },
  { text: "y tristemente digo: '¡Qué lejos que se encuentran!,", time: 140 },
  { text: "¡qué lejos de mi angustia y de mi soledad!'.", time: 145 }
];

// Lista de líneas activas
var activeLines = [];
lyrics.innerHTML = ""; // Limpiar contenido inicial

// Animar las letras
function updateLyrics() {
  var time = audio.currentTime;

  // Añadir nuevas líneas si es su tiempo
  lyricsData.forEach((line, index) => {
    if (time >= line.time && !line.added) {
      line.added = true;
      var el = document.createElement("div");
      el.className = "lyric-line";
      el.innerHTML = line.text;
      lyrics.appendChild(el);

      activeLines.push({
        line: line,
        el: el
      });
    }
  });

  // Actualizar líneas activas
  for (var i = activeLines.length - 1; i >= 0; i--) {
    var active = activeLines[i];
    var timeElapsed = time - active.line.time;
    var duration = 6; // Cada línea dura 6 segundos en pantalla

    if (timeElapsed >= duration) {
      // Eliminar el elemento cuando termine su tiempo
      active.el.remove();
      activeLines.splice(i, 1);
    } else {
      // Calcular animación
      var opacity = 1;
      var blur = 0;

      // "salga de las sombras" - Aparece progresivamente (0 a 1 segundo)
      if (timeElapsed < 1) {
        opacity = timeElapsed; // 0 a 1
        blur = (1 - timeElapsed) * 10; // de 10px a 0px de blur
      }
      // "se difumine y desaparezca" - Desaparece después de 5s (5 a 6 segundos)
      else if (timeElapsed > 5) {
        var fadeElapsed = timeElapsed - 5;
        opacity = 1 - fadeElapsed; // 1 a 0
        blur = fadeElapsed * 10; // de 0px a 10px de blur
      }

      // "caer" - Desciende continuamente
      var descendAmount = timeElapsed * 25; // 25px por segundo

      active.el.style.opacity = opacity;
      active.el.style.filter = `blur(${blur}px)`;
      active.el.style.transform = `translateY(${descendAmount}px)`;
    }
  }

  requestAnimationFrame(updateLyrics);
}

updateLyrics();

//funcion titulo
// Función para ocultar el título después de 216 segundos
function ocultarTitulo() {
  var titulo = document.querySelector(".titulo");
  titulo.style.animation =
    "fadeOut 3s ease-in-out forwards"; /* Duración y función de temporización de la desaparición */
  setTimeout(function () {
    titulo.style.display = "none";
  }, 3000); // Espera 3 segundos antes de ocultar completamente
}

// Llama a la función después de 216 segundos (216,000 milisegundos)
setTimeout(ocultarTitulo, 216000);