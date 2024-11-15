const express = require('express')
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')

const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerMiddle = require('../Middlewares/multerMiddleware')

const route = express.Router()

route.post('/reg', userController.userRegister)
route.post('/log', userController.userLogin)
route.put('/updateprofile', jwtMiddleware, multerMiddle.single('profile'), userController.userProfile)

route.post('/addproject', jwtMiddleware, multerMiddle.single('image'), projectController.addProject)
route.get('/projects', jwtMiddleware, projectController.getProjects)
route.delete('/deleteproject/:pid', jwtMiddleware, projectController.deleteProject)
route.put('/updateproject/:pid', jwtMiddleware, multerMiddle.single('image'), projectController.updateProject)
route.get('/allprojects',projectController.allProjects)
route.get('/search',projectController.searchProjects)


module.exports = route