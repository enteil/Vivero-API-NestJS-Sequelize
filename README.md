## Vivero API — NestJS + Sequelize

API para la gestión de viveros, plantas, productos y usuarios. Construida con NestJS y Sequelize, incluye autenticación básica, relaciones entre entidades y un conjunto de pruebas unitarias que validan la configuración de modelos, índices y asociaciones.

### Características
- Modelado de entidades: `User`, `Role`, `Permission`, `RolePermission`, `Session`, `State`, `City`, `Nursery`, `Plant`, `Product`, `PlantProduct`.
- Relaciones Sequelize verificadas por pruebas unitarias (`belongsTo`, `hasMany`, `belongsToMany`).
- Hooks relevantes probados (hash de contraseña en `User`, token en `Session`).
- Soft delete (`paranoid`) y timestamps habilitados en las tablas.

## Requisitos
- Node.js 18+
- npm o yarn

## Instalación
```bash
npm install
```

## Desarrollo
```bash
# modo desarrollo
npm run start:dev

# modo producción
npm run build && npm run start:prod
```

## Pruebas
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

## Estructura relevante
- `src/database/entities/**`: Definición de entidades Sequelize.
- `src/database/entities/**/*.spec.ts`: Pruebas unitarias por entidad.
- `src/database/entities/init-models.ts`: Inicialización y asociación global de modelos.

## Licencia
MIT
