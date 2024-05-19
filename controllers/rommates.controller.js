import { RoommatesModel } from '../models/roommates.model.js'

export const getAllRommates = async (req, res) => {
    try {
        const roommates = await RoommatesModel.findAll()
        return res.status(200).json({ roommates })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Error al obtener los roommates' })
    }
}

export const createRandomRoommate = async (req, res) => {
    try {
        await RoommatesModel.createRandomRoommate();
        return res.status(201).json({ message: 'Roommate creado exitosamente' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error al crear el roommate' });
    }
}