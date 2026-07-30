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
const { validateTask } = require('../middleware/validation.middleware')

// router.use(protect)
router.post('/',validateTask,createTask)
router.get('/',getAllTask)
router.get('/stats',taskStates)
router.get('/:id',getTaskById)
router.patch('/:id',validateTask,updateTask)
router.delete('/:id',deleteTask)
router.patch('/:id/toggle',toggleTaskStatus)

module.exports = router;