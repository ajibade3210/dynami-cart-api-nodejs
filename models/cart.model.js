module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("cart", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Cart;
};
