// src/core/storage.js
console.log('💾 Storage cargado');

export const storage = {
  db: null,
  DB_NAME: 'TuConsultaDB',
  DB_VERSION: 1,

  init: async function() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        console.log('✅ IndexedDB inicializado');
        resolve(this.db);
      };
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // Solo 4 stores esenciales para citas médicas
        if (!db.objectStoreNames.contains('citas')) {
          const store = db.createObjectStore('citas', { keyPath: 'id', autoIncrement: true });
          store.createIndex('fecha', 'fecha', { unique: false });
          store.createIndex('doctorId', 'doctorId', { unique: false });
          store.createIndex('pacienteId', 'pacienteId', { unique: false });
          store.createIndex('estado', 'estado', { unique: false });
        }
        
        if (!db.objectStoreNames.contains('doctores')) {
          const store = db.createObjectStore('doctores', { keyPath: 'id', autoIncrement: true });
          store.createIndex('nombre', 'nombre', { unique: false });
          store.createIndex('especialidad', 'especialidad', { unique: false });
        }
        
        if (!db.objectStoreNames.contains('pacientes')) {
          const store = db.createObjectStore('pacientes', { keyPath: 'id', autoIncrement: true });
          store.createIndex('nombre', 'nombre', { unique: false });
          store.createIndex('telefono', 'telefono', { unique: false });
        }
        
        if (!db.objectStoreNames.contains('config')) {
          db.createObjectStore('config', { keyPath: 'clave' });
        }
        
        console.log('✅ DB stores creados');
      };
    });
  },

  guardar: async function(storeName, datos) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const request = store.add(datos);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  obtener: async function(storeName, id) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  obtenerTodos: async function(storeName) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  actualizar: async function(storeName, id, datos) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      datos.id = id;
      const request = store.put(datos);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  eliminar: async function(storeName, id) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  },

  localStorage: {
    set: (clave, valor) => localStorage.setItem(clave, JSON.stringify(valor)),
    get: (clave) => JSON.parse(localStorage.getItem(clave)),
    remove: (clave) => localStorage.removeItem(clave)
  }
};

export default storage;
