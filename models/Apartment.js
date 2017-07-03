
module.exports = function (sequelize, DataTypes) {
  const Apartment = sequelize.define('Apartment', {
    agency: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    hash: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    ref: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    title: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    price: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    desc: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    sqm: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    rooms: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    url: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    img: { type: DataTypes.STRING, allowNull: false, defaultValue: '' }
  })

  return Apartment
}
