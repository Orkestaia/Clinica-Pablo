# ⚠️ IMPORTANTE: Eliminar carpeta duplicada

Hay una carpeta `ortodoncia-dashboard` duplicada dentro del proyecto que debe ser eliminada antes de subir a GitHub.

## Pasos para limpiar:

1. Abre el explorador de archivos
2. Navega a: `c:\Users\aitor\OneDrive\Escritorio\ORKESTA Automation project\Clientes Orkesta\Pablo Ortodoncia\ortodoncia-dashboard`
3. Elimina la carpeta `ortodoncia-dashboard` que está DENTRO de esta carpeta
4. Asegúrate de que la estructura final sea:

```
ortodoncia-dashboard/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── CallModal.tsx
│   ├── CallsTable.tsx
│   ├── Filters.tsx
│   └── MetricCard.tsx
├── lib/
│   ├── types.ts
│   └── utils.ts
├── .eslintrc.json
├── .gitattributes
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

Después de eliminar la carpeta duplicada, sigue con los pasos del archivo DEPLOYMENT.md
