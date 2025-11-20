## 🌱 Vivero API — NestJS + Sequelize

API para la gestión de viveros, plantas, productos y usuarios. Construida con NestJS y Sequelize, incluye autenticación básica, relaciones entre entidades y un conjunto de pruebas unitarias que validan la configuración de modelos, índices y asociaciones.

![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-6-52B0E7?logo=sequelize&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Jest](https://img.shields.io/badge/Tests-Jest-99425B?logo=jest&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

### ✨ Características
- Modelado de entidades: `User`, `Role`, `Permission`, `RolePermission`, `Session`, `State`, `City`, `Nursery`, `Plant`, `Product`, `PlantProduct`.
- Relaciones Sequelize verificadas por pruebas unitarias (`belongsTo`, `hasMany`, `belongsToMany`).
- Hooks relevantes probados (🔒 hash de contraseña en `User`, 🔑 token en `Session`).
- Soft delete (`paranoid`) y timestamps habilitados en las tablas.
- Estructura modular de NestJS (módulos, controladores, servicios) y DTOs con `class-validator`.

## 🧰 Requisitos
- Node.js 18+
- npm o yarn

## 📦 Instalación
```bash
npm install
```

## 🧪 Pruebas
```bash
# unit tests
npm test

# ver cobertura
npm run test:cov
```

Las pruebas unitarias cubren:
- Inicialización de modelos (tabla, timestamps, paranoid, índices).
- Relaciones entre entidades con parámetros esperados.
- Hooks de `User` (hash de contraseña) y `Session` (generación de token y flags).

## 🛠️ Desarrollo
```bash
# modo desarrollo
npm run start:dev

# modo producción
npm run build && npm run start:prod
```

## 📂 Estructura relevante
- `src/database/entities/**`: Definición de entidades Sequelize.
- `src/database/entities/**/*.spec.ts`: Pruebas unitarias por entidad.
- `src/database/entities/init-models.ts`: Inicialización y asociación global de modelos.
- `src/modules/**`: Estructura modular de NestJS (controllers, services, modules).

## 🚀 Stack del framework
- NestJS 11 con arquitectura modular (decoradores, providers, inyección de dependencias).
- Sequelize 6 con configuración `paranoid`, `indexes`, `unique` y asociaciones N:M.
- DTOs y validación con `class-validator` y `class-transformer`.
- Scripts de NPM para test, build y ejecución en desarrollo/producción.

## 📚 Documentación Adicional

- **[HISTORIAS_USUARIO.md](./HISTORIAS_USUARIO.md)** - Historias de usuario implementadas con criterios de aceptación
- **[CONVENCION_COMMITS.md](./CONVENCION_COMMITS.md)** - Convención de commits y trazabilidad
- **[GUIA_RAMAS.md](./GUIA_RAMAS.md)** - Guía completa de trabajo con ramas Git
- **[PRESENTACION.md](./PRESENTACION.md)** - Guía para presentación del proyecto
- **[RESUMEN_ENTREGA.md](./RESUMEN_ENTREGA.md)** - Resumen de cumplimiento de requisitos

## 🌿 Estructura de Ramas

El proyecto utiliza Git Flow con las siguientes ramas:
- `main` - Código en producción
- `develop` - Rama de desarrollo principal
- `feature/HU-X-descripcion` - Ramas por historia de usuario

Ver [GUIA_RAMAS.md](./GUIA_RAMAS.md) para más detalles.

## 📜 Licencia
MIT
