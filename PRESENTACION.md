# 🎤 Guía de Presentación - Proyecto Vivero

## Estructura de la Presentación

### 1. Introducción al Proyecto (2-3 min)
- **Nombre del proyecto:** Sistema de Gestión de Vivero
- **Stack tecnológico:** NestJS 11, Sequelize 6, TypeScript, MySQL
- **Objetivo:** API REST para gestión de viveros, plantas, productos y usuarios

### 2. Historias de Usuario Implementadas (5-7 min)

#### Historia de Usuario 1: Gestión de Plantas (HU-1)
- **Funcionalidad:** CRUD completo de plantas
- **Endpoints implementados:**
  - `GET /plants` - Listar plantas
  - `GET /plants/:id` - Obtener planta por ID
  - `POST /plants` - Crear nueva planta
  - `PUT /plants/:id` - Actualizar planta
  - `DELETE /plants/:id` - Eliminar planta (soft delete)
- **Entidades relacionadas:** Plant, Nursery, Product, PlantProduct
- **Estado:** ✅ Completada y funcionando

#### Historia de Usuario 2: Autenticación de Usuarios (HU-2)
- **Funcionalidad:** Sistema de login y gestión de sesiones
- **Endpoints implementados:**
  - `POST /auth/login` - Iniciar sesión
  - `GET /auth/list-roles` - Listar roles disponibles
- **Entidades relacionadas:** User, Session, Role, Nursery
- **Características de seguridad:**
  - Hash de contraseñas con bcrypt
  - Generación de tokens de sesión únicos
  - Validación de credenciales y pertenencia a vivero
- **Estado:** ✅ Completada y funcionando

### 3. Pruebas Unitarias (3-4 min)

#### Cobertura de Pruebas
- **Total de entidades con pruebas:** 11 entidades
- **Pruebas por entidad:** Mínimo 3 pruebas unitarias cada una
- **Total de pruebas:** 33+ pruebas unitarias

#### Entidades con Pruebas Unitarias

**Módulo Auth:**
- ✅ User (4 pruebas)
- ✅ Role (3 pruebas)
- ✅ Permission (3 pruebas)
- ✅ RolePermission (3 pruebas)
- ✅ Session (3 pruebas)

**Módulo Plant:**
- ✅ Plant (3 pruebas)
- ✅ Product (3 pruebas)
- ✅ Nursery (3 pruebas)
- ✅ PlantProduct (3 pruebas)

**Módulo Location:**
- ✅ State (3 pruebas)
- ✅ City (3 pruebas)

#### Tipos de Pruebas Implementadas
1. **Inicialización del modelo:**
   - Verificación de nombre de tabla
   - Configuración de timestamps
   - Configuración de paranoid (soft delete)

2. **Índices de base de datos:**
   - Verificación de índices definidos
   - Validación de índices únicos
   - Índices de relaciones (foreign keys)

3. **Asociaciones entre entidades:**
   - belongsTo
   - hasMany
   - belongsToMany
   - Validación de foreign keys

4. **Hooks y validaciones:**
   - beforeSave (hash de contraseñas en User)
   - beforeCreate (generación de tokens en Session)

### 4. Manejo de Ramas Git (5-7 min)

#### Estructura de Ramas Implementada

```
main (producción)
  └── develop (desarrollo principal)
      ├── feature/HU-1-gestion-plantas
      └── feature/HU-2-autenticacion-usuarios
```

#### Convención de Commits

**Formato:**
```
tipo(scope): descripción breve #HU-X
```

**Ejemplos de commits realizados:**
```bash
feat(plants): implementar CRUD de plantas #HU-1
test(entities): agregar pruebas unitarias para Plant #HU-1
feat(auth): implementar sistema de login y sesiones #HU-2
fix(auth): corregir validación de email en login #HU-2
```

#### Flujo de Trabajo con Ramas

1. **Creación de rama desde develop:**
   ```bash
   git checkout develop
   git checkout -b feature/HU-1-gestion-plantas
   ```

2. **Desarrollo con commits descriptivos:**
   - Cada commit incluye referencia a la historia de usuario (#HU-X)
   - Mensajes descriptivos del cambio realizado
   - Separación lógica de cambios (una funcionalidad por commit)

3. **Merge a develop:**
   ```bash
   git checkout develop
   git merge feature/HU-1-gestion-plantas
   ```

4. **Merge a main (cuando esté completo y probado):**
   ```bash
   git checkout main
   git merge develop
   ```

#### Trazabilidad
- Cada commit puede rastrearse hasta la historia de usuario (#HU-X)
- Historial completo de desarrollo por rama
- Evidencia de trabajo colaborativo en GitHub

### 5. Dificultades Encontradas y Soluciones (8-10 min)

#### Dificultad 1: Configuración de Sequelize con NestJS

**Problema:**
- Integración de Sequelize con NestJS requiere configuración específica
- Dificultad para inicializar modelos Sequelize en el contexto de NestJS
- Gestión de asociaciones entre modelos

**Solución implementada:**
- Uso de `@nestjs/sequelize` para integración nativa
- Creación de módulo de base de datos centralizado (`database.module.ts`)
- Implementación de método `initModel()` en cada entidad
- Archivo `init-models.ts` para inicialización y asociación global de modelos

**Código de ejemplo:**
```typescript
// database.module.ts
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      // configuración de conexión
    }),
  ],
})
```

#### Dificultad 2: Pruebas Unitarias de Entidades Sequelize

**Problema:**
- Dificultad para probar modelos Sequelize sin conexión real a base de datos
- Mocking de asociaciones entre modelos
- Verificación de hooks (beforeSave, beforeCreate)

**Solución implementada:**
- Uso de instancia Sequelize en memoria para pruebas
- Mocking de métodos de asociación (belongsTo, hasMany, belongsToMany)
- Pruebas de hooks mediante ejecución directa de funciones
- Separación de pruebas por aspectos: inicialización, índices, asociaciones

**Código de ejemplo:**
```typescript
// Ejemplo de prueba de asociación
const belongsToSpy = jest
  .spyOn(Plant as unknown as typeof Model, 'belongsTo')
  .mockImplementation(((..._args: any[]) => ({})) as any);
```

#### Dificultad 3: Manejo de Ramas y Convención de Commits

**Problema:**
- Establecer una convención clara de commits
- Mantener trazabilidad entre commits y historias de usuario
- Coordinar trabajo en equipo con múltiples ramas

**Solución implementada:**
- Documentación de convención de commits (`CONVENCION_COMMITS.md`)
- Uso obligatorio de `#HU-X` en todos los commits relacionados
- Estructura de ramas clara: `feature/HU-X-descripcion`
- Flujo de trabajo documentado: develop → feature → develop → main

**Beneficios:**
- Fácil búsqueda de commits por historia de usuario: `git log --grep="#HU-1"`
- Trazabilidad completa del desarrollo
- Mejor organización del trabajo en equipo

#### Dificultad 4: Soft Delete (Paranoid) y Validaciones

**Problema:**
- Implementar soft delete en todas las entidades
- Asegurar que las consultas excluyan registros eliminados
- Validar relaciones con entidades eliminadas

**Solución implementada:**
- Configuración de `paranoid: true` en todas las entidades
- Índices en `deletedAt` para optimizar consultas
- Validaciones en servicios para verificar existencia antes de relacionar

#### Dificultad 5: Hash de Contraseñas y Seguridad

**Problema:**
- Implementar hash seguro de contraseñas
- Asegurar que las contraseñas nunca se expongan en respuestas
- Validar contraseñas en login

**Solución implementada:**
- Hook `beforeSave` en entidad User para hashear automáticamente
- Helper `hashIfNeeded` para verificar si ya está hasheada
- `defaultScope` que excluye password de consultas por defecto
- Validación de contraseña en servicio de autenticación

### 6. Evidencia de Trabajo Colaborativo (2-3 min)

#### Commits en GitHub
- Todos los commits muestran el autor
- Historial completo de desarrollo visible en GitHub
- Commits distribuidos entre miembros del equipo (evidencia en GitHub)

#### Estructura de Desarrollo
- Ramas separadas por historia de usuario
- Commits descriptivos y rastreables
- Documentación completa del proyecto

### 7. Demostración Práctica (5-7 min)

#### Ejecutar Pruebas
```bash
npm test
```

#### Mostrar Estructura de Ramas
```bash
git branch -a
git log --oneline --graph --all
```

#### Mostrar Commits por Historia de Usuario
```bash
git log --grep="#HU-1" --oneline
git log --grep="#HU-2" --oneline
```

#### Mostrar Endpoints Funcionando
- Demostrar endpoints de plantas (HU-1)
- Demostrar endpoint de login (HU-2)

### 8. Conclusiones (2-3 min)

#### Logros
- ✅ 2 historias de usuario completas y funcionando
- ✅ 11 entidades con pruebas unitarias (mínimo 3 por entidad)
- ✅ Estructura de ramas Git bien organizada
- ✅ Convención de commits establecida y documentada
- ✅ Trazabilidad completa del desarrollo

#### Aprendizajes
- Integración efectiva de NestJS con Sequelize
- Pruebas unitarias de modelos Sequelize
- Buenas prácticas de Git y trabajo colaborativo
- Arquitectura modular y escalable

#### Próximos Pasos
- Implementar más historias de usuario
- Agregar pruebas de integración
- Implementar autenticación JWT
- Agregar documentación Swagger

---

## Tiempo Total Estimado: 30-40 minutos

## Material de Apoyo
- Repositorio GitHub con historial completo
- Documentación en `HISTORIAS_USUARIO.md`
- Convención de commits en `CONVENCION_COMMITS.md`
- README con instrucciones de instalación y uso

