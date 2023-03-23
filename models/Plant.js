const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Plant extends Model { }
// want plant model to contain; id (use api?), common_name (from api), sunlight (from api), watering (from api), indoor - boolean (from api)
// user input should date acquired, date last watered, date last fed
Plant.init(
  {
    id: { // from api
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    common_name: { // from api
      type: DataTypes.STRING,
      allowNull: false,
    },
    sunlight: { // from api
      type: DataTypes.STRING,
      allowNull: true
    },
    watering: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date_created: { // from utils helper 
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    date_acquired: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    date_lastwatered: {
      type: DataTypes.DATE,
      allowNull: false
    },
    date_lastfed: {
      type: DataTypes.DATE,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'plant',
  }
);

module.exports = Plant;
