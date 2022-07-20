const express = require("express");
const { authenticateToken } = require("../middleware/authenticate");
const pageController = require("../controllers/page");


const router = express.Router();



router.get(`/page/:name`, pageController.getPage);

router.get(`/footer`, pageController.getFooter);

router.get('/logo' ,pageController.getLogo);


module.exports = router;
