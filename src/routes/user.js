const express = require('express')
const UserController = require('../controller/userController')
const auth = require('../middleware/auth')
const router = express.Router()

// all user
router.get("/", UserController.getAllUser)
router.get("/:id_user", UserController.getUserById)
router.get("/email", UserController.getUserByEmail)

// CREATE - POST
router.post('/', UserController.createNewUser)
router.post('/login', UserController.loginUser)

//UPDATE - PATCH
router.patch('/:id_user', auth, UserController.updateUserById);
router.patch('/:id_user/role', auth, UserController.updateRoleById)

// DETELE
router.delete('/:id_user', auth, UserController.deleteUserById)

module.exports = router