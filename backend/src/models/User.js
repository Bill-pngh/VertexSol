module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    encryptedSeed: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    encryptionIv: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    walletAddress: {
      type: DataTypes.STRING(44), // Solana addresses are 44 chars
      allowNull: true,
    },
  }, {
    timestamps: true,
    paranoid: true, // Soft deletes
  });

  return User;
};
