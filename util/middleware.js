const { Blog, User } = require('../models');
const jwt = require('jsonwebtoken');

const userFinder = async (req, res, next) => {
  req.user = await User.findOne({ where: { username: req.params.username } })

  if(!req.user) {
    throw Error('User not found!')
  }
  next()

}


const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  if(!req.blog) {
    throw Error('Blog not found!')
  }
  next()
}


const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch{
      return res.status(401).json({ error: 'token invalid' })
    }
  }
  else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

module.exports = { userFinder, blogFinder, tokenExtractor }
