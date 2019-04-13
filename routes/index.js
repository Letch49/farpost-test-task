const express = require('express');
const router = express.Router();
const dbView = require('../databaseView');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Лента модерации' });
})

router.post('/', (req, res, next) => {
  dbView.insertToModeration(req.body);
  res.status(200).send(req.body);
});

router.get('/objects', (req, res, next) => {
  res.render('objects', {rest: dbView.ribbonAPIlimited()});
});

module.exports = router;
