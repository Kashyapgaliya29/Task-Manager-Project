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

router.post('/',createTask)
router.get('/',getAllTask)
router.get('/:id',getTaskById)
router.patch('/:id',updateTask)
router.delete('/:id',deleteTask)
router.patch('/:id/toggle',toggleTaskStatus)

module.exports = router;