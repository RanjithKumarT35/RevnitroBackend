const Thread = require("../models/thread");
const getForumThread = async (req, res) => {
  try {
    // Get unique headings from threads
    const headings = await Thread.distinct("heading");

    // Initialize counters for total threads, total headings, and total views
    let totalThreads = 0;
    let totalHeadings = 0;
    let totalViews = 0;

    const headingDetails = [];

    for (const heading of headings) {
      // Count threads for each heading
      const threadCount = await Thread.countDocuments({ heading });

      // Get the latest thread for each heading
      const latestThread = await Thread.findOne({ heading })
        .sort({ createdAt: -1 })
        .select("title createdAt views");

      // Add the count to the total
      totalThreads += threadCount;
      totalHeadings += 1; // Increment total headings for each unique heading

      // If there is a latest thread, add its views to the total views
      if (latestThread) {
        totalViews += latestThread.views || 0;
      }

      headingDetails.push({
        heading,
        latestThread: latestThread
          ? { title: latestThread.title, createdAt: latestThread.createdAt }
          : null,
        postCount: threadCount,
      });
    }

    // Return the total counts along with heading details
    res.json({
      totalThreads,
      totalHeadings,
      totalViews,
      headingDetails,
    });
  } catch (error) {
    console.error("Error fetching heading details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getForumThread,
};
