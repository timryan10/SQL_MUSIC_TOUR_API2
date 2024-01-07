//Dependencies
const bands = require('express').Router()
const { Op } = require('sequelize')
const db = require('../models')
const { Band } = db

//Find all bands
bands.get('/', async (req, res) => {
    try {
        const foundBands = await Band.findAll({
            order: [ [ 'available_start_time', 'ASC'] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%`}
            }
        })
        res.status(200).json(foundBands)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Find specific bands
bands.get('/:name', async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            where: { band_id: req.params.name },
            include: [
                { 
                    model: Meet_Greet, 
                    as: 'meet_greet',
                    include: {
                        model: event,
                        as: 'event',
                        where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}`}}
                    }
            },
            {
                    model: set_time,
                    as: 'set_time',
                    include: {
                        model: event,
                        as: 'event',
                        where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%`}}
                    }
            }
            ]
        }
)
        res.status(200).json(foundBand)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Create bands
bands.post('/', async (req, res) => {
    try {
        const newBand = await Band.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new band',
            data: newBand
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

//Update Band
bands.put('/:id', async (req, res) => {
    try {
        const updatedBands = await Band.update(req.body, {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedBands} band(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

//Delete Band
bands.delete('/id', async(req, res) => {
    try {
        const deletedBands = await Band.destroy({
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedBands} band(s)`
        })
    } catch (error) {
        res.status(200).json(error)
    }
})

//Exports
module.exports = bands