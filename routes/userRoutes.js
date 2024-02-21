const express = require('express');
const userController = require('./../contorollers/userController');
const authController = require('./../contorollers/authController');
const router =express.Router(); 

router.post('/signup',authController.signup);


router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

module.exports =router;