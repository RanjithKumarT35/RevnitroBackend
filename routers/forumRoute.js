const express = require("express");
const { getForumThread } = require("../controllers/forumController");
var router = express.Router();

router.get("/", getForumThread);
module.exports = router;
