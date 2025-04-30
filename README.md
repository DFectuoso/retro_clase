# RetroFeedback - Sistema de Retroalimentación NPS

RetroFeedback es una aplicación web desarrollada con Next.js, Tailwind CSS y SQLite que permite recolectar retroalimentación de tus clases, cursos o eventos mediante el sistema de Net Promoter Score (NPS).

## Características

- Creación de formularios personalizados de retroalimentación
- Enlaces únicos para compartir con participantes
- Recolección anónima de puntuaciones NPS (0-10)
- Comentarios adicionales de los participantes
- Visualización de estadísticas y análisis
- Cálculo automático del NPS

## Requisitos

- Node.js 18.0.0 o superior
- npm 9.0.0 o superior

## Instalación

1. Clona este repositorio:
```bash
git clone <url-del-repositorio>
cd retro-feedback
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicializa la base de datos:
```bash
npx prisma migrate dev
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
```

5. Abre tu navegador en `http://localhost:3000`

## Uso

### Crear un formulario

1. Ve a la página principal y haz clic en "Crear Formulario"
2. Completa el nombre y la descripción de tu evento o clase
3. Envía el formulario para recibir un enlace único

### Compartir con participantes

1. Después de crear el formulario, comparte el enlace generado con tus participantes
2. Los participantes podrán acceder y enviar su retroalimentación de forma anónima

### Ver resultados

1. Accede a tu enlace de resultados (guardado después de crear el formulario)
2. Visualiza estadísticas como:
   - Net Promoter Score
   - Puntuación promedio
   - Distribución de respuestas (promotores, pasivos, detractores)
   - Comentarios de los participantes

## Estructura del proyecto

```
retro-feedback/
├── prisma/            # Configuración de la base de datos
├── public/            # Archivos estáticos
├── src/
│   ├── app/           # Rutas y páginas
│   ├── components/    # Componentes reutilizables
│   └── lib/           # Utilidades y configuración
└── README.md          # Este archivo
```

## Tecnologías utilizadas

- Next.js - Framework de React
- Tailwind CSS - Framework de estilos
- Prisma - ORM para la base de datos
- SQLite - Base de datos

## Licencia

[MIT](LICENSE)
