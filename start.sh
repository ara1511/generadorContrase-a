#!/bin/bash

echo "🐳 Iniciando Generador de Contraseñas con Docker + Nginx"
echo "=================================================="

# Verificar si Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado. Por favor, instala Docker primero."
    exit 1
fi

# Verificar si Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose no está instalado. Por favor, instala Docker Compose primero."
    exit 1
fi

# Parar contenedores existentes si los hay
echo "🛑 Parando contenedores existentes..."
docker-compose down 2>/dev/null

# Construir y ejecutar
echo "🔨 Construyendo y ejecutando la aplicación..."
docker-compose up --build -d

# Verificar que el contenedor esté corriendo
if [ $? -eq 0 ]; then
    echo "✅ ¡Aplicación iniciada correctamente!"
    echo ""
    echo "🌐 Accede a la aplicación en:"
    echo "   http://localhost"
    echo "   http://127.0.0.1"
    echo ""
    echo "📋 Comandos útiles:"
    echo "   Ver logs: docker-compose logs -f"
    echo "   Parar: docker-compose down"
    echo "   Reiniciar: docker-compose restart"
else
    echo "❌ Error al iniciar la aplicación"
    exit 1
fi
