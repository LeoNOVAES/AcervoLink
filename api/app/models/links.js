module.exports = (sequelize, DataTypes)=>{
    const Links = sequelize.define('Links',{
        userId:DataTypes.INTEGER,
        descricao:DataTypes.STRING,
        link:DataTypes.STRING
    });

    Links.associate = (models)=>{
        Links.hasMany(models.User, {foreignKey:'id', otherKey:'userId', as:'users'});
    }

    return Links;
}