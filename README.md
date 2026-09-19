# AoE2 Strategies

App móvil (React Native + Expo) con estrategias de build order para Age of
Empires 2: un listado por civilización, un timer visual para seguir los
tiempos de cada build order, y favoritos guardados localmente.

> **Estado:** en desarrollo. Fases 0 (setup) y 1 (navegación con tabs)
> completas y verificadas en dispositivo real vía Expo Go. Datos mock,
> timer, almacenamiento y pulido de UI (Fases 2-5) todavía no están
> implementados. Ver [`docs/PLAN_IMPLEMENTACION_AOE2.md`](docs/PLAN_IMPLEMENTACION_AOE2.md)
> para el detalle de cada fase y su checklist de éxito.

## Stack

- [Expo](https://expo.dev/) + React Native + TypeScript
- [React Navigation](https://reactnavigation.org/) (bottom tabs)
- `@react-native-async-storage/async-storage` para favoritos persistidos

## Requisitos

- Node.js 20+ y npm
- La app [Expo Go](https://expo.dev/go) en tu celular (Android/iOS), o un
  emulador/simulador configurado localmente

## Empezar

```bash
npm install
npm start          # levanta Metro Bundler, escanea el QR con Expo Go
```

Otros comandos:

```bash
npm start -- --clear     # limpiar caché de Metro
npm run android          # abrir directamente en Android
npm run ios               # abrir directamente en iOS (solo macOS)
```

El build web no está configurado (`react-dom`/`react-native-web` no están
instalados) — el proyecto apunta a mobile vía Expo Go únicamente.

## Estructura del proyecto

```
├── App.tsx           # componente raíz (navegación por tabs)
├── src/
│   ├── screens/       # Home, Strategies, Calculator (una carpeta por tab)
│   ├── components/    # componentes reutilizables (BuildOrderCard, Timer)
│   ├── data/           # datos mock de estrategias (strategies.json)
│   ├── utils/          # helpers (storage.ts para AsyncStorage)
│   └── styles/         # paleta de colores compartida
└── docs/
    └── PLAN_IMPLEMENTACION_AOE2.md
```

## Licencia

[MIT](LICENSE)
