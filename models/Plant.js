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
      primaryKey: true,
      autoIncrement: true
    },
    plant_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    common_name: { // from api
      type: DataTypes.STRING,
      allowNull: false,
    },
    watering: { // from api
      type: DataTypes.STRING,
      allowNull: true
    },
    sunlight: { // from api
      type: DataTypes.STRING,
      allowNull: true
    },
    nickname: { // from user
      type: DataTypes.STRING,
      allowNull: true
    },
    date_lastwatered: { // from user
      type: DataTypes.STRING,
      allowNull: false
    },
    date_lastfed: { // from user
      type: DataTypes.STRING,
      allowNull: true
    },
    date_acquired: { // from user
      type: DataTypes.STRING,
      allowNull: true,
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
