# Usar la imagen oficial de Nginx basada en Alpine (más ligera)
FROM nginx:alpine

# Copiar los archivos estáticos al directorio de Nginx
COPY ./src /usr/share/nginx/html

# Copiar configuración personalizada de Nginx (opcional)
COPY ./nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto 80
EXPOSE 80

# Nginx se ejecuta automáticamente al iniciar el contenedor
CMD ["nginx", "-g", "daemon off;"]
