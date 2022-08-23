const mensajes = document.getElementById("mensajes");
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const sectionReiniciar = document.getElementById("boton-escapar");
const botonMascotaJugador = document.getElementById("boton-seleccionar");

const botonEscapar = document.getElementById("boton-escapar");

const sectionSeleccionarMascota = document.getElementById(
  "seleccionar-mascota"
);
const spanMascotaJugador = document.getElementById("mascota-jugador");

const spanMascotaEnemigo = document.getElementById("mascota-enemigo");

const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

const sectionMensajes = document.getElementById("resultado");
const ataquesDelJugador = document.getElementById("ataques-del-jugador");
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");

const subtitulo = document.getElementById("subtitulo");

const seccionReiniciar = document.getElementById("reiniciar");

const contenedorTarjetas = document.getElementById("contenedorTarjetas");

const contenedorAtaques = document.getElementById("contenedorAtaques");

const sectionVerMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa");

let mokepones = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDeMokepones;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let mascotaJugador;
let mascotaJugadorObjeto;
let mascotaEnemigo;
let ataquesMokepon;
let ataquesMokeponEnemigo;
let botonFuego;
let botonAgua;
let botonPlanta;
let botones = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let vidasJugador = 3;
let vidasEnemigo = 3;
let lienzo = mapa.getContext("2d");
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = "./assets/mokemap.png";
let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth - 20;
const anchoMaximoDelMapa = 1080

if(anchoDelMapa > anchoMaximoDelMapa) {
  anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 1080 / 1920;

mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos;

class Mokepon {
  constructor(nombre, foto, vida, fotoMapa) {
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
    this.ancho = (120 * ((1920/ 1080) / (mapa.width / mapa.height)));
    this.alto = (120 * ((1080 / 1920) / (mapa.width / mapa.height)));
    this.x = aleatorio(0, mapa.width - this.ancho);
    this.y = aleatorio(0, mapa.height - this.alto);
    this.mapaFoto = new Image();
    this.mapaFoto.src = fotoMapa;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }

  pintarMokepon() {
    console.log(this.alto , this.ancho)
    lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto);
  }
}

let hipodoge = new Mokepon(
  "Hipodoge",
  "./assets/mokepons_mokepon_hipodoge_attack.png",
  5,
  "./assets/hipodoge.png"
);

let capipepo = new Mokepon(
  "Capipepo",
  "./assets/mokepons_mokepon_capipepo_attack.png",
  5,
  "./assets/capipepo.png"
);

let ratigueya = new Mokepon(
  "Ratigueya",
  "./assets/mokepons_mokepon_ratigueya_attack.png",
  5,
  "./assets/ratigueya.png"
);

let hipodogeEnemigo = new Mokepon(
  "Hipodoge",
  "./assets/mokepons_mokepon_hipodoge_attack.png",
  5,
  "./assets/hipodoge.png"
);

let capipepoEnemigo = new Mokepon(
  "Capipepo",
  "./assets/mokepons_mokepon_capipepo_attack.png",
  5,
  "./assets/capipepo.png"
);

let ratigueyaEnemigo = new Mokepon(
  "Ratigueya",
  "./assets/mokepons_mokepon_ratigueya_attack.png",
  5,
  "./assets/ratigueya.png"
);

hipodoge.ataques.push(
  { nombre: "💦", id: "boton-agua" },
  { nombre: "💦", id: "boton-agua" },
  { nombre: "💦", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🍃", id: "boton-planta" }
);

capipepo.ataques.push(
  { nombre: "🍃", id: "boton-planta" },
  { nombre: "🍃", id: "boton-planta" },
  { nombre: "🍃", id: "boton-planta" },
  { nombre: "💦", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" }
);

ratigueya.ataques.push(
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🍃", id: "boton-planta" },
  { nombre: "💦", id: "boton-agua" }
);

hipodogeEnemigo.ataques.push(
  { nombre: "💦", id: "boton-agua" },
  { nombre: "💦", id: "boton-agua" },
  { nombre: "💦", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🍃", id: "boton-planta" }
);

capipepoEnemigo.ataques.push(
  { nombre: "🍃", id: "boton-planta" },
  { nombre: "🍃", id: "boton-planta" },
  { nombre: "🍃", id: "boton-planta" },
  { nombre: "💦", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" }
);

ratigueyaEnemigo.ataques.push(
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🍃", id: "boton-planta" },
  { nombre: "💦", id: "boton-agua" }
);

mokepones.push(hipodoge, capipepo, ratigueya);

function iniciarJuego() {
  mensajes.style.display = "none";
  sectionSeleccionarAtaque.style.display = "none";
  sectionVerMapa.style.display = "none";

  mokepones.forEach((mokepon) => {
    opcionDeMokepones = `<input type="radio" name="mascota" id=${mokepon.nombre} />
    <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
      <p>${mokepon.nombre}</p>
      <img
        src=${mokepon.foto}
        alt=${mokepon.nombre}
      />
    </label>
    `;
    contenedorTarjetas.innerHTML += opcionDeMokepones;

    inputHipodoge = document.getElementById("Hipodoge");
    inputCapipepo = document.getElementById("Capipepo");
    inputRatigueya = document.getElementById("Ratigueya");
  });

  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);

  botonEscapar.addEventListener("click", reiniciarJuego);
}

function seleccionarMascotaJugador() {
  sectionSeleccionarMascota.style.display = "none";

  if (inputHipodoge.checked) {
    spanMascotaJugador.innerHTML = inputHipodoge.id;
    mascotaJugador = inputHipodoge.id;
  } else if (inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = inputCapipepo.id;
    mascotaJugador = inputCapipepo.id;
  } else if (inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = inputRatigueya.id;
    mascotaJugador = inputRatigueya.id;
  } else {
    alert("Debes Seleccionar tu Mokepon Primero");
    reiniciarJuego();
  }

  extraerAtaques(mascotaJugador);
  sectionVerMapa.style.display = "flex";
  iniciarMapa();
}

function extraerAtaques(mascotaJugador) {
  let ataques;
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      ataques = mokepones[i].ataques;
    }
  }
  mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    ataquesMokepon = `<button id=${ataque.id} class="boton-ataque BAtaque">${ataque.nombre}</button>`;

    contenedorAtaques.innerHTML += ataquesMokepon;
  });

  botonFuego = document.getElementById("boton-fuego");
  botonAgua = document.getElementById("boton-agua");
  botonPlanta = document.getElementById("boton-planta");
  botones = document.querySelectorAll(".BAtaque");
}

function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      if (e.target.textContent === "🔥") {
        ataqueJugador.push("FUEGO🔥");
        console.log(ataqueJugador);
        boton.style.background = "#505252c2";
        boton.disabled = true;
      } else if (e.target.textContent === "💦") {
        ataqueJugador.push("AGUA💦");
        console.log(ataqueJugador);
        boton.style.background = "#505252c2";
        boton.disabled = true;
      } else {
        ataqueJugador.push("PLANTA🍃");
        console.log(ataqueJugador);
        boton.style.background = "#505252c2";
        boton.disabled = true;
      }
      ataqueAleatorioEnemigo();
    });
  });
}

function seleccionarMascotaEnemigo(enemigo) {
  spanMascotaEnemigo.innerHTML = enemigo.nombre;
  ataquesMokeponEnemigo = enemigo.ataques;
  secuenciaAtaque();
}

function ataqueAleatorioEnemigo() {
  mensajes.style.display = "none";
  sectionReiniciar.style.display = "flex";

  let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1);

  if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
    ataqueEnemigo.push("FUEGO🔥");
  } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
    ataqueEnemigo.push("AGUA💦");
  } else {
    ataqueEnemigo.push("PLANTA🍃");
  }
  console.log(ataqueEnemigo);
  iniciarPelea();
}

function iniciarPelea() {
  if (ataqueJugador.length === 5) {
    combate();
  }
}

function indexAmbosOponentes(jugador, enemigo) {
  indexAtaqueJugador = ataqueJugador[jugador];
  indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate() {
  mensajes.style.display = "none";
  for (let index = 0; index < ataqueJugador.length; index++) {
    if (ataqueJugador[index] === ataqueEnemigo[index]) {
      indexAmbosOponentes(index, index);
      crearMensaje("🤝EMPATE🤝");
    } else if (
      (ataqueJugador[index] == "FUEGO🔥" &&
        ataqueEnemigo[index] == "PLANTA🍃") ||
      (ataqueJugador[index] == "AGUA💦" && ataqueEnemigo[index] == "FUEGO🔥") ||
      (ataqueJugador[index] == "PLANTA🍃" && ataqueEnemigo[index] == "AGUA💦")
    ) {
      indexAmbosOponentes(index, index);
      crearMensaje("🏆GANASTE!!🏆");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else {
      indexAmbosOponentes(index, index);
      crearMensaje("😢 PERDISTE No te Desanimes 😢");
      victoriasEnemigo++;
      spanVidasEnemigo.innerHTML = victoriasEnemigo;
    }
    revisarVictorias();
    mensajes.style.display = "flex";
  }
}
function revisarVictorias() {
  if (victoriasJugador === victoriasEnemigo) {
    crearMensajeFinal("Empate");
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal("El Mokepon enemigo se ha debilitado");
  } else {
    crearMensajeFinal("Tu " + mascotaJugador + " se ha debilitado");
  }
}

function crearMensaje(resultado) {
  let nuevoAtaqueDelJugador = document.createElement("p");
  let nuevoAtaqueDelEnemigo = document.createElement("p");

  sectionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;

  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  sectionMensajes.innerHTML = resultadoFinal;
  botonFuego.style.display = "none";
  botonAgua.style.display = "none";
  botonPlanta.style.display = "none";
  sectionReiniciar.style.display = "none";
  subtitulo.style.display = "none";
  sectionReiniciar.style.display = "flex";
  botonEscapar.innerHTML = "Reiniciar Combate";
  contenedorAtaques.style.display = "none";
}

function reiniciarJuego() {
  location.reload();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function pintarCanvas() {
  mascotaJugadorObjeto.x =
    mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX;
  mascotaJugadorObjeto.y =
    mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;
  lienzo.clearRect(0, 0, mapa.width, mapa.height);
  lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);
  mascotaJugadorObjeto.pintarMokepon();
  hipodogeEnemigo.pintarMokepon();
  capipepoEnemigo.pintarMokepon();
  ratigueyaEnemigo.pintarMokepon();
  if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
    revisarColision(hipodogeEnemigo);
    revisarColision(capipepoEnemigo);
    revisarColision(ratigueyaEnemigo);
  }
}

function moverMascotaD() {
  mascotaJugadorObjeto.velocidadX = 1;
}

function moverMascotaI() {
  mascotaJugadorObjeto.velocidadX = -1;
}

function moverMascotaA() {
  mascotaJugadorObjeto.velocidadY = -1;
}

function moverMascotaAb() {
  mascotaJugadorObjeto.velocidadY = 1;
}

function detenerMovimiento() {
  mascotaJugadorObjeto.velocidadX = 0;
  mascotaJugadorObjeto.velocidadY = 0;
}

function presionarTecla(event) {
  switch (event.key) {
    case "ArrowUp":
      moverMascotaA();
      break;

    case "ArrowDown":
      moverMascotaAb();
      break;

    case "ArrowLeft":
      moverMascotaI();
      break;

    case "ArrowRight":
      moverMascotaD();
      break;

    default:
      break;
  }
}

function iniciarMapa() {
  mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador);

  intervalo = setInterval(pintarCanvas, 10);

  window.addEventListener("keydown", presionarTecla);

  window.addEventListener("keyup", detenerMovimiento);
}

function obtenerObjetoMascota() {
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      return mokepones[i];
    }
  }
}

function revisarColision(enemigo) {
  const arribaEnemigo = 
  enemigo.y +25;
  const abajoEnemigo = 
  enemigo.y + enemigo.alto -25;
  const derechaEnemigo = 
  enemigo.x + enemigo.ancho -25;
  const izquierdaEnemigo = 
  enemigo.x +25;

  const arribaMascota = 
  mascotaJugadorObjeto.y;
  const abajoMascota = 
  mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
  const derechaMascota = 
  mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
  const izquierdaMascota = 
  mascotaJugadorObjeto.x;

  if (
    abajoMascota < arribaEnemigo ||
    arribaMascota > abajoEnemigo ||
    derechaMascota < izquierdaEnemigo ||
    izquierdaMascota > derechaEnemigo
  ) {
    return;
  }
  detenerMovimiento();
  clearInterval(intervalo)
  sectionSeleccionarAtaque.style.display = "flex";
  sectionVerMapa.style.display = "none";
  seleccionarMascotaEnemigo(enemigo);
}

window.addEventListener("load", iniciarJuego);
