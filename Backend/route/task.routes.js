const express = require('express')
const router = express.Router()

const {
    createTask,
    getAllTask,
    getTaskById,
    updateTask,
    deleteTask,
    toggleTaskStatus
} = require('../controller/task.controller')

const protect = require('../middleware/protect.middleware')

router.post('/',protect,createTask)
router.get('/',protect,getAllTask)
router.get('/:id',protect,getTaskById)
router.patch('/:id',protect,updateTask)
router.delete('/:id',protect,deleteTask)
router.patch('/:id/toggle',protect,toggleTaskStatus)

module.exports = router;