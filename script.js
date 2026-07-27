// ============================================
// CARGAR CONFIGURACIÓN Y PERSONALIZAR LA INVITACIÓN
// ============================================

// ============================================
// LEER PARÁMETROS DE LA URL Y PISAR CONFIG
// ============================================
function leerParametrosURL() {
  let params;

  // Si viene codificado en Base64 desde el generador de links
  const raw = new URLSearchParams(window.location.search).get('data');
  if (raw) {
    try {
      const decoded = decodeURIComponent(escape(atob(raw)));
      params = new URLSearchParams(decoded);
    } catch (e) {
      console.warn('Error decodificando Base64, usando parámetros normales.');
      params = new URLSearchParams(window.location.search);
    }
  } else {
    params = new URLSearchParams(window.location.search);
  }
  if (params.get('nombre')) CONFIG.nombre = params.get('nombre');
  if (params.get('edad')) CONFIG.edad = params.get('edad');
  if (params.get('fecha')) CONFIG.fecha = params.get('fecha');
  if (params.get('hora')) CONFIG.hora = params.get('hora');
  if (params.get('lugar')) CONFIG.lugar = params.get('lugar');
  if (params.get('whatsapp')) CONFIG.whatsapp = params.get('whatsapp');
  if (params.get('maps')) CONFIG.googleMaps = params.get('maps');
  if (params.get('imagen')) CONFIG.imagenTema = params.get('imagen');
  if (params.get('fecha_evento')) CONFIG.fechaEvento = params.get('fecha_evento');
  if (params.get('mensaje')) CONFIG.textos.mensajeFinal = params.get('mensaje');
  if (params.get('id')) CONFIG.id = params.get('id');
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
  leerParametrosURL(); // 👈 Primero lee la URL
  inicializarInvitacion();
});

function inicializarInvitacion() {
  cargarDatos();
  aplicarTema();
  cargarImagenTema();
  iniciarContador();
  inicializarMusica();

  // Crear pétalos decorativos
  crearPetalos();
}

// ============================================
// CARGAR DATOS DE CONFIGURACIÓN
// ============================================
function cargarDatos() {
  // Textos principales (pueden ir vacíos si el título ya está en la imagen)
  document.getElementById('titulo').textContent = CONFIG.textos.titulo || '';
  document.getElementById('subtitulo').textContent = CONFIG.textos.subtitulo || '';

  // Información del evento
  document.getElementById('fecha').textContent = CONFIG.fecha;
  document.getElementById('hora').textContent = CONFIG.hora;
  document.getElementById('lugar').textContent = CONFIG.lugar;
  const direccionEl = document.getElementById('direccion');
  if (direccionEl) direccionEl.textContent = CONFIG.direccion || '';

  // Mensaje final
  document.getElementById('mensajeFinal').textContent = CONFIG.textos.mensajeFinal;

  // Textos de botones
  document.getElementById('textoBotonMaps').textContent = CONFIG.textos.textoBotonMaps;
  document.getElementById('textoBotonWhatsApp').textContent = CONFIG.textos.textoBotonWhatsApp;

  // Links de botones
  const nombreCumple = CONFIG.nombre || "Lau";
  const mensajeConfirmacion = `¡Hola! Confirmo mi asistencia a los ${CONFIG.edad} años de ${nombreCumple}. ¡Nos vemos ahí! 🌹`;
  document.getElementById('btnMaps').href = CONFIG.googleMaps;
  document.getElementById('btnWhatsapp').href =
    `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensajeConfirmacion)}`;
}

// ============================================
// APLICAR TEMA DE COLORES
// ============================================
function aplicarTema() {
  const colores = obtenerColores();

  document.getElementById('daysBox').style.background =
    `linear-gradient(135deg, ${colores.contadorDias}, ${ajustarBrillo(colores.contadorDias, -20)})`;

  document.getElementById('hoursBox').style.background =
    `linear-gradient(135deg, ${colores.contadorHoras}, ${ajustarBrillo(colores.contadorHoras, -20)})`;

  document.getElementById('minutesBox').style.background =
    `linear-gradient(135deg, ${colores.contadorMinutos}, ${ajustarBrillo(colores.contadorMinutos, -20)})`;

  document.getElementById('secondsBox').style.background =
    `linear-gradient(135deg, ${colores.contadorSegundos}, ${ajustarBrillo(colores.contadorSegundos, -20)})`;

  const btnMaps = document.getElementById('btnMaps');
  btnMaps.style.background = `linear-gradient(135deg, ${colores.botonMaps}, ${ajustarBrillo(colores.botonMaps, -20)})`;

  const btnWhatsapp = document.getElementById('btnWhatsapp');
  btnWhatsapp.style.background = `linear-gradient(135deg, ${colores.botonWhatsApp}, ${ajustarBrillo(colores.botonWhatsApp, -20)})`;
}

// Función auxiliar para oscurecer/aclarar colores
function ajustarBrillo(hex, percent) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + percent));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + percent));
  const b = Math.max(0, Math.min(255, (num & 0x0000FF) + percent));

  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

// ============================================
// CARGAR IMAGEN TEMÁTICA
// ============================================
function cargarImagenTema() {
  const themeImageContainer = document.getElementById('themeImage');

  if (CONFIG.imagenTema && CONFIG.imagenTema.trim() !== '') {
    const img = document.createElement('img');
    img.src = CONFIG.imagenTema;
    img.alt = `Invitación de ${CONFIG.nombre}`;

    img.onerror = function () {
      console.warn('No se pudo cargar la imagen:', CONFIG.imagenTema);
    };

    themeImageContainer.appendChild(img);
  }

  if (CONFIG.textoImagen && CONFIG.textoImagen.trim() !== '') {
    const textOverlay = document.createElement('div');
    textOverlay.className = 'theme-image-text';
    textOverlay.textContent = CONFIG.textoImagen;
    themeImageContainer.appendChild(textOverlay);
  }

  if ((!CONFIG.imagenTema || CONFIG.imagenTema.trim() === '') &&
    (!CONFIG.textoImagen || CONFIG.textoImagen.trim() === '')) {
    themeImageContainer.style.display = 'none';
  }
}

// ============================================
// CONTADOR REGRESIVO
// ============================================
function iniciarContador() {
  const eventDate = new Date(CONFIG.fechaEvento).getTime();

  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");
  const countdownTitle = document.querySelector(".countdown-title");

  function actualizarContador() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
      daysElement.textContent = "00";
      hoursElement.textContent = "00";
      minutesElement.textContent = "00";
      secondsElement.textContent = "00";
      countdownTitle.textContent = "¡Hoy es la fiesta! 🌹";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysElement.textContent = String(days).padStart(2, '0');
    hoursElement.textContent = String(hours).padStart(2, '0');
    minutesElement.textContent = String(minutes).padStart(2, '0');
    secondsElement.textContent = String(seconds).padStart(2, '0');
  }

  actualizarContador();
  setInterval(actualizarContador, 1000);
}

// ============================================
// LÓGICA DE MÚSICA
// ============================================
function inicializarMusica() {
  const audio = document.getElementById('backgroundMusic');
  const musicSource = document.getElementById('musicSource');
  const musicControl = document.getElementById('musicControl');

  if (!CONFIG.musica) {
    musicControl.style.display = 'none';
    return;
  }

  musicSource.src = CONFIG.musica;
  audio.load();
  audio.volume = 0.4;

  let musicaIniciada = false;

  const intentarReproducir = () => {
    if (!musicaIniciada && CONFIG.reproducirAlTocar) {
      audio.play().then(() => {
        musicaIniciada = true;
        musicControl.classList.add('playing');
        document.removeEventListener('click', intentarReproducir);
        document.removeEventListener('touchstart', intentarReproducir);
      }).catch(error => {
        console.warn('La reproducción automática fue bloqueada:', error);
      });
    }
  };

  document.addEventListener('click', intentarReproducir);
  document.addEventListener('touchstart', intentarReproducir);

  musicControl.addEventListener('click', (e) => {
    e.stopPropagation();

    if (audio.paused) {
      audio.play();
      musicControl.classList.add('playing');
      musicControl.classList.remove('muted');
      musicaIniciada = true;
    } else {
      audio.pause();
      musicControl.classList.remove('playing');
      musicControl.classList.add('muted');
    }
  });
}

// ============================================
// PÉTALOS DECORATIVOS
// ============================================
function crearPetalos() {
  const container = document.getElementById('petals');
  if (!container) return;

  for (let i = 0; i < 20; i++) {
    const el = document.createElement('div');
    el.className = 'petal';

    const size = 6 + Math.random() * 8;
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.left = Math.random() * 100 + '%';
    el.style.animationDelay = (Math.random() * 12) + 's';
    el.style.animationDuration = (10 + Math.random() * 10) + 's';

    container.appendChild(el);
  }
}

// ============================================
// LOG DE INICIALIZACIÓN
// ============================================
console.log('🌹 Invitación cargada exitosamente!');
console.log('📝 Cumpleañera:', CONFIG.nombre);
console.log('📅 Fecha del evento:', CONFIG.fechaEvento);
