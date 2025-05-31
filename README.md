# 🐳 Generador de Contraseñas - Docker + Nginx

Una aplicación web estática que genera contraseñas seguras, servida con Docker y Nginx.

## 🚀 Características

- ✅ Aplicación web completamente estática (HTML, CSS, JS)
- ✅ Servida con Nginx en contenedor Docker
- ✅ Configuración optimizada de Nginx
- ✅ Docker Compose para fácil despliegue
- ✅ Responsive design
- ✅ Accesible en http://localhost

## 📋 Requisitos

- Docker
- Docker Compose

## 🛠️ Instalación y Ejecución

### Opción 1: Con Docker Compose (Recomendado)

\`\`\`bash
# Clonar o descargar el proyecto
# Navegar al directorio del proyecto

# Construir y ejecutar
docker-compose up --build

# En segundo plano
docker-compose up -d --build
\`\`\`

### Opción 2: Solo con Docker

\`\`\`bash
# Construir la imagen
docker build -t password-generator .

# Ejecutar el contenedor
docker run -d -p 80:80 --name password-generator-app password-generator
\`\`\`

## 🌐 Acceso

Una vez ejecutado, la aplicación estará disponible en:
- **http://localhost**
- **http://127.0.0.1**

## 🔧 Comandos Útiles

\`\`\`bash
# Ver logs
docker-compose logs -f

# Parar los servicios
docker-compose down

# Reconstruir sin cache
docker-compose build --no-cache

# Ver contenedores en ejecución
docker ps

# Acceder al contenedor
docker exec -it static-web-nginx sh
\`\`\`

## 📁 Estructura del Proyecto

\`\`\`
.
├── Dockerfile              # Configuración del contenedor
├── docker-compose.yml      # Orquestación de servicios
├── nginx.conf              # Configuración de Nginx
├── README.md               # Documentación
└── src/                    # Archivos estáticos
    ├── index.html          # Página principal
    ├── styles.css          # Estilos CSS
    ├── script.js           # Lógica JavaScript
    └── 404.html            # Página de error
\`\`\`

## ⚙️ Configuración

### Nginx
- Puerto: 80
- Compresión gzip habilitada
- Cache para archivos estáticos
- Headers de seguridad
- Página de error personalizada

### Docker
- Imagen base: nginx:alpine
- Puerto expuesto: 80
- Volumen para desarrollo en tiempo real

## 🔒 Características de Seguridad

- Headers de seguridad HTTP
- Configuración optimizada de Nginx
- Sin dependencias externas
- Aplicación completamente estática

## 🐛 Solución de Problemas

### Puerto 80 ocupado
\`\`\`bash
# Usar otro puerto
docker-compose up --build -p 8080:80
\`\`\`

### Permisos en Linux/Mac
\`\`\`bash
# Ejecutar con sudo si es necesario
sudo docker-compose up --build
\`\`\`

### Limpiar contenedores
\`\`\`bash
# Limpiar todo
docker system prune -a
\`\`\`

## 📝 Notas

- La aplicación es completamente estática y funciona sin JavaScript habilitado
- Los archivos se sirven desde `/usr/share/nginx/html` dentro del contenedor
- La configuración de Nginx está optimizada para rendimiento y seguridad
