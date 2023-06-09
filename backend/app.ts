import './config/dbConfig'
import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import bodyParser from 'body-parser'

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// routes
// import orderRoutes from './routes/order.routes'
// app.use('/', orderRoutes)
const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`👾 Server started on port ${PORT}`))
