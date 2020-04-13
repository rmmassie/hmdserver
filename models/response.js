module.exports = (sequelize, DataTypes) => {
    const Response = sequelize.define('response',{
        pollId: {
            type: DataTypes.INTEGER,
        },
        userId: {
            type: DataTypes.INTEGER,
        },
        response: {
            type: DataTypes.INTEGER
        }
    })
    return Response;
}

