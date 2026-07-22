# =========================
# ETAPA 1: CONSTRUCCIÓN
# =========================

# Utiliza Node.js 22 sobre Alpine Linux para construir
# la aplicación frontend.
#
# "AS builder" asigna un nombre a esta etapa para poder
# copiar posteriormente los archivos generados.
FROM node:22-alpine AS builder

# Establece /app como directorio de trabajo dentro del contenedor.
WORKDIR /app

# Habilita Corepack para poder utilizar pnpm.
RUN corepack enable

# Copia primero los archivos relacionados con las dependencias.
# Esta separación permite aprovechar la caché de Docker cuando
# cambia el código fuente, pero no las dependencias.
#
# El asterisco hace opcional la existencia de pnpm-lock.yaml.
COPY package.json pnpm-lock.yaml* ./

# Instala todas las dependencias del proyecto, incluidas
# las dependencias de desarrollo necesarias para compilar
# una aplicación de Vite.
#
# --frozen-lockfile evita que pnpm modifique el archivo lock
# y falla si no coincide con package.json.
RUN pnpm install --frozen-lockfile

# Copia todos los archivos del proyecto al directorio /app.
#
# Se recomienda utilizar un archivo .dockerignore para evitar
# copiar node_modules, dist, archivos .env y otros elementos innecesarios.
COPY . .

# Declara una variable disponible durante la construcción de la imagen.
# Si no se proporciona otro valor, se utilizará /api.
ARG VITE_API_URL=/api

# Convierte el argumento de construcción en una variable de entorno
# para que Vite pueda utilizarla durante el proceso de compilación.
#
# Las variables de Vite que comienzan con VITE_ se incorporan
# al código frontend durante la construcción.
ENV VITE_API_URL=${VITE_API_URL}

# Ejecuta el script "build" definido en package.json.
# Normalmente, Vite genera los archivos estáticos dentro de /app/dist.
RUN pnpm build


# =========================
# ETAPA 2: SERVIDOR WEB
# =========================

# Utiliza Nginx 1.27 sobre Alpine Linux para servir
# los archivos estáticos generados en la etapa anterior.
FROM nginx:1.27-alpine

# Reemplaza la configuración predeterminada de Nginx
# con la configuración personalizada del proyecto.
#
# Esta configuración puede incluir:
# - soporte para rutas de una SPA;
# - compresión;
# - caché;
# - redirección de /api hacia el backend.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia únicamente los archivos compilados desde la etapa "builder".
#
# De esta forma, la imagen final no incluye Node.js, pnpm,
# el código fuente ni las dependencias utilizadas para compilar.
COPY --from=builder /app/dist /usr/share/nginx/html

# Documenta que Nginx escucha en el puerto 80 dentro del contenedor.
#
# Esta instrucción no publica el puerto automáticamente.
# La publicación se configura mediante Docker Compose o docker run.
EXPOSE 80

# Inicia Nginx en primer plano.
#
# "daemon off;" evita que el proceso se ejecute en segundo plano,
# lo cual permite que el contenedor permanezca activo.
CMD ["nginx", "-g", "daemon off;"]