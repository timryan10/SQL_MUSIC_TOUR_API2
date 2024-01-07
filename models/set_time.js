'use strict';
const {
  Model
} = require('sequelize');
const { all } = require('../controllers/bands_controller');
const event = require('./event');
module.exports = (sequelize, DataTypes) => {
  class set_time extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Band, Event, Stage}) {
      set_time.belongsTo(Band, {
        foreignKey: 'band_id',
        as: 'band'
      })

      set_time.belongsTo(Event, {
        foreignKey: 'event_id',
        as: 'event'
      })

      set_time.belongsTo(Stage, {
        foreignKey: 'stage_id',
        as: 'event'
      })
    }
  }
  set_time.init({
    set_time_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stage_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    band_id: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    set_time_hour: {
      type: DataTypes.INTEGER
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'set_time',
    tableName: 'set_times',
    timestamps: false
  });
  return set_time;
};