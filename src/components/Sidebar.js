// src/components/Sidebar.js
export const Sidebar = {
  items: [
    { icon: '📊', label: 'Dashboard', ruta: '/dashboard' },
    { icon: '📅', label: 'Citas', ruta: '/citas' },
    { icon: '👨‍⚕️', label: 'Doctores', ruta: '/doctores' },
    { icon: '👥', label: 'Pacientes', ruta: '/pacientes' }
  ],

  render: function() {
    const sidebar = document.getElementById('app-sidebar');
    if (!sidebar) return;
    
    sidebar.innerHTML = `
      <nav class="sidebar">
        <div class="sidebar-header">
          <h2>🏥 TuConsulta</h2>
          <p>Citas Médicas</p>
        </div>
        <ul class="sidebar-menu">
          ${this.items.map(item => `
            <li>
              <a href="#" onclick="window.router.navegar('${item.ruta}'); return false;">
                <span class="icon">${item.icon}</span>
                <span class="label">${item.label}</span>
              </a>
            </li>
          `).join('')}
        </ul>
        <div class="sidebar-footer">
          <button onclick="window.app.logout()" class="btn-logout">🚪 Cerrar Sesión</button>
        </div>
      </nav>
    `;
  }
};

export default Sidebar;
