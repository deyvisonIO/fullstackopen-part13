const router = require('express').Router()
const { User } = require('../models')
const { userFinder } = require('../util/middleware')


router.get("/", async (req, res) => {
  const users = await User.findALl({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
  })
  const jsonUsers = users.map(user => user.toJSON())
  
  res.json(jsonUsers);
});

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    return res.json(user)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

// router.delete('/:id', userFinder, async (req, res) => {
//   await req.user.destroy();
//   res.json(req.blog);
// })

router.put('/:username', userFinder, async (req, res) => {
  if(!req.body.username) throw new Error('Username missing!')

  req.user.username = req.body.username;
  await req.user.save()
  res.json(req.user)
})

router.get('/:id', async (req, res) => {
  let where = {}
  if(req.query.read) where.read = req.query.read;
  const user = User.findByPk(req.params.id, {
    attributes: { exclude: [''] } ,
    include: [{
      model: Blog,
      as: 'readings',
      attributes: ['id', 'author', 'title', 'url', 'likes', 'year'],
      through: {
        as: 'reading_list',
        attributes: ['id', 'read'],
        where,
      }
    }],
  });
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router
