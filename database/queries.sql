DROP TABLE IF EXISTS ROOMMATES;
DROP TABLE IF EXISTS GASTOS;

-- Tabla para almacenar información de roommates
CREATE TABLE roommates (
    id UUID PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    debe DECIMAL(10, 2) DEFAULT 0,
    recibe DECIMAL(10, 2) DEFAULT 0
);

-- Tabla para almacenar historial de gastos
CREATE TABLE gastos (
    id UUID PRIMARY KEY,
    roommate_id UUID NOT NULL,
    descripcion TEXT,
    monto DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (roommate_id) REFERENCES roommates(id) ON DELETE CASCADE
);

-- Insertar valores de prueba en la tabla roommates
INSERT INTO roommates (id, nombre, debe, recibe) VALUES
    ('1f391780-31d1-4d0e-a175-f1d055d8a34a', 'Juan Pérez', 0, 0),
    ('8a4e7f7e-6d2a-4c4d-bb29-02a6b92f8d0c', 'María López', 0, 0),
    ('13e7f02a-00b9-4649-a750-1055d2c876e7', 'Pedro García', 0, 0);

-- Insertar valores de prueba en la tabla gastos
INSERT INTO gastos (id, roommate_id, descripcion, monto) VALUES
    ('1940c2d1-eb89-42b8-ba52-332e7f7d1c8d', '1f391780-31d1-4d0e-a175-f1d055d8a34a', 'Compra de alimentos', 250.00),
    ('4a8de120-3b8a-4b1f-848b-046f0531c90b', '8a4e7f7e-6d2a-4c4d-bb29-02a6b92f8d0c', 'Pago de servicios', 150.00),
    ('b9c0a8bb-bbfa-4a45-aa7b-2e1915c0bcf8', '13e7f02a-00b9-4649-a750-1055d2c876e7', 'Compra de productos de limpieza', 50.00);
	
SELECT * FROM roommates;
SELECT * FROM gastos;