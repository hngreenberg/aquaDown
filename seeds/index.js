const sequelize = require('../config/connection');
const { User, Plant } = require("../models")

const plantseed = require('./plantseeds');
const userseed = require('./userseed');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const plants = await Plant.bulkCreate(plantseed);

    const user = await User.bulkCreate(userseed, {
        individualHooks: true,
        returning: true,
    })

    process.exit(0);
};
seedDatabase();