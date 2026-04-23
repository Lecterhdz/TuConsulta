// src/core/app.js
import { router } from './router.js';
import { storage } from './storage.js';
import { utils } from './utils.js';
import { Sidebar } from '@components/Sidebar.js';

console.log('🏗️ Core App cargado');

export const app = {
  estado: {
    usuario: null,
    licencia: null,
    featureActivo: null
  },

  init: async function() {
    console.log('🏥 TuConsulta iniciando...');
    
    await storage.init();
    await this.cargarEstado();
    
    const autenticado = await this.verificarAuth();
    
    if (autenticado) {
      this.renderHeader();
      Sidebar.render();
      this.renderFooter();
      router.navegar('/dashboard');
    } else {
      router.navegar('/auth');
    }
    
    window.addEventListener('popstate', () => router.manejarRuta());
    console.log('✅ TuConsulta listo');
  },

  cargarEstado: async function() {
    const estado = localStorage.getItem('tuconsulta_estado');
    if (estado) this.estado = JSON.parse(estado);
  },

  guardarEstado: function() {
    localStorage.setItem('tuconsulta_estado', JSON.stringify(this.estado));
  },

  verificarAuth: async function() {
    const licencia = localStorage.getItem('tuconsulta_licencia');
    if (licencia) {
      this.estado.licencia = JSON.parse(licencia);
      if (new Date() > new Date(this.estado.licencia.expiracion)) {
        this.estado.licencia = null;
        localStorage.removeItem('tuconsulta_licencia');
        return false;
      }
      return true;
    }
    return false;
  },

  setLicencia: function(licencia) {
    this.estado.licencia = licencia;
    localStorage.setItem('tuconsulta_licencia', JSON.stringify(licencia));
    this.guardarEstado();
  },

  logout: function() {
    this.estado.usuario = null;
    this.estado.licencia = null;
    localStorage.removeItem('tuconsulta_licencia');
    router.navegar('/auth');
  },

  cargarFeature: async function(featureName) {
    const featureCss = document.getElementById('feature-css');
    if (featureCss) {
      featureCss.href = `/tuconsulta/src/features/${featureName}/${featureName}.css`;
    }
    this.estado.featureActivo = featureName;
  },

  renderHeader: function() {
    const header = document.getElementById('app-header');
    if (!header) return;
    
    const licencia = this.estado.licencia;
    header.innerHTML = `
      <div class="header-content">
        <div>
          <h1 class="header-title">🏥 TuConsulta</h1>
          <p class="header-subtitle">Gestión de Citas Médicas</p>
        </div>
        <div class="header-actions">
          ${licencia ? `<div class="license-badge">✅ ${licencia.tipo}</div>` : ''}
          <button onclick="window.app.logout()" class="btn-logout">🚪 Salir</button>
        </div>
      </div>
    `;
  },

  renderFooter: function() {
    const footer = document.getElementById('app-footer');
    if (!footer) return;
    
    footer.innerHTML = `
      <p>© 2026 TuConsulta - Citas Médicas</p>
      <p style="margin-top:10px;font-size:12px;opacity:0.7;">
        Los datos se guardan localmente. Exporta regularmente.
      </p>
    `;
  }
};

export default app;
