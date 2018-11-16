import { Router } from 'express'
import axios from 'axios'
import validate from 'express-validation'
import token from '../../token'
import { getProfile } from '../lib/lib'
import validation from './validation'

export default () => {
  let router = Router()

  /** GET /health-check - Check service health */
  router.get('/health-check', (req, res) => res.send('OK'))

  // The following is an example request.response using axios and the
  // express res.json() function
  /** GET /api/rate_limit - Get github rate limit for your token */
  router.get('/rate', (req, res) => {
    axios
      .get(`http://api.github.com/rate_limit`, {
        headers: {
          Authorization: token
        }
      })
      .then(({ data }) => res.json(data))
  })

  /** GET /api/user/:username - Get user */
  router.get('/user/:username', validate(validation.user), (req, res) => {
    return getUserAndRepos(req.params.username)
      .then(user => {
        console.log(user)
        res.json(user)
      })
      .catch(error => {
        res.status(500)
        res.json(error)
      })
  })
  /*
      TODO
      Fetch data for user specified in path variable
      parse/map data to appropriate structure and return as JSON object
    */

  /** GET /api/users?username - Get users */
  router.get('/users/', validate(validation.users), (req, res) => {
    Promise.all([
      getUserAndRepos(req.query.username[0]),
      getUserAndRepos(req.query.username[1])
    ])
      .then(([user1, user2]) => res.json([user1, user2]))
      .catch(error => {
        res.status(500)
        res.json(error)
      })
  })
  /*
      TODO
      Fetch data for users specified in query
      parse/map data to appropriate structure and return as a JSON array
    */

  return router
}

const getUserAndRepos = username => {
  console.log(username)
  return axios
    .get(`https://api.github.com/users/${username}`, {
      headers: { Authorization: token }
    })
    .then(({ data: user }) => {
      return axios
        .get(`https://api.github.com/users/${username}/repos`, {
          headers: { Authorization: token }
        })
        .then(({ data: repos }) => {
          return getProfile(user, repos)
        })
    })
}
