const express = require("express");
const router = express.Router();

const message_controller = require('../controllers/messageController');

router.get('/create', message_controller.create_message_form_get);

router.post('/create', message_controller.create_message_form_post);

router.get('/:id/delete', message_controller.delete_message_form_get);

router.post('/:id/delete', message_controller.delete_message_form_post);

module.exports = router;
