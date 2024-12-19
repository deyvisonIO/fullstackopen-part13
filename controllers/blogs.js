const router = require('express').Router()
const { SECRET } = require('../util/config')
const { Blog, User } = require('../models')
const { blogFinder, userFinder, tokenExtractor } = require('../util/middleware')

router.get("/", async (req, res) => {
  let where = {}
  if (req.query.search) {
    where = {
      [Op.or]: [
      {
        title: {
         [Op.iLike]: `%${req.query.search}%`
        }
      },
      {
        author: {
         [Op.iLike]: `%${req.query.search}%`
        }
      }
      ]
    };
  }

  const blogs = await Blog.findALl({
    attributes: { exclude: ['userId']},
    include: {
      model: User,
      attributes: ['name']
    },
    where,
    order: [
      ['likes', 'DESC']
    ]
  })
  const jsonBlogs = blogs.map(blog => blog.toJSON())
  
  res.json(jsonBlogs);
});

router.post('/', async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({ ...req.body, userId: user.id })
    return res.json(blog)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.delete('/:id', tokenExtractor, userFinder, blogFinder, async (req, res) => {
  if(req.user.id === req.blog.userId) throw Error('Only author can delete!')

  await req.blog.destroy();
  res.json(req.blog);
})

router.put('/:id', blogFinder, async (req, res) => {
  if(!req.body.likes) throw new Error('Amount of likes missing!')

  req.blog.likes = req.body.likes;
  await req.blog.save()
  res.json(req.blog)
})

// router.get('/:id', blogFinder, async (req, res) => {
//   if (req.blog) {
//     res.json(req.blog)
//   } else {
//     res.status(404).end()
//   }
// })

module.exports = router
