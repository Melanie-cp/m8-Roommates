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

export const GastosModel = {
    findAll
};
