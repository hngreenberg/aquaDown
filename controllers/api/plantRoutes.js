const router = require('express').Router();
const { Plant } = require('../../models');
const withAuth = require('../../utils/auth');

//Find all plants
router.get('/', withAuth, async (req, res) => {
  try {
    const plantData = await Plant.findAll({
      where: { user_id: req.session.user_id }
    });
    res.status(200).json(plantData);
  } catch (err) {
    res.status(404).json(err);
  }
});

//Find single plant by id
router.get('/:id', withAuth, async (req, res) => {
  try {
    const plantData = await Plant.findOne({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    });
    if (!plantData) {
      res.status(404).json({ message: 'Plant not found' });
      return;
    }
    res.status(200).json(plantData);
  } catch (err) {
    res.status(404).json(err);
  }
});

//Create new plant
router.post('/', withAuth, async (req, res) => {
  try {
    console.log(req.body)
    const newPlant = await Plant.create({
      ...req.body,
      user_id: req.session.user_id,
    })
    console.log(newPlant);
    res.status(200).json(newPlant);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});


//update plant with user in session
router.put('/:id', withAuth, async (req, res) => {
  try {
    const plantData = await Plant.update(req.body, {
      where: { id: req.params.id },
    })
    res.status(200).json(plantData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Delete plant
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const plantData = await Plant.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!plantData) {
      res.status(404).json({ message: 'No plant found with this id!' });
      return;
    }

    res.status(200).json(plantData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
