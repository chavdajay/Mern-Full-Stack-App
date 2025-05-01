const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.post('/create', blogController.createUser);

router.get('/get', blogController.fetchUsers);

router.put('/update/:id', blogController.updateUsers);

router.delete('/delete/:id', blogController.deleteUsers);

module.exports = router;
