'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("links",{
        id:{
          allowNull:false,
          autoIncrement:true,
          primaryKey:true,
          type:DataTypes.INTEGER
        },

        userId:{
          allowNull:false,
          type:DataTypes.INTEGER,
          references:{
            model:'users',
            key:'id'
          }
        },

        descricao:{
          allowNull:false,
          type:DataTypes.STRING
        },

        link:{
          allowNull:false,
          type:DataTypes.STRING
        },

        createdAt: {
          allowNull: false,
          type: DataTypes.DATE
        },

        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE
        }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('links');
  }
};
