const stages = require('express').Router()
const { Op } = require('sequelize')
const db = require('../models')
const { Stage } = db

//Find all stages
stages.get('/', async(req, res) => {
    try {
        const foundStages = await Stage.findAll({
            order: [ [ 'stage_name', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%`}
            }
        })
        res.status(200).json(foundStages)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Find specific stage
stages.get('/:name', async (req, res) => {
    try {
        const foundStage = await Stage.findOne({
            where: { stage_id: req.params.name }
        })
        res.status(200).json(foundStage)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Create stage
stages.post('/', async (req,res) => {
    try {
        const newStage = await Stage.create(req.body)
        res.status(200).json({
            message: 'Succesfully created a new stage',
            data: newStage
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

//Update stage
stages.put('/:id', async(req, res) => {
    try {
        const updatedStages = await Stage.update(req.body, {
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Succesfully updated ${updatedStages} stage(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

//Delete stage
stages.delete('/:id', async(req, res) => {
    try {
        const deletedStage = await Stage.destroy({
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedStage} stage(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

//Exports
module.exports = stages