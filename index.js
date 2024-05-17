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

app.get('/gastos', async (req, res) => {
    try {
        const gastos = await GastosModel.findAll();
        return res.status(200).json({ gastos });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error al obtener los gastos' });
    }
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor encendido http://localhost:${PORT}`)
})