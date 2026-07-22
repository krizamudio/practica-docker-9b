# Utiliza una imagen ligera de Node.js 22 basada en Alpine Linux.
FROM node:22-alpine

# Establece /app como el directorio de trabajo dentro del contenedor.
# Las siguientes instrucciones se ejecutarán desde esta ubicación.
WORKDIR /app

# Habilita Corepack, incluido en Node.js, para poder utilizar
# administradores de paquetes como pnpm.
RUN corepack enable

# Copia primero los archivos de dependencias.
# Esto permite aprovechar la caché de Docker cuando el código fuente cambia,
# pero las dependencias permanecen iguales.
#
# El asterisco permite que la construcción continúe aunque
# pnpm-lock.yaml no exista.
COPY package.json pnpm-lock.yaml* ./

# Instala únicamente las dependencias necesarias para producción.
#
# --prod:
# No instala las dependencias declaradas en devDependencies.
#
# --frozen-lockfile:
# Evita que pnpm modifique el archivo pnpm-lock.yaml.
# La instalación fallará si el lockfile no coincide con package.json.
RUN pnpm install --prod --frozen-lockfile

# Copia la carpeta src del proyecto hacia /app/src
# dentro del contenedor.
COPY src ./src

# Configura Node.js para ejecutarse en modo producción.
ENV NODE_ENV=production

# Define el puerto interno utilizado por la aplicación.
ENV PORT=3000

# Documenta que el contenedor utiliza el puerto 3000.
# Esta instrucción no publica el puerto automáticamente;
# la publicación se realiza desde Docker Compose o con docker run -p.
EXPOSE 3000

# Comando que se ejecutará al iniciar el contenedor.
# Ejecuta el script "start" definido en package.json mediante pnpm.
CMD ["pnpm", "start"]