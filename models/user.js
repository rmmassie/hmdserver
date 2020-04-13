module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        passwordhash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pollCount: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        responseCount: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        rank: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });
};