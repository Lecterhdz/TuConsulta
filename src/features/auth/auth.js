export const auth = {
  licencias: {
    'TUCONSULTA-DEMO': { tipo: 'DEMO', dias: 7 },
    'TUCONSULTA-PRO': { tipo: 'PRO', dias: 365 }
  },

  init: function() {
    const form = document.getElementById('auth-form');
    if (form) form.addEventListener('submit', (e) => this.handleLogin(e));
  },

  handleLogin: function(e) {
    e.preventDefault();
    const clave = document.getElementById('license-key')?.value.trim().toUpperCase();
    const licenciaData = this.licencias[clave];
    
    if (!licenciaData) {
      alert('❌ Clave inválida');
      return;
    }
    
    const expiracion = new Date();
    expiracion.setDate(expiracion.getDate() + licenciaData.dias);
    
    window.app.setLicencia({
      clave,
      tipo: licenciaData.tipo,
      expiracion: expiracion.toISOString()
    });
    
    window.router.navegar('/dashboard');
  }
};

export const init = auth.init.bind(auth);
