import express from 'express'
import * as OptionList from './../controllers/optionList.controllers'

const router = express.Router()
router.get('/get', (req, res) => OptionList.get(req, res))
router.post('/new', (req, res) => OptionList.create(req, res))
router.put('/edit', (req, res) => OptionList.edit(req, res))
router.patch('/sort', (req, res) => OptionList.resort(req, res))
router.delete('/remove', (req, res) => OptionList.remove(req, res))

export default router