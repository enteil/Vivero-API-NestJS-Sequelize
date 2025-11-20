# 🌿 Guía de Trabajo con Ramas Git - Proyecto Vivero

## Estructura de Ramas

### Ramas Principales

1. **`main`** (o `master`)
   - Código en producción
   - Solo se actualiza mediante merge desde `develop`
   - Debe estar siempre estable y funcionando

2. **`develop`**
   - Rama de desarrollo principal
   - Integra todas las funcionalidades antes de pasar a producción
   - Base para crear nuevas ramas de características

3. **`feature/HU-X-descripcion`**
   - Ramas para cada historia de usuario
   - Se crean desde `develop`
   - Se fusionan de vuelta a `develop` cuando están completas

## Comandos Git Esenciales

### Crear y Trabajar con Ramas

#### 1. Crear rama develop (si no existe)
```bash
git checkout main
git checkout -b develop
git push -u origin develop
```

#### 2. Crear rama para una nueva historia de usuario
```bash
# Asegurarse de estar en develop y actualizado
git checkout develop
git pull origin develop

# Crear nueva rama
git checkout -b feature/HU-1-gestion-plantas

# Trabajar en la rama...
# Hacer commits con convención #HU-1
```

#### 3. Ver todas las ramas
```bash
git branch -a
```

#### 4. Cambiar de rama
```bash
git checkout nombre-rama
```

### Trabajar con Commits

#### Hacer commit con convención
```bash
git add .
git commit -m "feat(plants): implementar endpoint GET /plants #HU-1"
```

#### Ver historial de commits
```bash
# Ver commits de la rama actual
git log --oneline

# Ver commits de una historia de usuario específica
git log --grep="#HU-1" --oneline

# Ver commits de un desarrollador
git log --author="nombre" --oneline

# Ver gráfico de ramas
git log --oneline --graph --all
```

### Fusionar Ramas (Merge)

#### 1. Fusionar feature a develop
```bash
# Cambiar a develop
git checkout develop

# Asegurarse de estar actualizado
git pull origin develop

# Fusionar la rama de feature
git merge feature/HU-1-gestion-plantas

# Resolver conflictos si los hay
# Luego hacer push
git push origin develop
```

#### 2. Fusionar develop a main (solo cuando esté listo para producción)
```bash
# Cambiar a main
git checkout main

# Fusionar develop
git merge develop

# Hacer push
git push origin main
```

### Eliminar Ramas

#### Eliminar rama local (después de merge)
```bash
git branch -d feature/HU-1-gestion-plantas
```

#### Eliminar rama remota
```bash
git push origin --delete feature/HU-1-gestion-plantas
```

## Flujo de Trabajo Completo

### Ejemplo: Desarrollar Historia de Usuario 1

```bash
# 1. Actualizar develop
git checkout develop
git pull origin develop

# 2. Crear rama para HU-1
git checkout -b feature/HU-1-gestion-plantas

# 3. Desarrollar funcionalidad
# ... hacer cambios en el código ...

# 4. Hacer commits con convención
git add .
git commit -m "feat(plants): crear entidad Plant #HU-1"
git commit -m "feat(plants): implementar servicio de plantas #HU-1"
git commit -m "feat(plants): crear controlador con endpoints CRUD #HU-1"
git commit -m "test(entities): agregar pruebas unitarias para Plant #HU-1"

# 5. Push de la rama
git push -u origin feature/HU-1-gestion-plantas

# 6. Fusionar a develop (después de revisión)
git checkout develop
git merge feature/HU-1-gestion-plantas
git push origin develop

# 7. Eliminar rama local (opcional)
git branch -d feature/HU-1-gestion-plantas
```

## Convención de Nombres de Ramas

### Formato
```
feature/HU-X-descripcion-corta
```

### Ejemplos
- `feature/HU-1-gestion-plantas`
- `feature/HU-2-autenticacion-usuarios`
- `feature/HU-3-gestion-productos`
- `fix/HU-1-corregir-validacion-stock`
- `test/HU-2-agregar-pruebas-sesion`

## Resolución de Conflictos

### Cuando hay conflictos en merge

```bash
# 1. Git indicará archivos con conflictos
git merge feature/HU-1-gestion-plantas

# 2. Abrir archivos con conflictos
# Buscar marcadores: <<<<<<<, =======, >>>>>>>

# 3. Resolver conflictos manualmente
# Eliminar marcadores y dejar el código correcto

# 4. Marcar como resuelto
git add archivo-resuelto.ts

# 5. Completar merge
git commit
```

## Buenas Prácticas

1. **Nunca trabajar directamente en `main`**
   - Siempre trabajar en ramas de feature

2. **Actualizar `develop` frecuentemente`**
   - Antes de crear nueva rama, actualizar develop
   - Antes de hacer merge, actualizar develop

3. **Commits pequeños y frecuentes**
   - Un commit por cambio lógico
   - Mensajes descriptivos

4. **Siempre incluir #HU-X en commits**
   - Facilita trazabilidad
   - Permite búsqueda rápida

5. **Push frecuente de ramas**
   - Evita pérdida de trabajo
   - Permite colaboración

6. **Revisar antes de merge**
   - Verificar que todo funciona
   - Ejecutar pruebas
   - Revisar código

## Verificación de Trabajo Colaborativo

### Ver contribuciones de cada miembro
```bash
# Ver commits por autor
git shortlog -sn

# Ver commits detallados por autor
git log --format='%aN' | sort -u | while read name; do
  echo -e "\n$name:"
  git log --author="$name" --oneline
done
```

### Ver actividad por rama
```bash
# Ver commits en una rama específica
git log feature/HU-1-gestion-plantas --oneline

# Ver diferencias entre ramas
git diff develop..feature/HU-1-gestion-plantas
```

## Comandos Útiles Adicionales

```bash
# Ver estado actual
git status

# Ver diferencias no commiteadas
git diff

# Ver diferencias de un archivo específico
git diff archivo.ts

# Deshacer cambios no commiteados
git checkout -- archivo.ts

# Ver ramas remotas
git branch -r

# Actualizar referencias remotas
git fetch origin

# Ver información de una rama
git show-branch feature/HU-1-gestion-plantas
```

## Troubleshooting

### Error: "Your branch is ahead of 'origin/develop'"
```bash
# Hacer push de los cambios
git push origin develop
```

### Error: "Updates were rejected because the remote contains work"
```bash
# Hacer pull primero
git pull origin develop
# Resolver conflictos si los hay
# Luego push
git push origin develop
```

### Cambiar nombre de rama
```bash
# Renombrar rama local
git branch -m nombre-viejo nombre-nuevo

# Si ya está en remoto, eliminar y crear nueva
git push origin --delete nombre-viejo
git push -u origin nombre-nuevo
```

