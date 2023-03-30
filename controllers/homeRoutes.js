const router = require('express').Router();
const { Plant, User } = require('../models');
const withAuth = require('../utils/auth');

const dotenv = require("dotenv");
dotenv.config();

router.get("/search", async (req, res) => {
  const plantSearch = req.query.q
  console.log(plantSearch)
  try {
    const response = await fetch('https://perenual.com/api/species-list?page=1&key=' + process.env.API_KEY + '&q=' + plantSearch)

    const plantData = await response.json();
    res.render("results", plantData)
    console.log(plantData)

  } catch (err) {
    res.status(500).json(err);
  }
})

router.get("/plant/:id", async (req, res) => {

  const plantID = req.params.id
  console.log(plantID)
  try {

    const response = await fetch('https://perenual.com/api/species/details/' + plantID + '?key=' + process.env.API_KEY)

    const plantLookup = await response.json();
    console.log(plantLookup);
    res.render("plant", plantLookup)

  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/', async (req, res) => {
  try {
    // Get all plants and JOIN with user data
    const plantData = await Plant.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const plants = plantData.map((plant) => plant.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      plants,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/plant/:id', async (req, res) => {
  try {
    const plantData = await Plant.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const plant = plantData.get({ plain: true });

    res.render('plant', {
      ...plant,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Plant }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
