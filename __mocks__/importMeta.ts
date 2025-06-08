Object.defineProperty(globalThis, 'import.meta', {
  value: {
    env: {
      VITE_BACKEND_URL: 'http://localhost:3001',
      VITE_GITHUB_URL: 'https://github.com/tuusuario',
      VITE_AUTHOR_NAME: 'Tu Nombre',
      VITE_LINKEDIN_URL: 'https://linkedin.com/in/tuusuario',
    },
  },
});
