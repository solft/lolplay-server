const express = require('express')
const axios = require('axios')
require('dotenv').config();
const router = express.Router();

const baseUrl = 'https://kr.api.riotgames.com'

router.get('/:matchId', (req, res, next) => {
  const matchId = req.params.matchId
  const subUrl = `/lol/match/v4/matches/${matchId}`
  axios.get(baseUrl+subUrl, {
    params: {
      api_key: process.env.LOL_API_KEY
    }
  })
  .then(response => {
    res.json(response.data)
  })
})

module.exports = router;