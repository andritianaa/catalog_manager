import express from 'express'
import * as Option from './../controllers/option.controllers'

const router = express.Router()
router.get('/get', (req, res) => Option.get(req, res))
router.post('/new', (req, res) => Option.create(req, res))
router.put('/edit', (req, res) => Option.edit(req, res))
router.patch('/sort', (req, res) => Option.resort(req, res))
router.delete('/remove', (req, res) => Option.remove(req, res))

export default router