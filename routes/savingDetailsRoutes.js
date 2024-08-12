
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {saveUserDetails} = require('../controller/detailsController')

//  routes to save the user data in  Database 

router.post('/userDetails',auth,saveUserDetails);

module.exports = router;
