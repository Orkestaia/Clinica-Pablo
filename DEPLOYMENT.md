# 📋 Guía de Despliegue - Dashboard Ortodoncia

## Paso 1: Subir el código a GitHub

Abre PowerShell o Git Bash en la carpeta del proyecto y ejecuta estos comandos:

```bash
# 1. Inicializar repositorio Git
git init

# 2. Agregar todos los archivos
git add .

# 3. Hacer el primer commit
git commit -m "Initial commit: Dashboard Ortodoncia Díaz de Villafranca"

# 4. Conectar con el repositorio remoto de GitHub
git remote add origin https://github.com/Orkestaia/Clinica-Pablo.git

# 5. Subir el código a GitHub
git branch -M main
git push -u origin main
```

## Paso 2: Instalar dependencias (IMPORTANTE)

Antes de desplegar en Vercel, necesitas instalar las dependencias localmente:

```bash
npm install
```

Esto creará la carpeta `node_modules` y el archivo `package-lock.json` que Vercel necesita.

## Paso 3: Verificar en Vercel

1. Ve a tu proyecto en Vercel: https://vercel.com/orkesta-automation/clinica-pablo
2. Vercel detectará automáticamente los cambios en GitHub
3. El despliegue comenzará automáticamente
4. Espera a que termine el build (puede tardar 2-3 minutos)

## Paso 4: Verificar el Dashboard

Una vez desplegado, verifica que:
- ✅ Las métricas se muestran correctamente
- ✅ La tabla de llamadas carga los datos del Google Sheet
- ✅ Los filtros funcionan
- ✅ El modal de detalles se abre al hacer clic en una fila
- ✅ El botón de exportar CSV funciona
- ✅ El auto-refresh funciona cada 30 segundos

## 🚨 Si hay errores en Vercel

Si Vercel muestra errores de build, verifica:

1. **Error de dependencias**: Asegúrate de haber ejecutado `npm install` localmente
2. **Error de TypeScript**: Revisa los logs de Vercel para ver qué archivo tiene el error
3. **Error de build**: Vercel debería usar automáticamente `npm run build`

## 📞 Soporte

Si tienes algún problema, revisa los logs de Vercel en la sección "Deployments" de tu proyecto.
