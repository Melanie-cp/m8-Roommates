import { pool } from '../database/connection.js'

const findAll = async () => {
    const query = {
        text: 'SELECT * FROM roommates'
    };
    const { rows } = await pool.query(query);
    return rows;
}

export const RoommatesModel = {
    findAll
}