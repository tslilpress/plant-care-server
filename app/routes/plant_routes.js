const express = require('express')

const passport = require('passport')

// pull in Mongoose model for plant
const Plant = require('../models/plant')

//  a collection of methods that help detect situations when
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// middleware that will remove blank fields from `req.body`
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
router.get('/plants', requireToken, (req, res, next) => {
  const userId = req.user._id
  Plant.find({owner: userId})
    .populate('owner')
    .then(plants => {
      // plants will be an array of Mongoose documents
      // convert each one to a POJO, use `.map` to
      // apply `.toObject` to each one
      return plants.map(plant => plant.toObject())
    })
  // respond with status 200 and JSON
    .then(plants => res.status(200).json({ plants }))
  // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
router.get('/plants/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route

  Plant.findById(req.params.id)
    .populate('owner')
    .then(handle404)
    .then(plant => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, plant)

      return plant
    })
    // if `findById` is succesful, respond with 200 and "plant" JSON
    .then(plant => res.status(200).json({ plant: plant.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
router.post('/plants', requireToken, (req, res, next) => {
  // set owner of new plant to be current user
  req.body.plant.owner = req.user.id

  Plant.create(req.body.plant)
  // console.log(req.body.plant)
    // respond to succesful `create` with status 201 and JSON of new "plant"
    .then(plant => {
      res.status(201).json({ plant: plant.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// UPDATE
router.patch('/plants/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.plant.owner

  Plant.findById(req.params.id)
    .then(handle404)
    .then(plant => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, plant)

      // pass the result of Mongoose's `.update` to the next `.then`
      return plant.updateOne(req.body.plant)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
router.delete('/plants/:id', requireToken, (req, res, next) => {
  Plant.findById(req.params.id)
    .then(handle404)
    .then(plant => {
      // throw an error if current user doesn't own `plant`
      requireOwnership(req, plant)
      // delete the plant ONLY IF the above didn't throw
      plant.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
