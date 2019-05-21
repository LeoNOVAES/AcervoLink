module.exports = (sequelize, DataTypes)=>{
    const Pictures = sequelize.define('Pictures',{
        userId:DataTypes.INTEGER,
        nome:DataTypes.STRING,
        url:DataTypes.STRING,
        public:DataTypes.BOOLEAN

    });

    Pictures.associate = (models)=>{
        Pictures.hasMany(models.User, {foreignKey:'id',otherKey: 'userId', as:'users'});
    }

    return Pictures;
}