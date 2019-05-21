module.exports = (sequelize, DataTypes)=>{
    const Videos = sequelize.define('Videos',{
        userId:DataTypes.INTEGER,
        nome:DataTypes.STRING,
        url:DataTypes.STRING,
        public:DataTypes.BOOLEAN

    });

    Videos.associate = (models)=>{
        Videos.hasMany(models.User, {foreignKey:'id', otherKey:'userId', as:'users'});
    }

    return Videos;
}