# 🧠 Phrases Grid

Una aplicación web moderna para gestionar frases y categorías con una interfaz amigable, filtros avanzados y diseño responsive.

![React](https://img.shields.io/badge/React-19.1.0-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-38b2ac?logo=tailwindcss)
![React Router](https://img.shields.io/badge/React_Router-7.5-red?logo=reactrouter)
![Zustand](https://img.shields.io/badge/Zustand-5.0.5-yellow)
![Tests](https://img.shields.io/badge/Tests-Passing-brightgreen?logo=jest)

---

## 🚀 Tech Stack

Este proyecto está construido con las siguientes herramientas:

- ⚛️ **React 19** + **React Router 7** – Navegación moderna con SSR y rutas declarativas.
- 🔒 **TypeScript** – Tipado estricto para mayor robustez.
- 🎨 **TailwindCSS 4** – Estilado ágil y altamente personalizable.
- 📦 **Zustand** – Estado global simple, escalable y sin boilerplate.
- 🔄 **TanStack Query 5** – Manejo de datos asincrónicos con caché y revalidación para gestionar los request.
- 🧪 **Jest + Testing Library** – Tests unitarios y de integración para componentes.
- 🧩 **Radix UI** – Componentes accesibles y sin estilo para construir UI reutilizable.
- 📡 **Axios** – Cliente HTTP simple y potente.
- 🧪 **json-server** – Mock API rápida para desarrollo local.
- ⚙️ **Vite** – Bundler rápido, ideal para desarrollo moderno.
- 🔁 **Concurrently** – Scripts paralelos para correr servidor y frontend juntos.

## 📁 Estructura del Proyecto
Organización modular basada en atomic design y separación por dominio:


```
.
├── __mocks__/                # Mocks para testing
├── __tests__/               # Tests unitarios y de integración

├── app/
│   ├── app.css              # Estilos globales
│   ├── Layout.tsx           # Layout principal con header/footer
│   ├── lib/                 # Utilidades generales
│   ├── pages/               # Componentes de página
│   │   ├── Categories/
│   │   └── Home/
│   ├── root.tsx             # Componente raíz
│   ├── routes/              # Rutas con SSR
│   ├── routes.ts            # Configuración central de rutas
│   └── shared/
│       ├── hooks/           # Hooks personalizados reutilizables
│       ├── lib/             # Funciones auxiliares (e.g., formateo de fechas)
│       ├── services/        # Consumo de APIs (Axios)
│       ├── store/           # Estados globales con Zustand
│       ├── types/           # Tipos de TypeScript
│       └── ui/
│           ├── atoms/       # Componentes UI básicos
│           ├── molecules/   # Componentes UI compuestos
│           └── organisms/   # Secciones completas de UI
```

## 🔮 Mejoras Futuras

A continuación, se listan posibles mejoras y optimizaciones a implementar en futuras iteraciones del proyecto:

- ✍️ **Agregar sección de Autores**  
  Incorporar una sección que documente a los autores de cada frase y agregar al autor en las cards de la grilla de frases.

- 🧩 **Definir interfaces entre servicios y lógica de presentación**  
  Introducir contratos (interfaces) para abstraer el consumo de servicios y desacoplar completamente la lógica de negocio de su implementación, facilitando testing, mantenimiento y escalabilidad.

- 🔔 **Implementar toasts para feedback de usuario**  
  Reemplazar `console.log` por notificaciones no intrusivas (toasts) que comuniquen el estado de las acciones al usuario final de manera clara y contextual.

- ✅ **Ampliar la cobertura de tests**  
  Aumentar la cobertura actual hasta alcanzar al menos un 85% como base sólida, con el objetivo final de llegar al 100% incluyendo ramas lógicas, errores y flujos de usuario.

- 🧼 **Soporte para internacionalización (i18n)**  
  Preparar la arquitectura para soportar múltiples idiomas con `react-i18next` u otra librería similar.

- 🏎️ **Optimización del performance inicial (TTFB y LCP)**  
  Analizar métricas de Web Vitals y aplicar técnicas de lazy loading, splitting de rutas y prefetch selectivo para mejorar tiempos de carga.
---


### 🔧 Scripts de desarrollo 

Instalar dependencias

```bash 
npm install
```

Modo desarrollo con HMR y backend simulado

```bash 
npm run dev
```

Chequear tipos y generar tipos para rutas

```bash 
npm run typecheck
```

Correr tests con cobertura

```bash 
npm run test
```

### 📦 Build & Producción
Compilar aplicación

```bash 
npm run build
```

Correr en modo producción con SSR y backend

```bash 
npm start
```
