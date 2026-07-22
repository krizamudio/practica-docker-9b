# Utiliza PostgreSQL 16 sobre Alpine Linux.
# Alpine permite mantener una imagen relativamente ligera.
FROM postgres:16-alpine

# Copia el archivo init.sql al directorio especial de inicialización
# de la imagen oficial de PostgreSQL.
#
# Los archivos .sql ubicados en /docker-entrypoint-initdb.d/
# se ejecutan automáticamente cuando la base de datos se crea
# por primera vez.
COPY init.sql /docker-entrypoint-initdb.d/init.sql