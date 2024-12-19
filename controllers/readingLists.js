const router = require('express').Router()
const { ReadingList } = require('../models')
const { userFinder }= require('../util/middleware')

router.post('/', userFinder, async (req, res, next) => {
    try {
        if(!(req.user.id == req.body.userId)){
            throw Error('You can only update your own reading list!')
        }
        const list = await ReadingList.create(req.body)
        res.json(list)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', userFinder, async (req, res, next) => {
    try {
        const { read } = req.body
        const id = req.params.id
        const list = await ReadingList.findByPk(id)
        const currentId = req.user.id
        const listUserId = list.toJSON().userId
        if (currentId !== listUserId) {
            throw Error('You can only update your own reading list!')
        }
        await ReadingList.update({ read: read }, {
            where: {
                id: id
            }
        })
        const updatedList = await ReadingList.findByPk(id)
        res.json(updatedList)
    } catch (error) {
        next(error)
    }
})

module.exports = router
