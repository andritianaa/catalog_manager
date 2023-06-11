import express from 'express'
import * as Product from './../controllers/product.controllers'

const router = express.Router()
router.get('/get', (req, res) => Product.get(req, res))
router.post('/new', (req, res) => Product.create(req, res))
router.put('/edit', (req, res) => Product.edit(req, res))
router.patch('/sort', (req, res) => Product.resort(req, res))
router.delete('/remove', (req, res) => Product.remove(req, res))

export default router