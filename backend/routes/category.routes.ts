import express from 'express'
import * as Category from './../controllers/category.controllers'

const router = express.Router()
router.get('/get', (req, res) => Category.get(req, res))
router.post('/new', (req, res) => Category.create(req, res))
router.put('/edit', (req, res) => Category.edit(req, res))
router.patch('/sort', (req, res) => Category.resort(req, res))
router.delete('/remove', (req, res) => Category.remove(req, res))

export default router