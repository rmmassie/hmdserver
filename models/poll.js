module.exports = (sequelize, DataTypes) => {
    const Poll = sequelize.define('poll',{
        userId: {
            type: DataTypes.INTEGER,
        },
        typeId: {
            type: DataTypes.INTEGER,
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING),
        },
        question: {
            type: DataTypes.STRING(500),
        },
        solution1: {
            type: DataTypes.STRING,
        },
        solution2: {
            type: DataTypes.STRING,
        },
        summary: {
            type: DataTypes.STRING(1001),
        },
        changedState: {
            type: DataTypes.BOOLEAN,
        }
    })
    return Poll;
}