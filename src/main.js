// src/main.js
import './styles/main.css';

// Core
import { app } from '@core/app.js';
import { router } from '@core/router.js';
import { storage } from '@core/storage.js';
import { utils } from '@core/utils.js';

// Components
import { Sidebar } from '@components/Sidebar.js';

// Exponer globalmente (para evitar ciclos de import)
window.app = app;
window.router = router;
window.storage = storage;
window.utils = utils;
window.Sidebar = Sidebar;

// Iniciar app
document.addEventListener('DOMContentLoaded', async () => {
  await app.init();
});

// Hot Module Replacement (solo en desarrollo)
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log('🔄 Módulo actualizado');
  });
}
