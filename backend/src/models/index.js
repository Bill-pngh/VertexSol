const { Sequelize } = require('sequelize');
const config = require('../../config/database'); // We'll create this next

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: 'postgres',
    logging: false, // Disable SQL logs in production
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Import models
const User = require('./User')(sequelize, Sequelize);
// const Transaction = require('./Transaction')(sequelize, Sequelize); // Uncomment later

// Sync models (force: false in production)
sequelize.sync({ force: false })
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Sync error:', err));

module.exports = {
  sequelize,
  User,
  // Transaction,
};
