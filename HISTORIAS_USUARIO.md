# 📋 Historias de Usuario - Sistema de Gestión de Vivero

## Historia de Usuario 1: Gestión de Plantas

**ID:** HU-1  
**Título:** Como administrador del vivero, quiero gestionar plantas (crear, listar, actualizar, eliminar) para mantener un inventario actualizado.

### Descripción

El sistema debe permitir a los administradores del vivero realizar operaciones CRUD completas sobre las plantas, incluyendo la asociación con viveros y productos relacionados.

### Criterios de Aceptación

1. **CA-1.1:** El sistema debe permitir crear una nueva planta con los siguientes campos obligatorios:
   - Nombre (máximo 150 caracteres)
   - Stock (número entero, valor por defecto 0)
   - ID del vivero (nurseryId)
   - Descripción (opcional)

2. **CA-1.2:** El sistema debe permitir listar todas las plantas de un vivero específico, mostrando:
   - ID, nombre, descripción, stock
   - Información del vivero asociado
   - Productos relacionados (si existen)

3. **CA-1.3:** El sistema debe permitir obtener los detalles de una planta específica por su ID.

4. **CA-1.4:** El sistema debe permitir actualizar la información de una planta existente (nombre, descripción, stock).

5. **CA-1.5:** El sistema debe permitir eliminar una planta (soft delete), marcándola como eliminada sin borrarla físicamente de la base de datos.

6. **CA-1.6:** El sistema debe validar que el vivero existe antes de crear o actualizar una planta.

### Entidades Relacionadas

- `Plant` (entidad principal)
- `Nursery` (relación belongsTo)
- `Product` (relación belongsToMany a través de PlantProduct)
- `PlantProduct` (tabla intermedia)

### Pruebas Unitarias Requeridas (Modelo Plant)

- ✅ Verificar inicialización correcta del modelo (tabla, timestamps, paranoid)
- ✅ Verificar definición de índices (idx_plant_nursery, idx_plant_deletedAt)
- ✅ Verificar asociaciones con Nursery, Product y PlantProduct

### Estado

✅ **COMPLETADA** - Implementada en:

- Controlador: `src/modules/plants/controllers/plants.controller.ts`
- Servicio: `src/modules/plants/services/plants.service.ts`
- Entidad: `src/database/entities/plant/plant.entity.ts`
- Pruebas: `src/database/entities/plant/plant.entity.spec.ts`

---

## Historia de Usuario 2: Autenticación de Usuarios

**ID:** HU-2  
**Título:** Como usuario del sistema, quiero autenticarme mediante email y contraseña para acceder a las funcionalidades del vivero.

### Descripción

El sistema debe proporcionar un mecanismo de autenticación seguro que permita a los usuarios iniciar sesión y obtener una sesión activa con permisos según su rol.

### Criterios de Aceptación

1. **CA-2.1:** El sistema debe permitir a un usuario autenticarse proporcionando:
   - Email (debe existir en el sistema)
   - Contraseña (debe coincidir con la almacenada)

2. **CA-2.2:** El sistema debe validar las credenciales y generar una sesión activa con:
   - Token único de sesión
   - IP de origen
   - Fecha de creación y expiración
   - Estado activo/inactivo

3. **CA-2.3:** El sistema debe retornar información del usuario autenticado:
   - ID, nombre, apellido, email
   - Rol asignado
   - Vivero asociado
   - Token de sesión

4. **CA-2.4:** El sistema debe encriptar las contraseñas antes de almacenarlas usando bcrypt.

5. **CA-2.5:** El sistema debe validar que el usuario pertenezca al vivero especificado.

6. **CA-2.6:** El sistema debe manejar errores de autenticación:
   - Credenciales inválidas
   - Usuario no encontrado
   - Usuario inactivo o eliminado

### Entidades Relacionadas

- `User` (entidad principal)
- `Session` (sesiones de usuario)
- `Role` (rol del usuario)
- `Nursery` (vivero del usuario)

### Pruebas Unitarias Requeridas (Modelo User)

- ✅ Verificar inicialización correcta del modelo (tabla, timestamps, paranoid)
- ✅ Verificar exclusión de password en defaultScope
- ✅ Verificar asociaciones con Role y Nursery
- ✅ Verificar hash de contraseña en hook beforeSave

### Estado

✅ **COMPLETADA** - Implementada en:

- Controlador: `src/modules/auth/controllers/auth.controller.ts`
- Servicio: `src/modules/auth/services/auth.service.ts`
- Entidad: `src/database/entities/auth/user.entity.ts`
- Entidad: `src/database/entities/auth/session.entity.ts`
- Pruebas: `src/database/entities/auth/user.entity.spec.ts`
- Pruebas: `src/database/entities/auth/session.entity.spec.ts`

---

## Resumen de Implementación

### Funcionalidades Completadas

- ✅ CRUD completo de Plantas (HU-1)
- ✅ Sistema de autenticación con login (HU-2)
- ✅ Gestión de usuarios (CRUD)
- ✅ Gestión de productos (CRUD)
- ✅ Relaciones entre entidades (Plant-Product-Nursery)

### Entidades con Pruebas Unitarias

Todas las entidades principales cuentan con pruebas unitarias que verifican:

- Inicialización del modelo
- Configuración de índices
- Asociaciones entre entidades
- Hooks y validaciones

### Endpoints Disponibles

#### Plantas (HU-1)

- `GET /plants` - Listar plantas
- `GET /plants/:id` - Obtener planta por ID
- `POST /plants` - Crear nueva planta
- `PUT /plants/:id` - Actualizar planta
- `DELETE /plants/:id` - Eliminar planta (soft delete)

#### Autenticación (HU-2)

- `POST /auth/login` - Iniciar sesión
- `GET /auth/list-roles` - Listar roles disponibles
