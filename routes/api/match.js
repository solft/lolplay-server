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

// matchId로 해당 게임의 플레이어 10명 이름, 챔피언 등의 기본 정보 얻기
router.get('/match-info/:matchId', (req, res, next) => {
  const matchId = req.params.matchId
  const matchUrl = `/lol/match/v4/matches/${matchId}`
  const timelineUrl = `/lol/match/v4/timelines/by-match/${matchId}`

  const matchPromise = axios.get(baseUrl+matchUrl, {
    params: {
      api_key: process.env.LOL_API_KEY
    }
  })

  const timelinePromise = axios.get(baseUrl+timelineUrl, {
    params: {
      api_key: process.env.LOL_API_KEY
    }
  })

  Promise.all([matchPromise, timelinePromise])
  .then(result => {
    const matchResponse = result[0].data
    const timelineResponse = result[1].data

    const playerList = matchResponse.participantIdentities.map(participant => ({ summonerName: participant.player.summonerName, participantId: participant.participantId }))

    const playerInfo = playerList.map(player => {
      return {
        ...player,
        championId: matchResponse.participants[player.participantId - 1].championId,
        position: {
          ...timelineResponse.frames[0].participantFrames[player.participantId].position
        }
      }
    })

    const match_info = {
      "playerInfo" : playerInfo,
      "gameDuration": matchResponse.gameDuration
    }

    res.json(match_info)
  })
})

module.exports = router;