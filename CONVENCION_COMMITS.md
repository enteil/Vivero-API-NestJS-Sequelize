# 📝 Convención de Commits - Proyecto Vivero

## Formato de Mensajes de Commit

### Estructura General
```
tipo(scope): descripción breve #HU-X

Descripción detallada (opcional)
```

### Tipos de Commit

- **feat**: Nueva funcionalidad o historia de usuario
- **fix**: Corrección de bugs
- **docs**: Cambios en documentación
- **test**: Agregar o modificar pruebas
- **refactor**: Refactorización de código
- **chore**: Tareas de mantenimiento, configuración
- **style**: Cambios de formato (sin afectar funcionalidad)

### Scope (Opcional)
- `auth`: Módulo de autenticación
- `plants`: Módulo de plantas
- `users`: Módulo de usuarios
- `products`: Módulo de productos
- `entities`: Entidades de base de datos
- `config`: Configuración del proyecto

### Referencia a Historias de Usuario
**IMPORTANTE:** Todos los commits relacionados con una historia de usuario deben incluir `#HU-X` al final del mensaje.

## Ejemplos de Commits

### Historia de Usuario 1 (Gestión de Plantas)
```bash
feat(plants): implementar CRUD de plantas #HU-1

- Crear controlador y servicio para gestión de plantas
- Agregar DTOs de validación
- Implementar endpoints GET, POST, PUT, DELETE
```

```bash
test(entities): agregar pruebas unitarias para entidad Plant #HU-1

- Verificar inicialización del modelo
- Probar índices y asociaciones
- Validar relaciones con Nursery y Product
```

```bash
fix(plants): corregir validación de stock en creación de plantas #HU-1
```

### Historia de Usuario 2 (Autenticación)
```bash
feat(auth): implementar sistema de login y sesiones #HU-2

- Crear endpoint POST /auth/login
- Implementar generación de tokens de sesión
- Agregar validación de credenciales
```

```bash
test(entities): agregar pruebas para entidad User y Session #HU-2

- Verificar hash de contraseñas
- Probar hooks beforeSave
- Validar asociaciones con Role y Nursery
```

```bash
fix(auth): corregir validación de email en login #HU-2
```

### Otros Ejemplos
```bash
docs: actualizar README con instrucciones de instalación
```

```bash
chore: configurar estructura de ramas Git
```

```bash
refactor(entities): mejorar organización de asociaciones entre modelos
```

## Flujo de Trabajo con Ramas

### Estructura de Ramas
- `main`: Código en producción
- `develop`: Rama de desarrollo principal
- `feature/HU-X-descripcion`: Rama para cada historia de usuario

### Proceso de Trabajo

1. **Crear rama desde develop:**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/HU-1-gestion-plantas
   ```

2. **Realizar commits con convención:**
   ```bash
   git commit -m "feat(plants): implementar endpoint GET /plants #HU-1"
   git commit -m "test(entities): agregar pruebas para Plant #HU-1"
   ```

3. **Merge a develop:**
   ```bash
   git checkout develop
   git merge feature/HU-1-gestion-plantas
   git push origin develop
   ```

4. **Merge a main (solo cuando esté completo):**
   ```bash
   git checkout main
   git merge develop
   git push origin main
   ```

## Trazabilidad

Cada commit debe poder rastrearse hasta:
- La historia de usuario que implementa (#HU-X)
- El desarrollador que lo realizó (GitHub muestra el autor)
- La rama donde se desarrolló (feature/HU-X-*)

## Verificación de Commits

Para ver commits de una historia de usuario específica:
```bash
git log --grep="#HU-1" --oneline
```

Para ver commits de un desarrollador:
```bash
git log --author="nombre" --oneline
```

Para ver el historial de una rama:
```bash
git log feature/HU-1-gestion-plantas --oneline --graph
```

