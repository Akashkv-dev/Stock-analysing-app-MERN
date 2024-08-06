const cron = require('node-cron');
const { Op } = require('sequelize');
const User = require('../Modal/User');

// Function to remove unverified users
const removeUnverifiedUsers = async () => {
  try {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    await User.destroy({
      where: {
        verified: false,
        createdAt: {
          [Op.lt]: fiveMinutesAgo
        }
      }
    });
    // console.log('Unverified users removed successfully!');
  } catch (error) {
    console.error('Error removing unverified users:', error);
  }
};

// Schedule the task to run every minute
cron.schedule('* * * * *', () => {
  // console.log('Running cron job to remove unverified users');
  removeUnverifiedUsers();
});
