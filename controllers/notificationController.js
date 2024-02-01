const user = require("../models/usermodel");

const getNotifications = async (req, res) => {
  try {
    const userId = req.body.id;
    // Find the user and populate the notifications, sorted by date in descending order
    const User = await user.findOne({ _id: userId });

    if (!User) {
      return res.status(404).json({ error: "User not found" });
    }

    // Sort the notifications array by the 'timestamp' field in descending order
    const notifications =
      User.notifications.sort((a, b) => b.timestamp - a.timestamp) || [];

    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const markNotificationAsRead = async (req, res) => {
  try {
    const userId = req.body.id;
    const notificationId = req.params.id;

    // Update notification as read in the user's notifications array
    await user.updateOne(
      { _id: userId, "notifications._id": notificationId },
      { $set: { "notifications.$.isRead": true } }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const userId = req.body.id;
    const notificationId = req.params.id;

    // Remove notification from the user's notifications array
    const updatedUser = await user.findOneAndUpdate(
      { _id: userId },
      { $pull: { notifications: { _id: notificationId } } },
      { new: true }
    );

    if (!updatedUser) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getNotifications,
  markNotificationAsRead,
  deleteNotification,
};
