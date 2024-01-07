// DEPENDENCIES
const { Sequelize } = require('sequelize')
const express = require('express')
const app = express()

// CONFIGURATION / MIDDLEWARE
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//CONTROLLERS
const bandsController = require('./controllers/bands_controller')
app.use('/bands', bandsController)
const eventsController = require('./controllers/event_controllers')
app.use('/events', eventsController)
const stagesController = require('./controllers/stage_controllers')
app.use('/stages', stagesController)

//Sequelize connection
const sequelize = new Sequelize('music_tour', 'postgres', 'admin', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
});

try {
    sequelize.authenticate()
    console.log(`Connected with Sequelize at ${process.env.PG_URI}`)
} catch (error) {
    if (error instanceof sequelizeErrors.HostNotFoundError){
        console.error('Host not found:', error);
        return Promise.reject(new sequelizeErrors.HostNotFoundError(error));
    } else {
        console.error('Unable to connect to the database:', error)
    }
}

// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tour API'
    })
})

// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`🎸 Rockin' on port: ${process.env.PORT}`)
})