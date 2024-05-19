import express from 'express'
import 'dotenv/config'
import roomateRouter from './routes/roommates.route.js'
import gastosRouter from './routes/gastos.route.js'

const app = express()

const __dirname = import.meta.dirname
app.use(express.static(__dirname + '/public'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/roommates', roomateRouter)
app.use('/gastos', gastosRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor encendido http://localhost:${PORT}`)
})