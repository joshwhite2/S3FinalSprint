console.log("Executing index.js");
const express = require('express');
const router = express.Router();
const { getCarsPostgres } = require('./dal/pg.cars.dal');
const { getCarsMongo } = require('./dal/m.cars.dal');

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/search', async (req, res) => {
  const { query, source } = req.body;

  try {
    let results;

    if (source === 'postgres') {
      results = await getCarsPostgres(query);
    } else if (source === 'mongo') {
      results = await getCarsMongo(query);
    } else if (source === 'both') {
      const [postgresResult, mongoResult] = await Promise.all([
        getCarsPostgres(query),
        getCarsMongo(query),
      ]);
      results = [...postgresResult, ...mongoResult];
    } else {
      throw new Error('Invalid data source');
    }

    res.render('search-results', { results });
  } catch (error) {
    console.error('Error during search:', error);
    res.status(500).send('Internal Server Error');
  }

});

module.exports = router;
