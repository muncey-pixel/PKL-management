const Journal = require("../models/Journal");

const getDashboard = async (req, res) => {
  try {
    const totalJournals = await Journal.countDocuments();
    const approvedJournals = await Journal.countDocuments({ status: "approved" });
    const days = await Journal.distinct("date");

    res.json({
      success: true,
      data: {
        totalJournals,
        totalDocuments: 0,
        totalDays: days.length,
        approvedJournals,
        progress: Math.min(100, totalJournals * 10),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal memuat dashboard",
    });
  }
};

module.exports = { getDashboard };