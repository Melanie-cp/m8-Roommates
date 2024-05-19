import express from 'express'
import 'dotenv/config'
import { RoommatesModel } from './models/roommates.model.js'
import { GastosModel } from './models/gastos.model.js'

const app = express()

const __dirname = import.meta.dirname
app.use(express.static(__dirname + '/public'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/roommates', async (req, res) => {
    try {
        const roommates = await RoommatesModel.findAll()
        return res.status(200).json({ roommates })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Error al obtener los roommates' })
    }
})

app.post('/roommates', async (req, res) => {
    try {
        await RoommatesModel.createRandomRoommate();
        return res.status(201).json({ message: 'Roommate creado exitosamente' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error al crear el roommate' });
    }
});

app.get('/gastos', async (req, res) => {
    try {
        const gastos = await GastosModel.findAll();
        return res.status(200).json({ gastos });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error al obtener los gastos' });
    }
});

app.post('/gastos', async (req, res) => {
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
});

app.delete('/gastos', async (req, res) => {
    try {
        const { id } = req.query
        const gasto = await GastosModel.remove(id)
        return res.json(gasto)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Error al eliminar el gasto' })
    }
});

app.put('/gastos', async (req, res) => {
    try {
        const { id } = req.query
        const { nombre, descripcion, monto } = req.body
        const gasto = await GastosModel.update({ id, nombre, descripcion, monto })
        return res.json(gasto)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Error al editar gasto' })
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor encendido http://localhost:${PORT}`)
})