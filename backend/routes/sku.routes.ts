import express from 'express'
import * as Sku from './../controllers/sku.controllers'

const router = express.Router()
router.get('/get', (req, res) => Sku.get(req, res))
router.post('/new', (req, res) => Sku.create(req, res))
router.put('/edit', (req, res) => Sku.edit(req, res))
router.patch('/sort', (req, res) => Sku.resort(req, res))
router.delete('/remove', (req, res) => Sku.remove(req, res))

export default router