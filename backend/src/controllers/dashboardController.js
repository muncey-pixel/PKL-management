const getDashboard = (req, res) => {
    const dashboardData = {
        totalJournals: 1,
        totalDocuments: 0,
        totalDays: 1,
        approvedJournals: 1,
        progress: 10
    };

    res.json({
        success: true,
        data: dashboardData
    });
};

module.exports = {
    getDashboard
};