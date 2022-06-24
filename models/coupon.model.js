module.exports = (sequelize, DataTypes) => {
  const Coupon = sequelize.define("coupon", {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      set(value) {
        const rawValue = value.toUpperCase();
        this.setDataValue("name", rawValue);
      },
    },
    priceRange: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    limit: {
      type: DataTypes.INTEGER,
      defaultValue: 4,
    },
    percentOff: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    amountOff: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
  });

  return Coupon;
};
