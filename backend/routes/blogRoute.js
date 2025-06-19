const express = require('express');
const multer = require('multer');
const router = express.Router();
const blogController = require('../controllers/blogController');


// Image Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

router.post('/create',  upload.single('image'), blogController.createUser);

router.get('/get', blogController.fetchUsers);

router.put('/update/:id',  upload.single('image'), blogController.updateUsers);

router.delete('/delete/:id', blogController.deleteUsers);

module.exports = router;
