'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
      return queryInterface.createTable("pictures",{

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

        nome:{
          allowNull:false,
          type:DataTypes.STRING
        },

        descricao:{
          allowNull:false,
          type:DataTypes.TEXT
        },

        url:{
          allowNull:false,
          type:DataTypes.STRING
        },

        public:{
          allowNull:false,
          type:DataTypes.BOOLEAN
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
    return queryInterface.dropTable('pictures');
  }
};
