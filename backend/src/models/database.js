require('dotenv').config();

module.exports = {
  database: process.env.PG_DATABASE || 'vertexsol',
  username: process.env.PG_USER || 'vertexsol_user',
  password: process.env.PG_PASSWORD || 'securepassword123',
  host: process.env.PG_HOST || 'localhost',
  port: process.env.PG_PORT || 5432,
};
