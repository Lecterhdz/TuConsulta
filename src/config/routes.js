// src/config/routes.js
export const routes = {
  '/auth': {
    feature: 'auth',
    titulo: 'Iniciar Sesión',
    requiereAuth: false
  },
  '/dashboard': {
    feature: 'dashboard',
    titulo: 'Dashboard',
    requiereAuth: true
  },
  '/citas': {
    feature: 'citas',
    titulo: 'Citas',
    requiereAuth: true
  },
  '/doctores': {
    feature: 'doctores',
    titulo: 'Doctores',
    requiereAuth: true
  },
  '/pacientes': {
    feature: 'pacientes',
    titulo: 'Pacientes',
    requiereAuth: true
  }
};

export default routes;
