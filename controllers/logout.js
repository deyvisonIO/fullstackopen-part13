const router = require('express').Router()
const { Session } = require('../models')
const { userFinder }= require('../util/middleware')

router.delete('/', userFinder, async (req, res, next) => {
  try {
    const id = req.user.id
    await Session.destroy({ where: { userId: id } })
    return res.status(200).json({ message: 'Successfully logged out!' })

  } catch (error) {
    next(error)
  }
})

module.exports = router
