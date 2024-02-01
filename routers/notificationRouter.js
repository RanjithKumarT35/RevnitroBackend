const express = require("express");
const {
  getNotifications,
  markNotificationAsRead,
  deleteNotification,
} = require("../controllers/notificationController");
var router = express.Router();

router.post("/", getNotifications);
router.put("/:id/read", markNotificationAsRead);
router.delete("/:id", deleteNotification);
module.exports = router;
