import { v4 as uuidv4 } from 'uuid';
import { pool } from '../database/connection.js'

const findAll = async () => {
    const query = {
        text: 'SELECT * FROM roommates'
    };
    const { rows } = await pool.query(query);
    return rows;
}

const createRandomRoommate = async () => {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const user = data.results[0];

    const query = {
        text: `
        INSERT INTO roommates (id, nombre, debe, recibe) 
        VALUES ($1, $2, $3, $4)
        `,
        values: [
            uuidv4(),
            `${user.name.first} ${user.name.last}`,
            0,
            0
        ]
    };

    await pool.query(query);
};

export const RoommatesModel = {
    findAll,
    createRandomRoommate
};