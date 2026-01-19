# Dashboard Ortodoncia Díaz de Villafranca

Dashboard profesional para visualizar las llamadas del agente de voz de la clínica de ortodoncia.

## 🚀 Características

- ✅ Conexión en tiempo real con Google Sheets
- ✅ Auto-refresh cada 30 segundos
- ✅ Métricas en tiempo real (Total llamadas, Citas agendadas, Callbacks, Información)
- ✅ Filtros por Estado, Tipo de Paciente y Tratamiento
- ✅ Tabla interactiva con detalles de cada llamada
- ✅ Modal con información completa de la llamada
- ✅ Exportación a CSV
- ✅ Diseño responsive (móvil, tablet, desktop)
- ✅ Reproducción de grabaciones de audio

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Iconos**: Lucide React
- **Datos**: Google Sheets (CSV público)
- **Parsing CSV**: Papaparse
- **Lenguaje**: TypeScript

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build

# Ejecutar en producción
npm start
```

## 🌐 Despliegue en Vercel

1. Conecta tu repositorio de GitHub a Vercel
2. Vercel detectará automáticamente Next.js
3. Despliega con un clic

## 📊 Fuente de Datos

El dashboard se conecta a un Google Sheet público que se actualiza automáticamente con cada llamada del agente de voz.

**URL del CSV**: https://docs.google.com/spreadsheets/d/1bG5YLL1btGfc9igGeJFZKbKzOWAE3nxNisq3r5FXo5U/export?format=csv&gid=0

## 🎨 Paleta de Colores

- **Primary**: #3B82F6 (blue-500)
- **Success**: #10B981 (green-500)
- **Warning**: #F59E0B (amber-500)
- **Info**: #6B7280 (gray-500)
- **Background**: #F9FAFB (gray-50)

## 📝 Licencia

Desarrollado por ORKESTA Automation para Ortodoncia Díaz de Villafranca
