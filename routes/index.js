var express = require('express')
var router = express.Router()
const format = require('date-fns/format')
const { Apartment } = require('../models')

/* GET home page. */
router.get('/', async (req, res, next) => {
  let result
  try {
    result = await Apartment.findAll({ order: [ ['createdAt', 'DESC'] ] })
  } catch (e) {
    console.log(e)
    throw e
  }
  const apartments = result.map(instance => {
    const apartment = Object.assign({}, instance.toJSON())
    apartment.createdAt = format(apartment.createdAt, 'D MMMM YYYY - HH:mm')
    return apartment
  })
  res.render('index', { title: 'Apartments in Chamonix', apartments })
})

module.exports = router
