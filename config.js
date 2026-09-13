// ============================================
// 🌹 CONFIGURACIÓN DE LA INVITACIÓN 🌹
// ============================================
// Aquí puedes personalizar todos los datos de la invitación
// Solo cambia los valores entre comillas

const CONFIG = {
  // === INFORMACIÓN DE LA CUMPLEAÑERA ===
  nombre: "Lau",
  edad: "50",
  id: "lau_50_v1",

  // === INFORMACIÓN DEL EVENTO ===
  fecha: "Sabado 8 de Agosto",
  hora: "20:00 Hs",
  lugar: "Invitate Invitaciones Web",
  direccion: "Avenida 123",

  // === FECHA PARA EL CONTADOR (formato: AAAA-MM-DDTHH:mm:ss) ===
  // Importante: usa el formato año-mes-día con guiones
  fechaEvento: "2026-08-08T20:00:00",

  // === CONTACTO ===
  // Número de WhatsApp (incluye código de país: 549 + código de área + número)
  whatsapp: "5491130370463",

  // Link de Google Maps (pega aquí el link completo)
  googleMaps: "https://maps.app.goo.gl/hYDUgPk1Bx6jz7CEA",

  // === PERSONALIZACIÓN VISUAL ===
  // Tema de colores (opciones: "dorado", "personalizado")
  tema: "personalizado",

  // Colores dorado / bordó, inspirados en la imagen de referencia
  coloresPersonalizados: {
    contadorDias: "#8a1c2b",     // Bordó
    contadorHoras: "#bf9b5a",    // Dorado
    contadorMinutos: "#8a1c2b",  // Bordó
    contadorSegundos: "#bf9b5a", // Dorado
    botonMaps: "#7a1f2b",        // Bordó oscuro
    botonWhatsApp: "#8a1c2b"     // Bordó
  },

  // === IMAGEN TEMÁTICA ===
  // Imagen fija de la invitación (con el texto "Mis 50 Años - Lau" ya integrado)
  imagenTema: "imagen-lau-50.png",
  textoImagen: "", // No se usa: el texto ya está en la imagen

  // === MÚSICA ===
  // ⚠️ Reemplazá "musica.mp3" por la canción real que quieras usar
  musica: "labella_y_labestia.mp3",
  reproducirAlTocar: true, // La música comenzará al tocar cualquier parte de la pantalla

  // === TEXTOS PERSONALIZABLES ===
  textos: {
    titulo: "", // El título ya está integrado en la imagen, se deja vacío
    subtitulo: "",
    mensajeFinal: "Cincuenta años de historias, risas y aprendizajes que hoy se celebran en una noche para atesorar.",
    textoBotonMaps: "Ver ubicación",
    textoBotonWhatsApp: "Confirmar asistencia"
  }
};

// No modifiques nada debajo de esta línea
// ============================================

function obtenerColores() {
  return CONFIG.coloresPersonalizados;
}
