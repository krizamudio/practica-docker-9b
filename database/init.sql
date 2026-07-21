CREATE TABLE IF NOT EXISTS activities (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    due_date DATE NOT NULL,
    priority VARCHAR(20) NOT NULL DEFAULT 'media',
    status VARCHAR(20) NOT NULL DEFAULT 'pendiente',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT valid_priority
        CHECK (priority IN ('baja', 'media', 'alta')),

    CONSTRAINT valid_status
        CHECK (status IN ('pendiente', 'en_proceso', 'terminada'))
);

INSERT INTO activities (
    title,
    subject,
    due_date,
    priority,
    status
)
VALUES
    (
        'Crear Dockerfile del backend',
        'Desarrollo Web Integral',
        CURRENT_DATE + 3,
        'alta',
        'pendiente'
    ),
    (
        'Configurar PostgreSQL',
        'Desarrollo Web Integral',
        CURRENT_DATE + 5,
        'media',
        'en_proceso'
    ),
    (
        'Probar persistencia de datos',
        'Desarrollo Web Integral',
        CURRENT_DATE + 7,
        'baja',
        'pendiente'
    );