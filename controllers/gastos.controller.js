import { GastosModel } from '../models/gastos.model.js'

export const getAllGastos = async (req, res) => {
    try {
        const gastos = await GastosModel.findAll();
        return res.status(200).json({ gastos });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error al obtener los gastos' });
    }
}

export const createGasto = async (req, res) => {
    const { roommateId, roommateNombre, descripcion, monto } = req.body;
    try {
        const resultado = await GastosModel.agregarGasto(roommateId, roommateNombre, descripcion, monto);
        if (resultado.ok) {
            res.status(201).json({ message: 'Gasto agregado exitosamente', nuevoGastoId: resultado.nuevoGastoId });
        } else {
            res.status(500).json({ error: resultado.error });
        }
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const removeGasto = async (req, res) => {
    try {
        const { id } = req.query
        const gasto = await GastosModel.remove(id)
        return res.json(gasto)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Error al eliminar el gasto' })
    }
}

export const updateGasto = async (req, res) => {
    try {
        const { id } = req.query
        const { nombre, descripcion, monto } = req.body
        const gasto = await GastosModel.update({ id, nombre, descripcion, monto })
        return res.json(gasto)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Error al editar gasto' })
    }
}