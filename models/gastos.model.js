import { v4 as uuidv4 } from 'uuid';
import { pool } from '../database/connection.js';

const findAll = async () => {
    const query = {
        text: `
            SELECT g.id, r.nombre as roommate, g.descripcion, g.monto 
            FROM gastos g 
            INNER JOIN roommates r ON g.roommate_id = r.id
        `
    };
    const { rows } = await pool.query(query);
    return rows;
};

const findById = async (id) => {
    const query = {
        text: `
            SELECT g.id, r.nombre as roommate, g.descripcion, g.monto 
            FROM gastos g 
            INNER JOIN roommates r ON g.roommate_id = r.id
            WHERE g.id = $1
            RETURNING *
        `,
        values: [id]
    };
    const { rows } = await pool.query(query);
    return rows[0];
};


const agregarGasto = async (roommateId, roommateNombre, descripcion, monto) => {
    try {
        await pool.query('BEGIN');

        const query1 = {
            text: `
                INSERT INTO gastos (id, roommate_id, descripcion, monto) 
                VALUES ($1, $2, $3, $4)
                RETURNING id
            `,
            values: [uuidv4(), roommateId, descripcion, monto]
        };

        const { rows } = await pool.query(query1);

        const nuevoGastoId = rows[0].id;

        const query2 = {
            text: `
                UPDATE roommates 
                SET debe = CASE
                    WHEN id = $1 THEN debe
                    ELSE debe + $2
                END,
                recibe = CASE
                    WHEN id = $1 THEN recibe + $2
                    ELSE recibe
                END
                WHERE id <> $1
                RETURNING *
            `,
            values: [roommateId, monto]
        };

        await pool.query(query2);

        await pool.query('COMMIT');

        return { ok: true, nuevoGastoId };
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Error al agregar el gasto:', error);
        return { ok: false, error: 'Error al agregar el gasto' };
    }
};

const remove = async (id) => {
    const query = {
        text: `
        DELETE FROM gastos WHERE ID = $1
        RETURNING *
        `,
        values: [id]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}

const update = async ({ id, nombre, descripcion, monto }) => {
    const query = {
        text: `UPDATE gastos SET
        nombre = $2
        descripcion = $3,
        monto = $4
        WHERE ID = $1
        RETURNING *
        `,
        values: [id, nombre, descripcion, monto]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}

export const GastosModel = {
    findAll,
    findById,
    agregarGasto,
    remove,
    update
};
