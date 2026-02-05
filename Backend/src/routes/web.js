const express = require('express');
const homeController = require('../controller/homeController');

const router = express.Router();

const initWebRoutes = (app) => {
    router.get('/', homeController.handleHelloworld);
    router.get('/user', homeController.handleUser);
    router.post("/users/create-user", homeController.handleCreateNewUser);
    router.get('/users', homeController.handleUser);
    router.get("/users/delete/:id", homeController.handleDeleteUser);

router.get("/users/edit/:id", homeController.handleEditUser);
router.post("/users/update/:id", homeController.handleUpdateUser);


    return app.use('/', router);
}

module.exports = initWebRoutes;