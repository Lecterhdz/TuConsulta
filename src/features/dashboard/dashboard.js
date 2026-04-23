export const dashboard = {
  init: async function() {
    console.log('📊 Dashboard cargado');
    await this.cargarStats();
  },

  cargarStats: async function() {
    const citas = await window.storage.obtenerTodos('citas');
    const doctores = await window.storage.obtenerTodos('doctores');
    const pacientes = await window.storage.obtenerTodos('pacientes');
    
    document.getElementById('stat-citas').textContent = citas.length;
    document.getElementById('stat-doctores').textContent = doctores.length;
    document.getElementById('stat-pacientes').textContent = pacientes.length;
  }
};

export const init = dashboard.init.bind(dashboard);
