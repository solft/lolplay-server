const express = require('express')
const axios = require('axios')
require('dotenv').config();
const router = express.Router();

router.get('/:matchId', (req, res, next) => {
  const matchId = req.params.matchId
  axios.get(`https://kr.api.riotgames.com/lol/match/v4/matches/${matchId}?api_key=${process.env.LOL_API_KEY}`)
  .then(response => {
    res.json(response.data)
  })
})

module.exports = router;