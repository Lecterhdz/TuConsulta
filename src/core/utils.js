// src/core/utils.js
console.log('🔧 Utils cargado');

export const utils = {
  // Formato de moneda MXN
  formatoMoneda: function(cantidad) {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(cantidad);
  },

  // Formato de fecha
  formatoFecha: function(fecha) {
    if (!fecha) return '';
    return new Date(fecha).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  },

  // Formato de hora
  formatoHora: function(fecha) {
    if (!fecha) return '';
    return new Date(fecha).toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  // Fecha actual en formato YYYY-MM-DD
  fechaActual: function() {
    return new Date().toISOString().split('T')[0];
  },

  // Generar ID único
  generarId: function() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  // Validar email
  esEmail: function(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  // Validar teléfono MX
  esTelefonoMX: function(telefono) {
    return /^(\+52|52)?[1-9]\d{9}$/.test(telefono.replace(/\D/g, ''));
  },

  // Capitalizar primera letra
  capitalizar: function(texto) {
    if (!texto) return '';
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  },

  // Truncar texto
  truncar: function(texto, longitud) {
    if (!texto) return '';
    if (texto.length <= longitud) return texto;
    return texto.substr(0, longitud) + '...';
  },

  // Esperar (delay)
  esperar: function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};

export default utils;