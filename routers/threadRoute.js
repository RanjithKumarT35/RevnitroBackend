const express = require("express");
const { auth } = require("../Middleware/auth");
const {
  getThread,
  postThread,
  postComment,
  getDetailedThread,
  deleteThread,
  editThread,
  viewCountThread,
  likeThread,
  deleteComment,
  myThreads,
  mention,
} = require("../controllers/threadController");

var router = express.Router();
router.post("/", auth, postThread);

router.get("/", getThread);
router.post("/:id/like", likeThread);
router.post("/:threadId", getDetailedThread);
router.put("/:threadId", editThread);
router.post("/:id/views", viewCountThread);
router.delete("/:threadId", deleteThread);
router.delete("/:threadId/comments/:commentId", deleteComment);
router.post("/:id/comments", auth, postComment);
router.get("/:threadId/commenters", mention);
router.post("/user/:userId", auth, myThreads);

module.exports = router;
