let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3
let vidasEnemigo = 3

window.addEventListener("load", iniciarJuego);

function iniciarJuego() {

  let mensajes = document.getElementById("mensajes")
  mensajes.style.display = "none"
  
  let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
  sectionSeleccionarAtaque.style.display = "none"

  let sectionReiniciar = document.getElementById("boton-escapar")
  sectionReiniciar.style.display = "none"

  let botonMascotaJugador = document.getElementById("boton-seleccionar");
  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);

  let botonFuego = document.getElementById("boton-fuego");
  botonFuego.addEventListener("click", ataqueFuego);
  let botonAgua = document.getElementById("boton-agua");
  botonAgua.addEventListener("click", ataqueAgua);
  let botonPlanta = document.getElementById("boton-planta");
  botonPlanta.addEventListener("click", ataquePlanta);
    
  let botonEscapar = document.getElementById("boton-escapar");
  botonEscapar.addEventListener("click", reiniciarJuego)

}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function seleccionarMascotaJugador() {
  let jugar = 1;
  let sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")
  sectionSeleccionarMascota.style.display = "none"

  let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
  sectionSeleccionarAtaque.style.display = "flex"

  let inputHipodoge = document.getElementById("hipodoge");
  let inputCapipepo = document.getElementById("capipepo");
  let inputRatigueya = document.getElementById("ratigueya");
  let spanMascotaJugador = document.getElementById("mascota-jugador");

  if (inputHipodoge.checked) {
    spanMascotaJugador.innerHTML = "Hipodoge";
  } else if (inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = "Capipepo";
  } else if (inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = "Ratigueya";
  } else {
    alert("Debes Seleccionar tu Mokepon Primero")
    reiniciarJuego();
    jugar = 0;
  }
  if (jugar == 1) {
    seleccionarMascotaEnemigo();
  }
}

function seleccionarMascotaEnemigo() {
  
  let mascotaAleatorio = aleatorio(1, 3);
  let spanMascotaEnemigo = document.getElementById("mascota-enemigo");

  if (mascotaAleatorio == 1) {
    spanMascotaEnemigo.innerHTML = "Hipodoge";
  } else if (mascotaAleatorio == 2) {
    spanMascotaEnemigo.innerHTML = "Capipepo";
  } else {
    spanMascotaEnemigo.innerHTML = "Ratigueya";
  }
}

function ataqueFuego() {
  ataqueJugador = "FUEGO🔥";
  ataqueAleatorioEnemigo();
}

function ataqueAgua() {
  ataqueJugador = "AGUA💦";
  ataqueAleatorioEnemigo();
}

function ataquePlanta() {
  ataqueJugador = "PLANTA🍃";
  ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {

  let mensajes = document.getElementById("mensajes")
  mensajes.style.display = "flex"

  let sectionReiniciar = document.getElementById("boton-escapar")
  sectionReiniciar.style.display = "flex"

  let ataqueAleatorio = aleatorio(1, 3);

  if (ataqueAleatorio == 1) {
    ataqueEnemigo = "FUEGO🔥";
  } else if (ataqueAleatorio == 2) {
    ataqueEnemigo = "AGUA💦";
  } else {
    ataqueEnemigo = "PLANTA🍃";
  }

  combate();
}

function combate() {
    
    let spanVidasJugador = document.getElementById("vidas-jugador")
    let spanVidasEnemigo = document.getElementById("vidas-enemigo")

  if (vidasEnemigo > 0 && vidasJugador > 0) {
    
    if (ataqueEnemigo == ataqueJugador) {
      crearMensaje("🤝EMPATE🤝");
      ;
    } else if (
      (ataqueJugador == "FUEGO🔥" && ataqueEnemigo == "PLANTA🍃") ||
      (ataqueJugador == "AGUA💦" && ataqueEnemigo == "FUEGO🔥") ||
      (ataqueJugador == "PLANTA🍃" && ataqueEnemigo == "AGUA💦")
    ) {
      crearMensaje("🏆GANASTE!!🏆");
      vidasEnemigo--
      spanVidasEnemigo.innerHTML = vidasEnemigo
      ;
    } else {
      crearMensaje("😢 PERDISTE No te Desanimes 😢")
      vidasJugador--
      spanVidasJugador.innerHTML = vidasJugador;
      ;
    }
    revisarVidas()
  }
  
  function revisarVidas() {
    
    if (vidasEnemigo == 0) {
      crearMensajeFinal ("El Mokepon enemigo se ha debilitado")
      crearBotonReiniciar()
    } else if(vidasJugador == 0) {
      crearMensajeFinal ("Tu Mokepon se ha debilitado")
      crearBotonReiniciar()
    }
  }  
}

function crearMensaje(resultado) {
  
  let sectionMensajes = document.getElementById("resultado");
  let ataquesDelJugador = document.getElementById("ataques-del-jugador");
  let ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");

  let nuevoAtaqueDelJugador = document.createElement("p");
  let nuevoAtaqueDelEnemigo = document.createElement("p");
  
  sectionMensajes.innerHTML = resultado
  nuevoAtaqueDelJugador.innerHTML = ataqueJugador
  nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

  
  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

  function crearBotonReiniciar(){
    let seccionReiniciar = document.getElementById("reiniciar")
    let botonReiniciar = document.createElement("button");
    botonReiniciar.id= "boton-reiniciar"
    
    botonReiniciar.innerHTML = "Reiniciar Combate"

    seccionReiniciar.appendChild(botonReiniciar)
    botonReiniciar.addEventListener("click", reiniciarJuego)

  }

function crearMensajeFinal(resultadoFinal) {
  let sectionMensajes = document.getElementById("resultado");
  sectionMensajes.innerHTML = resultadoFinal

  let botonFuego = document.getElementById("boton-fuego");
  botonFuego.disabled = true
  botonFuego.style.display= "none"

  let botonAgua = document.getElementById("boton-agua");
  botonAgua.disabled = true
  botonAgua.style.display= "none"

  let botonPlanta = document.getElementById("boton-planta");
  botonPlanta.disabled = true
  botonPlanta.style.display= "none"

  let sectionReiniciar = document.getElementById("boton-escapar")
  sectionReiniciar.style.display = "none"


}

function reiniciarJuego() {
    location.reload()
}