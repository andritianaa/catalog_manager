import dotenv from 'dotenv'
import './config/dbConfig'
dotenv.config()

import bodyParser from 'body-parser'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// routes
import optionList from './routes/optionList.routes'
import category from './routes/category.routes'
import product from './routes/product.routes'
import option from './routes/option.routes'
import sku from './routes/sku.routes'
app.use('/optionList', optionList)
app.use('/category', category)
app.use('/product', product)
app.use('/option', option)
app.use('/sku', sku)

app.listen(process.env.PORT || 8000, () => console.log(`👾 Server started on port ${process.env.PORT || 8000}`))
