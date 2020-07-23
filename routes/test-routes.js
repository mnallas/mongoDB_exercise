const router = require("express").Router();
const { test } = require("../controllers/test-controller.js");

router.get("/test", test);

module.exports = router;
